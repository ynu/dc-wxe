import fetch from 'node-fetch';
import { auth, error, info, impApiHost } from '../../config';

export const PwdPolicy = {
  WEAK: 1,
  MEDIUM: 2,
  STRONG: 3,
};

export const PwdStrength = {
  WEAK: 1,
  MEDIUM: 2,
  STRONG: 3,
};

export const getByUserId = async (userid) => {
  const url = `${impApiHost}/accounts/${userid}?access_token=${auth.impApiToken}`;
  info('根据userid读取imp帐户信息:', url);
  try {
    if (!userid) throw 'userid不能为空';

    const res = await fetch(url);
    const result = await res.json();
    return result;
  } catch (e) {
    error('根据userid读取imp-account信息失败', e.message);
    return [];
  }
};

export const count = async (where = {}) => {
  const url = `${impApiHost}/accounts/count?where=${JSON.stringify(where)}&access_token=${auth.impApiToken}`;
  info('imp帐户总数信息:', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    return result.count;
  } catch (e) {
    error('imp-account总数失败', e.message);
    return -1;
  }
};

export const list = async (where = {}) => {
  const filter = {
    where,
  };
  const url = `${impApiHost}/accounts?filter=${JSON.stringify(filter)}&access_token=${auth.impApiToken}`;
  console.log('根据filter获取imp帐号列表:', url);
  try {
    const res = await fetch(url);
    const result = await res.json();
    return result;
  } catch (e) {
    error('根据filter获取imp帐号列表失败', e.message);
    return [];
  }
};
