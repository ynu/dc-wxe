import { combineReducers } from 'redux';
import { FETCH_DONE } from '../../actions/common';

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
    case FETCH_DONE:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  dashboard,
});
