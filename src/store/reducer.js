import { combineReducers } from 'redux'
// 多个reducer组合数据
import { demoReducer } from './demo.reducer.js'
import { homeReducer } from './home.reducer.js'
export default combineReducers({ demoReducer, homeReducer })