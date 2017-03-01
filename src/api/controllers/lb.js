/*
eslint-disable no-param-reassign, no-console
 */

import { Router } from 'express';
import expressJwt from 'express-jwt';
import { SUCCESS, SERVER_FAILED, UNAUTHORIZED } from 'nagu-validates';
import { auth, error, info } from '../../config';
import * as lbModel from '../models/cachedLb';
import * as middleware from '../middlewares/lb';

const router = new Router();

router.get('/dashboard',
  // 确保用户已登录
  // expressJwt({
  //   secret: auth.jwt.secret,
  //   credentialsRequired: true,
  //   getToken: wxeAuth.getToken,
  // }),
  (req, res, next) => {
    console.time('运行时间');
    next();
  },
  // 获取数据
  middleware.dashboard(),
  (req, res, next) => {
    console.timeEnd('运行时间');
    next();
  },
  // 返回结果
  async (req, res) => res.json({
    ret: SUCCESS,
    data: res.dashboard,
  }),
);

export default router;
