import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { HashRouter, Switch } from 'react-router-dom'
import config from './router/router.js'
import RouterView from './router/index.js'

// react-redux 及中间件使用
// React通过redux-persist持久化数据存储
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import reducer from './store/reducer.js'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { PersistGate } from 'redux-persist/lib/integration/react';
const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2, // 查看 'Merge Process' 部分的具体情况
  // blacklist: ['navigation'] // navigation不会被存入缓存中，其他会，适用于少部分数据需要实时更新
  whitelist: [] // navigation会存入缓存，其他不会存，适用于大多数数据并不会实时从后台拿数据
};
const myPersistReducer = persistReducer(persistConfig, reducer)
const store = createStore(myPersistReducer, composeWithDevTools(
  applyMiddleware(thunk),
));
const persistor = persistStore(store)

/**
 * 路由相关
 * **/
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter >
        <Switch>
          < RouterView routers={config} />
        </Switch>
      </HashRouter >
    </PersistGate>
  </Provider>,
  document.getElementById('root'));
