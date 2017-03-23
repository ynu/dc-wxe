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

const hosts = (state = [], action) => {
  switch (action.type) {
    case constants.FETCHED_FC_CLUSTER_HOSTS:
      return action.data;
    default:
      return state;
  }
};

const host = (state = {
  cpuResource: {},
  memResource: {},
}, action) => {
  switch (action.type) {
    case constants.FETCHED_FC_HOST:
      return action.data;
    default:
      return state;
  }
};

const vms = (state = [], action) => {
  switch (action.type) {
    case constants.FETCHED_FC_HOST_VMS:
      return action.data;
    default:
      return state;
  }
};

const vm = (state = {}, action) => {
  switch (action.type) {
    case constants.FETCHED_FC_VM:
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
  hosts,
  vms,
  host,
  vm,
});
