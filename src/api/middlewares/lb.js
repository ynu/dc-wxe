/*
eslint-disable no-param-reassign, no-plusplus
 */

import { error, info } from '../../config';
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
      lbModel.realServers(),
      lbModel.serverFarms(),
      lbModel.virtualServers(),
      lbModel.interfaces(),
      lbModel.inboundCounter(),
      lbModel.outboundCounter(),
    ];

    const result = await Promise.all(promises);

    const data = {
      cpus: result[0].cpus,
      memory: result[1].memory,
      powers: result[2].powers.reduce((acc, cur) => {
        if (!acc[cur.status]) acc[cur.status] = 0;
        acc[cur.status]++;
        return acc;
      }, { total: result[2].powers.length }),
      fans: result[3].fans.reduce((acc, cur) => {
        if (!acc[cur.status]) acc[cur.status] = 0;
        acc[cur.status]++;
        return acc;
      }, { total: result[3].fans.length }),
      environment: result[4],
      realServers: result[5].reduce((acc, cur) => {
        if (!acc[cur.state]) acc[cur.state] = 0;
        acc[cur.state]++;
        return acc;
      }, { total: result[5].length }),
      serverFarms: result[6].reduce((acc, cur) => {
        cur.activeRealServer ? acc.Active++ : acc.Inactive++;
        return acc;
      }, { Active: 0, Inactive: 0, total: result[6].length }),
      virtualServers: result[7].reduce((acc, cur) => {
        if (!acc[cur.state]) acc[cur.state] = 0;
        acc[cur.state]++;
        return acc;
      }, { total: result[7].length }),
      interfaces: {
        ge: result[8].ge.reduce((acc, cur) => {
          if (!acc[cur.link]) acc[cur.link] = 0;
          acc[cur.link]++;
          return acc;
        }, {}),
        xge: result[8].xge.reduce((acc, cur) => {
          if (!acc[cur.link]) acc[cur.link] = 0;
          acc[cur.link]++;
          return acc;
        }, {}),
      },
      inboundCounter: [
        ...result[9].ge,
        ...result[9].xge,
      ].reduce((acc, cur) => acc + cur.total, 0),
      outboundCounter: [
        ...result[10].ge,
        ...result[10].xge,
      ].reduce((acc, cur) => acc + cur.total, 0),
    };
    success(data, req, res, next);
  } catch (e) {
    fail(e, req, res, next);
  }
};
