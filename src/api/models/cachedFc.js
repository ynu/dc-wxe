/*
Lb模型的Proxy方法，使用memory-cache 做了缓存处理。
每个proxy方法最后一个参数都是CacheOptions，包含key和expire两个参数，其余参数与Shop模型中的方法一致。
 */

import * as model from './fc';
import cacheProxy from './memory-cache-proxy';


const getCacheOptions = (args, name) => {
  const TEN_HOURS = 10 * 3600 * 1000;
  return {
    key: `dc-wxe:fc:${name}`,
    expire: TEN_HOURS,
  };
};

export const sites = (...args) =>
  cacheProxy(model.sites, getCacheOptions(args, 'sites'), args);

export const clusters = (...args) =>
  cacheProxy(model.clusters, getCacheOptions(args, `clusters${args}`), args);

export const cluster = (...args) =>
  cacheProxy(model.cluster, getCacheOptions(args, `cluster:${args}`), args);

export const computerResource = (...args) =>
  cacheProxy(model.computerResource, getCacheOptions(args, `computerResource:${args}`), args);
