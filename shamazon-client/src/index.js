import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { ShamazonUserCheck } from './ShamazonUserCheck';
import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './apikeys';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <ShamazonUserCheck app={app} />
    </BrowserRouter>
  </StrictMode>
  
);
