import fetch from 'node-fetch';
import { auth, error, info, zqApiHost } from '../../config';

export const firms = async () => {
  const url = `${zqApiHost}/wbfirm?access_token=${auth.zqApiToken}`;
  info('读取站群系统站点列表:', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    return result;
  } catch (e) {
    error('远程获取zq/firms信息失败', e.message);
    return [];
  }
};

export const users = async () => {
  const url = `${zqApiHost}/wbsysuser?access_token=${auth.zqApiToken}`;
  info('读取站群系统管理员列表:', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    return result;
  } catch (e) {
    error('远程获取zq/users信息失败', e.message);
    return [];
  }
};

export const articleCount = async (where = {}) => {
  const url = `${zqApiHost}/wbnews/count?where=${JSON.stringify(where)}&access_token=${auth.zqApiToken}`;
  info('根据filter读取文章数:', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    return result.count;
  } catch (err) {
    error('根据filter读取文章数失败:', err.message);
    return 0;
  }
};
