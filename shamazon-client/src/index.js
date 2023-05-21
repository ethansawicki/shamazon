import React from 'react';
import ReactDOM from 'react-dom/client';
import { ShamazonUserCheck } from './ShamazonUserCheck';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ShamazonUserCheck />
  </BrowserRouter>
  
);
