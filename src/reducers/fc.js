import { combineReducers } from 'redux';
import { FETCH_DONE } from '../actions/common';
import * as constants from '../constants';

const sites = (state = [], action) => {
  switch (action.type) {
    case constants.FETCHED_FC_SITES:
      return action.data;
    default:
      return state;
  }
};

const clusters = (state = [], action) => {
  switch (action.type) {
    case constants.FETCHED_FC_CLUSTERS:
      return action.data;
    default:
      return state;
  }
};

const cluster = (state = {}, action) => {
  switch (action.type) {
    case constants.FETCHED_FC_CLUSTER:
      return action.data;
    default:
      return state;
  }
};

const computerResource = (state = {}, action) => {
  switch (action.type) {
    case constants.FETCHED_FC_COMPUTER_RESOURCE:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  sites,
  clusters,
  cluster,
  computerResource,
});
