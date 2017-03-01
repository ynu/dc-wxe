import fetch from 'node-fetch';
import { auth, error, info, lbApiHost } from '../../config';

/*
获取LB CPU使用情况
 */
export const cpuUsage = async () => {
  const url = `${lbApiHost}/device/cpu-usage?token=${auth.lbApiToken}`;
  info('Read Fetch CPU-USAGE from Url:', url);
  console.log('####', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    if (result.ret === 0) return result.data;
    throw new Error(result);
  } catch (e) {
    error(e.message);
    error(e.stack);
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
    error(e.message);
    error(e.stack);
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
    error(e.message);
    error(e.stack);
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
    error(e.message);
    error(e.stack);
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
    error(e.message);
    error(e.stack);
    return null;
  }
};
