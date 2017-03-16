import { OTHER_ERROR, SUCCESS } from 'nagu-validates';
import fetch from '../../core/fetch';
import { fetching, fetchFailed, fetchDone } from '../common';
import { FETCHED_VIRTUAL_SERVERS, FETCHED_SERVER_FARMS,
  FETCHED_REAL_SERVERS, SEARCH_DOMAIN_DONE } from '../../constants';

export const fetchVirtualServers = () => async (dispatch) => {
  dispatch(fetching());
  try {
    const res = await fetch('/api/tsg-lb/server-lb/virtual-servers', {
      credentials: 'same-origin',
    });
    const result = await res.json();
    if (result.ret === SUCCESS) {
      dispatch(fetchDone(result.data));
      dispatch({
        type: FETCHED_VIRTUAL_SERVERS,
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

export const fetchServerFarms = () => async (dispatch) => {
  dispatch(fetching());
  try {
    const res = await fetch('/api/tsg-lb/server-lb/server-farms', {
      credentials: 'same-origin',
    });
    const result = await res.json();
    if (result.ret === SUCCESS) {
      dispatch(fetchDone(result.data));
      dispatch({
        type: FETCHED_SERVER_FARMS,
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

export const fetchRealServers = () => async (dispatch) => {
  dispatch(fetching());
  try {
    const res = await fetch('/api/tsg-lb/server-lb/real-servers', {
      credentials: 'same-origin',
    });
    const result = await res.json();
    if (result.ret === SUCCESS) {
      dispatch(fetchDone(result.data));
      dispatch({
        type: FETCHED_REAL_SERVERS,
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

export const searchDomain = domain => async (dispatch) => {
  dispatch(fetching());
  try {
    const res = await fetch(`/api/tsg-lb/search/${domain}`, {
      credentials: 'same-origin',
    });
    const result = await res.json();
    if (result.ret === SUCCESS) {
      dispatch(fetchDone(result.data));
      dispatch({
        type: SEARCH_DOMAIN_DONE,
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
  fetchVirtualServers,
  fetchServerFarms,
  fetchRealServers,
  searchDomain,
};
