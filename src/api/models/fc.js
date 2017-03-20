import fetch from 'node-fetch';
import { auth, error, info, fcApiHost } from '../../config';

/*
获取站点列表
 */
export const sites = async () => {
  const url = `${fcApiHost}/site/?token=${auth.fcApiToken}`;
  info('Read Fetch FC sites from Url:', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    if (result.errorCode === '00000000') return result.result;
    throw new Error(result);
  } catch (e) {
    error('远程获取fc/sites信息失败', e.message);
    return [];
  }
};

export const activeAlarm = async (siteUri) => {
  const url = `${fcApiHost}/site/${siteUri}/alarm/activeAlarm?token=${auth.fcApiToken}`;
  info('Read FC activeAlarm from Url:', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    if (result.errorCode === '00000000') return result.result;
    throw new Error(result);
  } catch (e) {
    error('远程获取fc/alarm/activeAlarm信息失败', e.message);
    return {};
  }
};

export const events = async (siteUri) => {
  const url = `${fcApiHost}/site/${siteUri}/alarm/event?token=${auth.fcApiToken}`;
  info('Read FC event from Url:', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    if (result.errorCode === '00000000') return result.result;
    throw new Error(result);
  } catch (e) {
    error('远程获取fc/alarm/event', e.message);
    return {};
  }
};

export const historyAlarm = async (siteUri) => {
  const url = `${fcApiHost}/site/${siteUri}/alarm/historyAlarm?token=${auth.fcApiToken}`;
  info('Read FC historyAlarm from Url:', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    if (result.errorCode === '00000000') return result.result;

    error('远程获取fc/alarm/historyAlarm', result);
    return {};
  } catch (e) {
    error('远程获取fc/alarm/historyAlarm', e.message);
    return {};
  }
};

export const clusters = async (siteUri) => {
  const url = `${fcApiHost}/site/${siteUri}/cluster?token=${auth.fcApiToken}`;
  info('Read FC clusters from Url:', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    if (result.errorCode === '00000000') return result.result;
    throw new Error(result);
  } catch (e) {
    error('远程获取fc/clusters', e.message);
    error('URL:', url);
    return [];
  }
};

export const cluster = async (siteUri, clusterUri) => {
  const url = `${fcApiHost}/site/${siteUri}/cluster/${clusterUri}?token=${auth.fcApiToken}`;
  info('Read FC cluster from Url:', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    if (result.errorCode === '00000000') return result.result;
    throw new Error(result);
  } catch (e) {
    error(`远程获取fc/cluster/${clusterUri}`, e.message);
    return [];
  }
};

export const computerResource = async (siteUri, clusterUri) => {
  const url = `${fcApiHost}/site/${siteUri}/computerResource/${clusterUri}?token=${auth.fcApiToken}`;
  info('Read FC cluster computerResource from Url:', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    if (result.errorCode === '00000000') return result.result;
    throw new Error(result);
  } catch (e) {
    error(`远程获取fc/cluster/computerResource/${clusterUri}`, e.message);
    return {};
  }
};
