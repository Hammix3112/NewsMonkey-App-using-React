import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export default class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apikey: PropTypes.string.isRequired,
    setProgress: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalArticles: 0,
    };
    document.title = `${this.capitalizeFirst(this.props.category)} - NewsPanda`;
  }

  capitalizeFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  async fetchData(page = 1) {
    this.setState({ loading: true });
    const { country, category, pageSize, apikey, setProgress } = this.props;
    
    try {
      setProgress?.(10);
      const Url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=733d69e9effd42cca727d11506a5df91&page=${page}&pageSize=${pageSize}`;
      
      let data = await fetch(Url);
      setProgress?.(40);
      let parseData = await data.json();
      setProgress?.(70);

      if (parseData.status === 'ok') {
        this.setState({
          articles: parseData.articles,
          loading: false,
          totalArticles: parseData.totalResults,
          page,
        });
        setProgress?.(100);
      } else {
        console.error('API Error:', parseData.message);
        this.setState({ loading: false });
        setProgress?.(100);
      }
    } catch (error) {
      console.error('Error fetching the API:', error);
      this.setState({ loading: false });
      setProgress?.(100);
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.fetchData(1);
      document.title = `${this.capitalizeFirst(this.props.category)} - NewsPanda`;
    }
  }

  handleNextClick = () => {
    const totalPages = Math.ceil(this.state.totalArticles / this.props.pageSize);
    if (this.state.page < totalPages) {
      this.fetchData(this.state.page + 1);
    }
  };

  handlePreviousClick = () => {
    if (this.state.page > 1) {
      this.fetchData(this.state.page - 1);
    }
  };

  render() {
    return (
      <div className="container my-3 text-center">
        <h2>NewsPanda - Top {this.capitalizeFirst(this.props.category)} Headlines</h2>
        {this.state.loading && <Spinner />}

        <div className="row">
          {this.state.articles.map((element) => (
            <div className="col-md-4 mt-3" key={element.url}>
              <NewsItem
                title={element.title ? element.title.slice(0, 25) : ''}
                description={
                  element.description
                    ? element.description.slice(0, 80)
                    : 'The description of the image is not available, but we will try our best to fix that.'
                }
                newsUrl={element.url}
                imageUrl={element.urlToImage}
                author={element.author}
                date={element.publishedAt}
              />
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="container d-flex justify-content-between mt-3 pt-3">
          <button
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page >= Math.ceil(this.state.totalArticles / this.props.pageSize)}
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
