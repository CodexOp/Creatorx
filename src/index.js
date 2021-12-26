import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom'
import Main from './component/main/Main'

ReactDOM.render(
  <Router>
  <React.StrictMode>
    <Routes>
      <Route path="/creatorx" exact element={<App />} />
      <Route path="/home" exact element={<Main />} />
      <Route path="/" element={<App />} />
    </Routes>
  </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
