import WxeApi from 'wxe-api';
import { scheduleJob } from 'node-schedule';
import array from 'lodash/array';
import * as model from '../models/zq';
import * as account from '../models/imp-account';
import { info, error, auth, host, zqSupervisorTag, dailyReportCron } from '../../config';

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
  return `${firms.length - 1}个站点，其中${result.running - 1}个正常运行，${result.stopped}个已关闭；`;
};

const renderUserStatusTextLine = async () => {
  info('构建站群用户状态推送字符串');
  try {
    const users = await model.users();
    const strongPwdUsers = (await account.list({
      PWDPOLICY: account.PwdPolicy.STRONG,
    })).filter(user => user.USERID);

    const weakPwdUsers = array.differenceWith(users, strongPwdUsers, (wbuser, impUser) =>
      // console.log(JSON.stringify(wbuser.wbaccount), JSON.stringify(impUser.USERID));
       wbuser.wbaccount === impUser.USERID.toString());
    console.log(weakPwdUsers);
    return `${users.length}个管理员，其中未使用强密码策略的${weakPwdUsers.length}个`;
  } catch (e) {
    error('构建站群用户状态推送字符串失败:', e.message);
    return '构建站群用户状态推送字符串失败';
  }
};

const renderArticleStatTextLine = async () => {
  info('构建站群文章统计推送字符串');
  try {
    const totalCount = await model.articleCount();
    const last24HoursCount = await model.articleCount({
      wbdate: {
        gt: Date.now() - 24 * 3600 * 1000,
      },
    });
    return `${totalCount}篇文章，其中过去24小时增加${last24HoursCount}篇`;
  } catch (e) {
    error('构建站群文章统计推送字符串失败:', e.message);
    return '构建站群文章统计推送字符串失败';
  }
};

// 发送消息
const sendReport = async () => {
  try {
    const texts = await Promise.all([
      renderFirmStatusTextLine(),
      renderUserStatusTextLine(),
      renderArticleStatTextLine(),
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
scheduleJob(dailyReportCron, async () => {
  try {
    await sendReport();
    info('完成站群每日状态发送');
  } catch (e) {
    error('发送站群每日状态异常', e);
  }
});
