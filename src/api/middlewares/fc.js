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

export const hosts = (options = {}) => async (req, res, next) => {
  let { success, fail, getSiteUri, getClusterUri } = options;

  success = success || ((data, req, res, next) => {
    res.hosts = data;
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
    let result = (await model.hosts(siteUri)).list;

    // 如果有clusterUri参数，则根据clusterUri进行筛选
    if (clusterUri) {
      result = result.filter(host => host.clusterUrn.includes(`clusters:${clusterUri}`));
    }
    success(result, req, res, next);
  } catch (e) {
    error('hosts中间件异常', e.message);
    fail(e, req, res, next);
  }
};

export const host = (options = {}) => async (req, res, next) => {
  let { success, fail, getSiteUri, getHostUri } = options;

  success = success || ((data, req, res, next) => {
    res.data = data;
    next();
  });
  fail = fail || ((e, req, res) => res.send({
    ret: SERVER_FAILED,
    msg: e.message,
  }));

  getSiteUri = getSiteUri || (req => req.params.siteUri);
  getHostUri = getHostUri || (req => req.params.hostUri);
  const siteUri = getSiteUri(req, res);
  const hostUri = getHostUri(req, res);
  try {
    const result = (await model.hosts(siteUri)).list.find(host => host.uri.includes(`/hosts/${hostUri}`));
    success(result, req, res, next);
  } catch (e) {
    error('host中间件异常', e.message);
    fail(e, req, res, next);
  }
};

export const vms = (options = {}) => async (req, res, next) => {
  let { success, fail, getSiteUri, getHostUri } = options;

  success = success || ((data, req, res, next) => {
    res.vms = data;
    next();
  });
  fail = fail || ((e, req, res) => res.send({
    ret: SERVER_FAILED,
    msg: e.message,
  }));

  getSiteUri = getSiteUri || (req => req.params.siteUri);
  getHostUri = getHostUri || (req => req.params.hostUri);
  const siteUri = getSiteUri(req, res);
  const hostUri = getHostUri(req, res);
  try {
    let result = await model.vms(siteUri);
    result = result.filter(vm => vm.hostUrn.includes(`hosts:${hostUri}`));

    success(result, req, res, next);
  } catch (e) {
    error('vms中间件异常', e.message);
    fail(e, req, res, next);
  }
};

export const vm = (options = {}) => async (req, res, next) => {
  let { success, fail, getSiteUri, getVmUri } = options;

  success = success || ((data, req, res, next) => {
    res.data = data;
    next();
  });
  fail = fail || ((e, req, res) => res.send({
    ret: SERVER_FAILED,
    msg: e.message,
  }));

  getSiteUri = getSiteUri || (req => req.params.siteUri);
  getVmUri = getVmUri || (req => req.params.vmUri);
  const siteUri = getSiteUri(req, res);
  const vmUri = getVmUri(req, res);
  try {
    const result = await model.vm(siteUri, vmUri);
    success(result, req, res, next);
  } catch (e) {
    error('vm中间件异常', e.message);
    fail(e, req, res, next);
  }
};
