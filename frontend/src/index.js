import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './JS/store/store';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider> 
  </BrowserRouter>,
  document.getElementById('root')
);
