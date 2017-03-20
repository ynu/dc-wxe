import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import user from './user';
import runtime from './runtime';
import wechat from './wechat';
import lb from './lb';
import fc from './fc';

export default combineReducers({
  form,
  lb,
  fc,
  wechat,
  user,
  runtime,
});
