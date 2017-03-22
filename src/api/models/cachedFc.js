/*
Lb模型的Proxy方法，使用memory-cache 做了缓存处理。
每个proxy方法最后一个参数都是CacheOptions，包含key和expire两个参数，其余参数与Shop模型中的方法一致。
 */

import * as model from './fc';
import cacheProxy from './memory-cache-proxy';


const getCacheOptions = (name) => {
  const TEN_HOURS = 10 * 3600 * 1000;
  return {
    key: `dc-wxe:fc:${name}`,
    expire: TEN_HOURS,
  };
};

export const sites = (...args) =>
  cacheProxy(model.sites, getCacheOptions('sites'), args);

export const clusters = (...args) =>
  cacheProxy(model.clusters, getCacheOptions(`clusters${args}`), args);

export const cluster = (...args) =>
  cacheProxy(model.cluster, getCacheOptions(`cluster:${args}`), args);

export const computerResource = (...args) =>
  cacheProxy(model.computerResource, getCacheOptions(`computerResource:${args}`), args);

export const hosts = (...args) =>
  cacheProxy(model.hosts, getCacheOptions(`computerResource:${args}`), args);

export const vms = (siteUri) => {
  const getVms = async (limit = 100, offset = 0) => {
    const result = await model.vms(siteUri, limit, offset);
    // 当还有数据未被取出时，递归读取数据；
    if (result.total > result.list.length + offset) {
      const rest = await getVms(limit, offset + limit);
      return result.list.concat(rest);
    }
    // 不再有剩余数据时，返回本次取到的数据
    return result.list;
  };
  return cacheProxy(getVms, getCacheOptions('vms'), [100, 0]);
};
