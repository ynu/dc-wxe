import { OTHER_ERROR, SUCCESS } from 'nagu-validates';
import fetch from 'isomorphic-fetch';
import { fetching, fetchFailed, fetchDone } from '../common';
import { FETCHED_DASHBOARD } from '../../constants';

export const fetchDashboard = () => async dispatch => {
  dispatch(fetching());
  try {
    const res = await fetch('/api/tsg-lb/dashboard', {
      credentials: 'same-origin',
    });
    const result = await res.json();
    if (result.ret === SUCCESS) {
      dispatch(fetchDone(result.data));
      dispatch({
        type: FETCHED_DASHBOARD,
        data: result.data,
      });
      return Promise.resolve(result.data);
    }
    dispatch(fetchFailed(result));
    return Promise.reject(result);
  } catch (msg) {
    const result = {
      ret: OTHER_ERROR,
      msg,
    };
    dispatch(fetchFailed(result));
    return Promise.reject(result);
  }
};

export default {
  fetchDashboard,
};
