import WxeApi from 'wxe-api';
import { scheduleJob } from 'node-schedule';
import * as model from '../models/zq';
import { info, error, auth, host, zqSupervisorTag } from '../../config';

const renderFirmStatusTextLine = async () => {
  info('构建站群站点推送字符串');
  const firms = await model.firms();

  const result = firms.reduce((acc, cur) => {
    switch (parseInt(cur.wbstate, 10)) {
      case 0:
        acc.running++;
        break;
      case 3:
      case 5:
        acc.stopped++;
        break;
      default:
    }
    return acc;
  }, { running: 0, stopped: 0 });
  return `站点：共${firms.length - 1}个，其中${result.running - 1}个正常运行，${result.stopped}个已关闭；`;
};

const renderUserStatusTextLine = async () => {
  info('构建站群用户状态推送字符串');
  const users = await model.users();
  return `管理员：共${users.length}个`;
};

// 发送消息
const sendReport = async () => {
  try {
    const texts = await Promise.all([
      renderFirmStatusTextLine(),
      renderUserStatusTextLine(),
    ]);
    const wxeapi = new WxeApi(auth.wxent);

    // 生成文本卡片
    const textcard = {
      title: '站群系统状态',
      description: texts.join('\n'),
      url: `http://${host}/zq`,
      btntxt: '详情',
    };

    // 2.3. 推送微信通知
    return wxeapi.sendTextCard({
      totag: zqSupervisorTag,
    }, auth.wxent.agentId, textcard);
  } catch (e) {
    error('生成站群系统每日状态异常', e.message);
    return Promise.reject(e);
  }
};

// 使用定时任务，每天推送状态
scheduleJob('0 * * * * *', async () => {
  try {
    await sendReport();
    info('完成站群每日状态发送');
  } catch (e) {
    error('发送站群每日状态异常', e);
  }
});
