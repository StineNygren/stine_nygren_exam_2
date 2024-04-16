import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './services/store';
import { CssBaseline, ThemeProvider } from "@mui/material";
import App from './App';
import { theme } from './theme/theme';

const root = document.getElementById('root');

if (root !== null) {
  const appRoot = ReactDOM.createRoot(root);
  appRoot.render(
    <React.StrictMode>
      <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <App />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
}