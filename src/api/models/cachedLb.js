/*
Lb模型的Proxy方法，使用memory-cache 做了缓存处理。
每个proxy方法最后一个参数都是CacheOptions，包含key和expire两个参数，其余参数与Shop模型中的方法一致。
 */

import * as model from './lb';
import cacheProxy from './memory-cache-proxy';


const getCacheOptions = (args, name) => {
  const TEN_MINUTES = 10 * 60 * 1000;
  let cacheOptions = {
    key: `dc-wxe:tsg-lb:${name}`,
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

export const realServers = (...args) =>
  cacheProxy(model.realServers, getCacheOptions(args, 'realServers'), []);

export const serverFarms = (...args) =>
  cacheProxy(model.serverFarms, getCacheOptions(args, 'serverFarms'), []);

export const virtualServers = (...args) =>
    cacheProxy(model.virtualServers, getCacheOptions(args, 'virtualServers'), []);

export const interfaces = (...args) =>
    cacheProxy(model.interfaces, getCacheOptions(args, 'interfaces'), []);

export const inboundCounter = (...args) =>
    cacheProxy(model.inboundCounter, getCacheOptions(args, 'inboundCounter'), []);

export const outboundCounter = (...args) =>
    cacheProxy(model.outboundCounter, getCacheOptions(args, 'outboundCounter'), []);

export const lbPolicy = (...args) =>
    cacheProxy(model.lbPolicy, getCacheOptions(args, 'lbPolicy'), []);
export const lbClass = (...args) =>
    cacheProxy(model.lbClass, getCacheOptions(args, 'lbClass'), []);
export const lbAction = (...args) =>
    cacheProxy(model.lbAction, getCacheOptions(args, 'lbAction'), []);
