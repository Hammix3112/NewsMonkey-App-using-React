import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from "react-top-loading-bar";
import Footer from './components/Footer';

function App() {

  // ✅ useState for progress
  const [progress, setProgress] = useState(0);

  return (
    <Router>
      <Navbar />
      <LoadingBar
        color="#f11946"
        height='3px'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      
      <Routes>
        <Route path="/" element={<News setProgress={setProgress} category="general" />} />
        <Route path="/business" element={<News setProgress={setProgress} category="business" />} />
        <Route path="/entertainment" element={<News setProgress={setProgress} category="entertainment" />} />
        <Route path="/general" element={<News setProgress={setProgress} category="general" />} />
        <Route path="/health" element={<News setProgress={setProgress} category="health" />} />
        <Route path="/science" element={<News setProgress={setProgress} category="science" />} />
        <Route path="/sports" element={<News setProgress={setProgress} category="sports" />} />
        <Route path="/technology" element={<News setProgress={setProgress} category="technology" />} />
      </Routes>
    </Router>
  );
  <Footer/>
}

export default App;
