import React from 'react';
import ReactDOM from 'react-dom';
import './master.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
  <BrowserRouter basename="/yumble/" >
    <App />
  </BrowserRouter>,
  document.getElementById('root'));
