import WxeApi from 'wxe-api';
import { scheduleJob } from 'node-schedule';
import * as account from '../models/imp-account';
import { info, error, auth, host, impSupervisorTag, dailyReportCron } from '../../config';

const renderAccountCountTextLine = async () => {
  info('构建统一身份认证系统帐号总数推送字符串');
  try {
    const totalCount = await account.count();
    return `系统共有${totalCount}个帐号`;
  } catch (e) {
    error('构建统一身份认证系统帐号总数推送字符串失败');
    return 0;
  }
};

const renderAccountPwdPolicyStatTextLine = async () => {
  info('构建统一身份认证系统帐号密码策略统计推送字符串');
  try {
    const weakCount = await account.count({
      PWDPOLICY: account.PwdPolicy.WEAK,
    });
    const strongCount = await account.count({
      PWDPOLICY: account.PwdPolicy.STRONG,
    });
    return `密码策略统计：强密码策略${strongCount}个，弱密码策略${weakCount}`;
  } catch (e) {
    error('构建统一身份认证系统帐号密码策略统计推送字符串失败');
    return 0;
  }
};

const renderAccountPwdStrengthStatTextLine = async () => {
  info('构建统一身份认证系统帐号密码强度统计推送字符串');
  try {
    const weakCount = await account.count({
      PWDSTRENGTH: account.PwdStrength.WEAK,
    });
    const strongCount = await account.count({
      PWDSTRENGTH: account.PwdStrength.STRONG,
    });
    return `密码强度统计：强密码帐户${strongCount}个，弱密码帐户${weakCount}`;
  } catch (e) {
    error('构建统一身份认证系统帐号密码策略统计推送字符串失败');
    return 0;
  }
};

// 发送消息
const sendReport = async () => {
  try {
    const texts = await Promise.all([
      renderAccountCountTextLine(),
      renderAccountPwdStrengthStatTextLine(),
      renderAccountPwdPolicyStatTextLine(),
    ]);
    const wxeapi = new WxeApi(auth.wxent);

    // 生成文本卡片
    const textcard = {
      title: '统一身份认证系统状态',
      description: texts.join('\n'),
      url: `http://${host}/imp`,
      btntxt: '详情',
    };

    // 2.3. 推送微信通知
    return wxeapi.sendTextCard({
      totag: impSupervisorTag,
    }, auth.wxent.agentId, textcard);
  } catch (e) {
    error('生成统一身份认证系统每日状态异常', e.message);
    return Promise.reject(e);
  }
};

// 使用定时任务，每天推送状态
scheduleJob(dailyReportCron, async () => {
  try {
    await sendReport();
    info('完成统一身份认证每日状态发送');
  } catch (e) {
    error('发送统一身份认证系统每日状态异常', e);
  }
});
