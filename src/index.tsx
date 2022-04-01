import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "@vkontakte/vkui/dist/vkui.css";

import {ConfigProvider, AdaptivityProvider, WebviewType} from '@vkontakte/vkui'
import {Provider} from 'react-redux';
import store from './store';

ReactDOM.render(
  <ConfigProvider webviewType={WebviewType.VKAPPS}>
    <AdaptivityProvider>
      <Provider store={store}>
        <App></App>
      </Provider>
    </AdaptivityProvider>
  </ConfigProvider>
  
  ,
  document.getElementById('root')
);