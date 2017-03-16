/*
eslint-disable no-param-reassign, no-plusplus, no-shadow
 */

import { error, info } from '../../config';
import { SERVER_FAILED } from 'nagu-validates';
import * as model from '../models/cachedLb';


const deepSearch = async (domain) => {
  info('domain is:', domain);
  const [lbClasses, lbPolicies, lbActions, sfs, rss, vss] = await Promise.all([
    model.lbClass(),
    model.lbPolicy(),
    model.lbAction(),
    model.serverFarms(),
    model.realServers(),
    model.virtualServers(),
  ]);

  // 获取与域名相关的所有LB class
  const classes = lbClasses.filter((cls) => {
    const rules = cls.matchRules.filter(rule => rule.header.toLowerCase() === 'host');
    return rules.some((rule) => {
      const reg = new RegExp(rule.value);
      return reg.test(domain);
    });
  });
  info('LB class 筛选结果：', classes);

  // 获取使用了上述LB class与LB policy对照关系
  const policiesJoinClasses = lbPolicies.reduce((acc, p) => {
    const pJoinClasses = classes.reduce((acc2, c) => {
      if (p.classActions.some(ca => ca.cls === c.name)) {
        return acc2.concat([{
          policy: p,
          cls: c,
        }]);
      }
      return acc2;
    }, []);
    return acc.concat(pJoinClasses);
  }, []);
  info('policies Join Classes::::', policiesJoinClasses);

  const result = policiesJoinClasses.map(({ policy, cls }) => {
    const actionName = policy.classActions.find(ca => ca.cls === cls.name).action;
    const action = lbActions.find(a => a.name === actionName);
    const serverFarm = sfs.find(sf => sf.name === action.serverFarm.split(' (')[0]);
    const realServers = rss.filter(rs => rs.serverFarm === action.serverFarm.split(' (')[0]);
    const virtualServers = vss.filter(vs => vs.lbPolicy === policy.name);
    return {
      policy,
      cls,
      action,
      serverFarm,
      realServers,
      virtualServers,
    };
  });
  return result;
};

export const domainSearch = (options = {}) => async (req, res, next) => {
  let { getDomain, success, fail } = options;

  getDomain = getDomain || (req => req.params.domain);
  success = success || ((data, req, res, next) => {
    res.searchResult = data;
    next();
  });
  fail = fail || ((e, req, res) => res.send({
    ret: SERVER_FAILED,
    msg: e.message,
  }));

  const domain = getDomain(req, res);
  try {
    const data = await deepSearch(domain);
    success(data, req, res, next);
  } catch (e) {
    fail(e, req, res, next);
  }
};
