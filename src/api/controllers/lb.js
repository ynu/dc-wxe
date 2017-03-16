/*
eslint-disable no-param-reassign, no-console
 */

import { Router } from 'express';
import expressJwt from 'express-jwt';
import { SUCCESS, SERVER_FAILED, UNAUTHORIZED } from 'nagu-validates';
import { auth, error, info } from '../../config';
import * as lbModel from '../models/cachedLb';
import * as middleware from '../middlewares/lb';
import * as searchMw from '../middlewares/domain-search';

const router = new Router();

router.get('/dashboard',
  // 确保用户已登录
  // expressJwt({
  //   secret: auth.jwt.secret,
  //   credentialsRequired: true,
  //   getToken: wxeAuth.getToken,
  // }),
  // 获取数据
  middleware.dashboard(),
  // 返回结果
  async (req, res) => res.json({
    ret: SUCCESS,
    data: res.dashboard,
  }),
);

router.get('/server-lb/virtual-servers',
  // 确保用户已登录
  // expressJwt({
  //   secret: auth.jwt.secret,
  //   credentialsRequired: true,
  //   getToken: wxeAuth.getToken,
  // }),
  // 获取数据
  middleware.virtualServers(),
  // 返回结果
  async (req, res) => res.json({
    ret: SUCCESS,
    data: res.virtualServers,
  }),
);

router.get('/server-lb/server-farms',
  // 确保用户已登录
  // expressJwt({
  //   secret: auth.jwt.secret,
  //   credentialsRequired: true,
  //   getToken: wxeAuth.getToken,
  // }),
  // 获取数据
  middleware.serverFarms(),
  // 返回结果
  async (req, res) => res.json({
    ret: SUCCESS,
    data: res.serverFarms,
  }),
);

router.get('/server-lb/real-servers',
  // 确保用户已登录
  // expressJwt({
  //   secret: auth.jwt.secret,
  //   credentialsRequired: true,
  //   getToken: wxeAuth.getToken,
  // }),
  // 获取数据
  middleware.realServers(),
  // 返回结果
  async (req, res) => res.json({
    ret: SUCCESS,
    data: res.realServers,
  }),
);

router.get('/search/:domain',
  // (req, res) => {
  //   res.send('ok');
  // },
  // 确保用户已登录
  // expressJwt({
  //   secret: auth.jwt.secret,
  //   credentialsRequired: true,
  //   getToken: wxeAuth.getToken,
  // }),
  // 获取数据
  searchMw.domainSearch(),
  // 返回结果
  async (req, res) => res.json({
    ret: SUCCESS,
    data: res.searchResult,
  }),
);
export default router;
