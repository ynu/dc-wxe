import fetch from 'node-fetch';
import { auth, error, info, lbApiHost } from '../../config';

/*
获取LB CPU使用情况
 */
export const cpuUsage = async () => {
  const url = `${lbApiHost}/device/cpu-usage?token=${auth.lbApiToken}`;
  info('Read Fetch CPU-USAGE from Url:', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    if (result.ret === 0) return result.data;
    throw new Error(result);
  } catch (e) {
    error('远程获取cpu-usage信息失败', e.message);
    return null;
  }
};

/*
获取LB内存使用情况
 */
export const memory = async () => {
  const url = `${lbApiHost}/device/memory?token=${auth.lbApiToken}`;
  info('Read Fetch memory from Url:', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    if (result.ret === 0) return result.data;
    throw new Error(result);
  } catch (e) {
    error('远程获取memory信息失败', e.message);
    return null;
  }
};

 /*
获取LB 电源信息
  */
export const power = async () => {
  const url = `${lbApiHost}/device/power?token=${auth.lbApiToken}`;
  info('Read Fetch Power from Url:', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    if (result.ret === 0) return result.data;
    throw new Error(result);
  } catch (e) {
    error('远程获取power信息失败', e.message);
    return null;
  }
};

/*
获取LB 风扇信息
 */
export const fan = async () => {
  const url = `${lbApiHost}/device/fan?token=${auth.lbApiToken}`;
  info('Read Fetch Fan from Url:', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    if (result.ret === 0) return result.data;
    throw new Error(result);
  } catch (e) {
    error('远程获取fan信息失败', e.message);
    return null;
  }
};

/*
获取LB 环境信息
 */
export const environment = async () => {
  const url = `${lbApiHost}/device/environment?token=${auth.lbApiToken}`;
  info('Read Fetch environment from Url:', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    if (result.ret === 0) return result.data;
    throw new Error(result);
  } catch (e) {
    error('远程获取environment信息失败', e.message);
    return null;
  }
};

/*
获取实服务器信息
 */
export const realServers = async () => {
  const url = `${lbApiHost}/server-lb/real-server?token=${auth.lbApiToken}`;
  info('Read Fetch real-server from Url:', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    if (result.ret === 0) return result.data;
    throw new Error(result);
  } catch (e) {
    error('远程获取real-server信息失败', e.message);
    return [];
  }
};

 /*
获取是服务组信息
  */
export const serverFarms = async () => {
  const url = `${lbApiHost}/server-lb/server-farm?token=${auth.lbApiToken}`;
  info('Read Fetch server-farm from Url:', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    if (result.ret === 0) return result.data;
    throw new Error(result);
  } catch (e) {
    error('远程获取server-farm信息失败', e.message);
    return [];
  }
};

  /*
获取虚服务信息
   */
export const virtualServers = async () => {
  const url = `${lbApiHost}/server-lb/virtual-server?token=${auth.lbApiToken}`;
  info('Read Fetch virtual-server from Url:', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    if (result.ret === 0) return result.data;
    throw new Error(result);
  } catch (e) {
    error('远程获取virtual-server信息失败', e.message);
    return [];
  }
};

/*
获取网络接口信息
 */
export const interfaces = async () => {
  const url = `${lbApiHost}/interface?token=${auth.lbApiToken}`;
  info('Fetch interfaces from Url:', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    if (result.ret === 0) return result.data;
    throw new Error(result);
  } catch (e) {
    error('远程获取interface信息失败', e.message);
    return null;
  }
};

/*
获取网络接口入流量信息
 */
export const inboundCounter = async () => {
  const url = `${lbApiHost}/interface/counters/inbound?token=${auth.lbApiToken}`;
  info('Fetch inbound counter from Url:', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    if (result.ret === 0) return result.data;
    throw new Error(result);
  } catch (e) {
    error('远程获取counters/inbound信息失败', e.message);
    return null;
  }
};

/*
获取网络接口入流量信息
 */
export const outboundCounter = async () => {
  const url = `${lbApiHost}/interface/counters/outbound?token=${auth.lbApiToken}`;
  info('Fetch inbound counter from Url:', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    if (result.ret === 0) return result.data;
    throw new Error(result);
  } catch (e) {
    error('远程获取counters/outbound信息失败', e.message);
    return null;
  }
};

/*
获取负载均衡策略信息
 */
export const lbPolicy = async () => {
  const url = `${lbApiHost}/server-lb/lb-policy?token=${auth.lbApiToken}`;
  info('Fetch LB policy from Url:', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    if (result.ret === 0) return result.data;
    throw new Error(result);
  } catch (e) {
    error('远程获取LB policy信息失败', e.message);
    return null;
  }
};

/*
获取负载均衡策略信息
 */
export const lbClass = async () => {
  const url = `${lbApiHost}/server-lb/lb-class?token=${auth.lbApiToken}`;
  info('Fetch LB class from Url:', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    if (result.ret === 0) return result.data;
    throw new Error(result);
  } catch (e) {
    error('远程获取LB class信息失败', e.message);
    return null;
  }
};

/*
获取负载均衡策略信息
 */
export const lbAction = async () => {
  const url = `${lbApiHost}/server-lb/lb-action?token=${auth.lbApiToken}`;
  info('Fetch LB action from Url:', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    if (result.ret === 0) return result.data;
    throw new Error(result);
  } catch (e) {
    error('远程获取LB action信息失败', e.message);
    return null;
  }
};
