/*
eslint-disable no-param-reassign, no-plusplus, no-shadow
 */

import { error, info } from '../../config';
import { SERVER_FAILED } from 'nagu-validates';
import * as model from '../models/cachedFc';

export const sites = (options = {}) => async (req, res, next) => {
  let { success, fail } = options;

  success = success || ((data, req, res, next) => {
    res.sites = data;
    next();
  });
  fail = fail || ((e, req, res) => res.send({
    ret: SERVER_FAILED,
    msg: e.message,
  }));

  try {
    const result = await model.sites();
    success(result, req, res, next);
  } catch (e) {
    error('sites中间件异常', e.message);
    fail(e, req, res, next);
  }
};

export const clusters = (options = {}) => async (req, res, next) => {
  let { success, fail, getSiteUri } = options;

  success = success || ((data, req, res, next) => {
    res.clusters = data;
    next();
  });
  fail = fail || ((e, req, res) => res.send({
    ret: SERVER_FAILED,
    msg: e.message,
  }));

  getSiteUri = getSiteUri || (req => req.params.siteUri);
  const siteUri = getSiteUri(req, res);
  try {
    const result = await model.clusters(siteUri);
    success(result, req, res, next);
  } catch (e) {
    error('clusters中间件异常', e.message);
    fail(e, req, res, next);
  }
};

export const cluster = (options = {}) => async (req, res, next) => {
  let { success, fail, getSiteUri, getClusterUri } = options;

  success = success || ((data, req, res, next) => {
    res.cluster = data;
    next();
  });
  fail = fail || ((e, req, res) => res.send({
    ret: SERVER_FAILED,
    msg: e.message,
  }));

  getSiteUri = getSiteUri || (req => req.params.siteUri);
  getClusterUri = getClusterUri || (req => req.params.clusterUri);
  const siteUri = getSiteUri(req, res);
  const clusterUri = getClusterUri(req, res);
  try {
    const result = await model.cluster(siteUri, clusterUri);
    success(result, req, res, next);
  } catch (e) {
    error('cluster中间件异常', e.message);
    fail(e, req, res, next);
  }
};

export const computerResource = (options = {}) => async (req, res, next) => {
  let { success, fail, getSiteUri, getClusterUri } = options;

  success = success || ((data, req, res, next) => {
    res.computerResource = data;
    next();
  });
  fail = fail || ((e, req, res) => res.send({
    ret: SERVER_FAILED,
    msg: e.message,
  }));

  getSiteUri = getSiteUri || (req => req.params.siteUri);
  getClusterUri = getClusterUri || (req => req.params.clusterUri);
  const siteUri = getSiteUri(req, res);
  const clusterUri = getClusterUri(req, res);
  try {
    const result = await model.computerResource(siteUri, clusterUri);
    success(result, req, res, next);
  } catch (e) {
    error('computerResource中间件异常', e.message);
    fail(e, req, res, next);
  }
};
