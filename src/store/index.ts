import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from './reducer';

// 中间件数组, 可以填入多个中间件
const middlewares = [ReduxThunk];

// 应用中间件, 参数是多个中间件
const middlewareEnhancer = applyMiddleware(...middlewares);

// 创建store，加入中间件参数
const store = createStore(reducer, middlewareEnhancer);

export default store;
