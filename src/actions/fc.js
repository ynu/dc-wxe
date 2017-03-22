import { OTHER_ERROR, SUCCESS } from 'nagu-validates';
import fetch from '../core/fetch';
import { fetching, fetchFailed, fetchDone } from './common';
import * as constants from '../constants';

export const fetchSites = () => async (dispatch) => {
  dispatch(fetching());
  try {
    const res = await fetch('/api/fc/sites', {
      credentials: 'same-origin',
    });
    const result = await res.json();
    if (result.ret === SUCCESS) {
      dispatch(fetchDone(result.data));
      dispatch({
        type: constants.FETCHED_FC_SITES,
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

export const fetchClusters = siteUri => async (dispatch) => {
  dispatch(fetching());
  try {
    const res = await fetch(`/api/fc/sites/${siteUri}/clusters`, {
      credentials: 'same-origin',
    });
    const result = await res.json();
    if (result.ret === SUCCESS) {
      dispatch(fetchDone(result.data));
      dispatch({
        type: constants.FETCHED_FC_CLUSTERS,
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

export const fetchCluster = (siteUri, clusterUri) => async (dispatch) => {
  dispatch(fetching());
  try {
    const res = await fetch(`/api/fc/sites/${siteUri}/clusters/${clusterUri}`, {
      credentials: 'same-origin',
    });
    const result = await res.json();
    if (result.ret === SUCCESS) {
      dispatch(fetchDone(result.data));
      dispatch({
        type: constants.FETCHED_FC_CLUSTER,
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

export const fetchComputerResource = (siteUri, clusterUri) => async (dispatch) => {
  dispatch(fetching());
  try {
    const res = await fetch(`/api/fc/sites/${siteUri}/computer-resource/${clusterUri}`, {
      credentials: 'same-origin',
    });
    const result = await res.json();
    if (result.ret === SUCCESS) {
      dispatch(fetchDone(result.data));
      dispatch({
        type: constants.FETCHED_FC_COMPUTER_RESOURCE,
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

export const fetchHosts = (siteUri, clusterUri) => async (dispatch) => {
  dispatch(fetching());
  try {
    const res = await fetch(`/api/fc/sites/${siteUri}/clusters/${clusterUri}/hosts`, {
      credentials: 'same-origin',
    });
    const result = await res.json();
    if (result.ret === SUCCESS) {
      dispatch(fetchDone(result.data));
      dispatch({
        type: constants.FETCHED_FC_CLUSTER_HOSTS,
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

export const fetchHost = (siteUri, hostUri) => async (dispatch) => {
  dispatch(fetching());
  try {
    const res = await fetch(`/api/fc/sites/${siteUri}/hosts/${hostUri}`, {
      credentials: 'same-origin',
    });
    const result = await res.json();
    if (result.ret === SUCCESS) {
      dispatch(fetchDone(result.data));
      dispatch({
        type: constants.FETCHED_FC_HOST,
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

export const fetchVms = (siteUri, hostUri) => async (dispatch) => {
  dispatch(fetching());
  try {
    const res = await fetch(`/api/fc/sites/${siteUri}/hosts/${hostUri}/vms`, {
      credentials: 'same-origin',
    });
    const result = await res.json();
    if (result.ret === SUCCESS) {
      dispatch(fetchDone(result.data));
      dispatch({
        type: constants.FETCHED_FC_HOST_VMS,
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
  fetchSites,
  fetchClusters,
  fetchCluster,
  fetchComputerResource,
  fetchHosts,
  fetchVms,
  fetchHost,
};
