import { auth, getShopTag, error, info } from '../../config';
import { SERVER_FAILED } from 'nagu-validates';
import * as lbModel from '../models/cachedLb';

/*
dashboard({ cacheOptions, success, fail })
获取dashboard需要的数据


- 参数
  - cacheOptions 缓存选项
    - expire 缓存时间，单位为ms，默认为10分钟；
  - success 执行成功时的回调，默认将获取到的数据设置到`req.dashboard`然后转向下一个中间件；
  - fail 执行失败时的回调，默认向客户端返回错误信息。
 */
export const dashboard = (options = {}) => async (req, res, next) => {
  let { cacheOptions, success, fail } = options;

  success = success || ((data, req, res, next) => {
    res.dashboard = data;
    next();
  });
  fail = fail || ((e, req, res) => res.send({
    ret: SERVER_FAILED,
    msg: e.message,
  }));

  try {
    const promises = [
      lbModel.cpuUsage(),
      lbModel.memory(),
      lbModel.power(),
      lbModel.fan(),
      lbModel.environment(),
    ];

    const result = await Promise.all(promises);
    const data = {
      cpus: result[0].cpus,
      memory: result[1].memory,
      powers: result[2].powers,
      fans: result[3].fans,
      environment: result[4],
    };
    success(data, req, res, next);
  } catch (e) {
    fail(e, req, res, next);
  }
};
