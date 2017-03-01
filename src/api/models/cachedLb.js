/*
Lb模型的Proxy方法，使用memory-cache 做了缓存处理。
每个proxy方法最后一个参数都是CacheOptions，包含key和expire两个参数，其余参数与Shop模型中的方法一致。
 */

import * as model from './lb';
import cacheProxy from './memory-cache-proxy';


const getCacheOptions = (args, name) => {
  const TEN_MINUTES = 10 * 60 * 1000;
  let cacheOptions = {
    key: `dc-wxe:tsg-lb:device:${name}`,
    expire: TEN_MINUTES,
  };
  if (args.length) {
    cacheOptions = {
      ...cacheOptions,
      ...args[length - 1],
    };
  }
  return cacheOptions;
};
export const cpuUsage = (...args) =>
  cacheProxy(model.cpuUsage, getCacheOptions(args, 'cpu-usage'), args.slice(0, -1));

export const memory = (...args) =>
  cacheProxy(model.memory, getCacheOptions(args, 'memory'), args.slice(0, -1));

export const power = (...args) =>
  cacheProxy(model.power, getCacheOptions(args, 'power'), args.slice(0, -1));

export const fan = (...args) =>
  cacheProxy(model.fan, getCacheOptions(args, 'fan'), args.slice(0, -1));

export const environment = (...args) =>
  cacheProxy(model.environment, getCacheOptions(args, 'environment'), args.slice(0, -1));
