/*
由于ssh登录有人数限制，不能每次都直接去请求。
列出所有需要读取的数据，每隔固定时间读取一次。
 */

import * as model from './cachedLb';
import { info, error, autoFetchInterval } from '../../config';

const functions = Object.entries(model);
const flushData = (index, cacheOptions) => {
  index %= functions.length;
  if (index === 0) {
    console.timeEnd('自动化缓存数据');
    console.time('自动化缓存数据');
  }
  const func = functions[index][1];
  const funcName = functions[index][0];
  info('start to flush data:', funcName);
  setTimeout(async () => {
    try {
      // await func.apply(func, [...args, cacheOptions]);
      await func(cacheOptions);
    } catch (e) {
      error('自动化缓存脚本错误:', e.message);
    }
    info('flush data is done:', funcName);
    flushData(index + 1, cacheOptions);
  }, autoFetchInterval);
};

flushData(0, { forceFlush: true });
