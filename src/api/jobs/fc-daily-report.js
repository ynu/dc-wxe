/*
FC状态每日推送 - 企业微信版
*/

import { scheduleJob } from 'node-schedule';
import WxeApi from 'wxe-api';
import * as model from '../models/cachedFc';
import { info, error, auth, host, fcSupervisorTag, dailyReportCron, siteUri } from '../../config';

const renderClustersStatusTextLine = async () => {
  const cs = await model.clusters(siteUri);
  const result = cs.reduce((acc, cur) => {
    acc.cpuResource.totalSizeMHz += cur.cpuResource.totalSizeMHz;
    acc.cpuResource.allocatedSizeMHz += cur.cpuResource.allocatedSizeMHz;
    acc.memResource.totalSizeMB += cur.memResource.totalSizeMB;
    acc.memResource.allocatedSizeMB += cur.memResource.allocatedSizeMB;
    return acc;
  }, {
    cpuResource: {
      totalSizeMHz: 0,
      allocatedSizeMHz: 0,
      // allocatedVcpus: 0,
    },
    memResource: {
      totalSizeMB: 0,
      allocatedSizeMB: 0,
    },
  });
  const cpuLine = `CPU资源：总${Math.round(result.cpuResource.totalSizeMHz / 1000)} GHz，已使用${result.cpuResource.allocatedSizeMHz / 1000} GHz。`;
  const memLine = `内存资源：总${Math.round(result.memResource.totalSizeMB / 1000)} GB， 已使用${Math.round(result.memResource.allocatedSizeMB / 1000)} GB。`;
  return `集群：共${cs.length}个；\n${cpuLine}\n${memLine}`;
};

const renderHostsStatusTextLine = async () => {
  const hosts = await model.hosts(siteUri);
  const result = hosts.list.reduce((acc, cur) => {
    if (!acc[cur.status]) acc[cur.status] = 0;
    acc[cur.status]++;
    return acc;
  }, { normal: 0 });
  return `主机：共${hosts.total}台，其中${result.normal}台正常运行；`;
};

const renderVmsStatusTextLine = async () => {
  const vms = await model.vms(siteUri);
  const result = vms.reduce((acc, cur) => {
    if (!acc[cur.status]) acc[cur.status] = 0;
    acc[cur.status]++;
    return acc;
  }, { running: 0, stopped: 0 });
  return `虚拟机：共${vms.length}台，其中${result.running}台正常运行，${result.stopped}台已关闭；`;
};

const sendReport = async () => {
  try {
    const texts = await Promise.all([
      renderClustersStatusTextLine(),
      renderHostsStatusTextLine(),
      renderVmsStatusTextLine(),
    ]);
    const wxeapi = new WxeApi(auth.wxent);

    // 生成文本卡片
    const textcard = {
      title: 'FC服务状态',
      description: texts.join('\n'),
      url: `http://${host}/fc/site/${siteUri}`,
      btntxt: '详情',
    };

    // 2.3. 推送微信通知
    return wxeapi.sendTextCard({
      totag: fcSupervisorTag,
    }, auth.wxent.agentId, textcard);
  } catch (e) {
    error('生成FC每日状态异常', e.message);
    return Promise.reject(e);
  }
};


// 使用定时任务，每天推送FC状态
scheduleJob(dailyReportCron, async () => {
  try {
    await sendReport();
    info('完成FC每日状态发送');
  } catch (e) {
    error('发送FC每日状态异常', e.message);
  }
});
