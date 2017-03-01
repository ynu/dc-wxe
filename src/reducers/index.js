import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import wechat from './wechat';
import lb from './lb';

export default combineReducers({
  lb,
  wechat,
  user,
  runtime,
});
