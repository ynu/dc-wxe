/*
由于ssh登录有人数限制，不能每次都直接去请求。
列出所有需要读取的数据，每隔固定时间读取一次。
 */

import * as model from './cachedLb';
import { info, error } from '../../config';

const functions = Object.entries(model);
const flushData = (index, args = []) => {
  index %= functions.length;
  const func = functions[index][1];
  const funcName = functions[index][0];
  info('start to flush data:', funcName);
  setTimeout(async () => {
    try {
      await func.apply(args);
    } catch (e) {
      error('自动化缓存脚本错误:', e.message);
    }
    info('flush data is done:', funcName);
    flushData(index + 1, { forceFlush: true });
  }, 10 * 1000);
};

flushData(0, { forceFlush: true });
