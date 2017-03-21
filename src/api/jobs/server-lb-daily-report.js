import { scheduleJob } from 'node-schedule';
import WxeApi from 'wxe-api';
import * as model from '../models/cachedLb';
import { info, error, auth, host, lbSupervisorTag, dailyReportCron } from '../../config';

const renderVirtualServersStatusTextLine = async () => {
  const vss = await model.virtualServers();
  const result = vss.reduce((acc, cur) => {
    if (!acc[cur.state]) acc[cur.state] = 0;
    acc[cur.state]++;
    return acc;
  }, { Active: 0, Inactive: 0, total: vss.length });
  return `虚服务：${result.Active}个可用，${result.Inactive}个不可用。`;
};

const renderServerFarmsStatusTextLine = async () => {
  const serverFarms = await model.serverFarms();
  const result = serverFarms.reduce((acc, cur) => {
    cur.activeRealServer ? acc.Active++ : acc.Inactive++;
    return acc;
  }, { Active: 0, Inactive: 0, total: serverFarms.length });
  return `实服务组：${result.Active}个可用，${result.Inactive}个不可用。`;
};

const renderRealServersStatusTextLine = async () => {
  const rss = await model.realServers();
  const result = rss.reduce((acc, cur) => {
    if (!acc[cur.state]) acc[cur.state] = 0;
    acc[cur.state]++;
    return acc;
  }, { total: rss.length, Active: 0, Inactive: 0 });
  return `实服务器：${result.Active}个可用，${result.Inactive}个不可用。`;
};

const sendReport = async () => {
  try {
    const texts = await Promise.all([
      renderVirtualServersStatusTextLine(),
      renderServerFarmsStatusTextLine(),
      renderRealServersStatusTextLine(),
    ]);
    const wxeapi = new WxeApi(auth.wxent);

    // 生成消息文本
    const article = {
      title: '图书馆负载均衡服务状态',
      description: texts.join('\n'),
      url: `http://${host}/tsg-lb/dashboard`,
      picurl: '',
    };

    // 2.3. 推送微信通知
    return wxeapi.sendNews({
      totag: lbSupervisorTag,
    }, auth.wxent.agentId, [article]);
  } catch (e) {
    error('生成每日状态异常', e.message);
    return Promise.reject(e);
  }
};

setTimeout(() => {
  scheduleJob(dailyReportCron, async () => {
    try {
      await sendReport();
      info('完成每日状态发送');
    } catch (e) {
      error('发送每日状态异常', e.message);
    }
  });
}, 300 * 1000);
