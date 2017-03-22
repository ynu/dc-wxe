/*
eslint-disable no-param-reassign, no-console
 */

import { Router } from 'express';
import expressJwt from 'express-jwt';
import { SUCCESS } from 'nagu-validates';
import { auth, error, info } from '../../config';
import * as middleware from '../middlewares/fc';
import * as wxeAuth from './wxe-auth-middlewares';

const router = new Router();

router.get('/sites',
  // 确保用户已登录
  expressJwt({
    secret: auth.jwt.secret,
    credentialsRequired: true,
    getToken: wxeAuth.getToken,
  }),
  // 获取数据
  middleware.sites(),
  // 返回结果
  async (req, res) => res.json({
    ret: SUCCESS,
    data: res.sites,
  }),
);

router.get('/sites/:siteUri/clusters',
  // 确保用户已登录
  expressJwt({
    secret: auth.jwt.secret,
    credentialsRequired: true,
    getToken: wxeAuth.getToken,
  }),
  // 获取数据
  middleware.clusters(),
  // 返回结果
  async (req, res) => res.json({
    ret: SUCCESS,
    data: res.clusters,
  }),
);

router.get('/sites/:siteUri/clusters/:clusterUri',
  // 确保用户已登录
  expressJwt({
    secret: auth.jwt.secret,
    credentialsRequired: true,
    getToken: wxeAuth.getToken,
  }),
  // 获取数据
  middleware.cluster(),
  // 返回结果
  async (req, res) => res.json({
    ret: SUCCESS,
    data: res.cluster,
  }),
);

router.get('/sites/:siteUri/computer-resource/:clusterUri',
  // 确保用户已登录
  expressJwt({
    secret: auth.jwt.secret,
    credentialsRequired: true,
    getToken: wxeAuth.getToken,
  }),
  // 获取数据
  middleware.computerResource(),
  // 返回结果
  async (req, res) => res.json({
    ret: SUCCESS,
    data: res.computerResource,
  }),
);

router.get('/sites/:siteUri/clusters/:clusterUri/hosts',
  // 确保用户已登录
  expressJwt({
    secret: auth.jwt.secret,
    credentialsRequired: true,
    getToken: wxeAuth.getToken,
  }),
  // 获取数据
  middleware.hosts(),
  // 返回结果
  async (req, res) => res.json({
    ret: SUCCESS,
    data: res.hosts,
  }),
);

router.get('/sites/:siteUri/hosts/:hostUri',
  // 确保用户已登录
  expressJwt({
    secret: auth.jwt.secret,
    credentialsRequired: true,
    getToken: wxeAuth.getToken,
  }),
  // 获取数据
  middleware.host(),
  // 返回结果
  async (req, res) => res.json({
    ret: SUCCESS,
    data: res.data,
  }),
);

router.get('/sites/:siteUri/hosts/:hostUri/vms',
  // 确保用户已登录
  expressJwt({
    secret: auth.jwt.secret,
    credentialsRequired: true,
    getToken: wxeAuth.getToken,
  }),
  // 获取数据
  middleware.vms(),
  // 返回结果
  async (req, res) => res.json({
    ret: SUCCESS,
    data: res.vms,
  }),
);

export default router;
