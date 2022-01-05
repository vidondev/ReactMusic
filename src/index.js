import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import configureStore, { history } from './store';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// Styles
const muiTheme = createMuiTheme({
  appBar: {
    background: 'rgba(179, 179, 179, 0.95)'
  },
  drawer: {
    width: 240
  },
  linkText: {
    color: 'rgba(0, 0, 0, 0.87)',
    textDecoration:'none'
  }
});

render(
    <Provider store={configureStore}>
        <MuiThemeProvider theme={muiTheme}>          
          <App history={history}/>                      
        </MuiThemeProvider>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
