import { combineReducers } from 'redux';
import { FETCH_DONE } from '../../actions/common';
import { FETCHED_VIRTUAL_SERVERS, FETCHED_SERVER_FARMS,
  FETCHED_REAL_SERVERS, FETCHED_DASHBOARD } from '../../constants';

const dashboard = (state = {
  device: {
    cpus: [],
    memory: {},
    powers: [],
    fans: [],
    environment: { inflow: {}, outflow: {} },
  },
}, action) => {
  switch (action.type) {
    case FETCHED_DASHBOARD:
      return action.data;
    default:
      return state;
  }
};

const virtualServers = (state = [], action) => {
  switch (action.type) {
    case FETCHED_VIRTUAL_SERVERS:
      return action.data;
    default:
      return state;
  }
};

const serverFarms = (state = [], action) => {
  switch (action.type) {
    case FETCHED_SERVER_FARMS:
      return action.data;
    default:
      return state;
  }
};

const realServers = (state = [], action) => {
  switch (action.type) {
    case FETCHED_REAL_SERVERS:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  dashboard,
  virtualServers,
  serverFarms,
  realServers,
});
