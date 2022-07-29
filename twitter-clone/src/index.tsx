import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import './index.css';
import App from './App';
import { store } from "./redux/index";
import reportWebVitals from './reportWebVitals';
import { theme } from './lib/theme';

const cache = createCache({ key: 'react' });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <Router>
            <App /> 
          </Router>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
