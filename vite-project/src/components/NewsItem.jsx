import React, { Component } from 'react';

export default class NewsItem extends Component {
  render() {
    const { title, description, imageUrl, newsUrl, author, date } = this.props;

    // Convert the date to a GMT string format
    const formattedDate = date ? new Date(date).toGMTString() : "unknown";

    return (
      <div className='my-3 h-100'>
        <div className="card h-100 mt-1">
          <img 
            src={imageUrl || "https://image.cnbcfm.com/api/v1/image/108087900-17370556232025-01-16t175609z_940062394_rc24bca5zeus_rtrmadp_0_usa-trump-bessent.jpeg?v=1737055649&w=1920&h=1080"} 
            className="card-img-top img-fluid" 
            alt="News" 
            style={{ maxHeight: "200px", objectFit: "cover" }}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{title || "News title"}...</h5>
            <p className="card-text">{description || "Description not available."}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "unknown"} on {formattedDate}
              </small>
            </p>
            <a 
              href={newsUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-primary mt-auto"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}
