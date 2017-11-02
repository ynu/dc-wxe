/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable max-len */
import debug from 'debug';

if (process.env.BROWSER) {
  throw new Error(
    'Do not import `config.js` from inside the client-side code.',
  );
}

export const api = {
  // API URL to be used in the client-side code
  clientUrl: process.env.API_CLIENT_URL || '',
  // API URL to be used in the server-side code
  serverUrl:
    process.env.API_SERVER_URL ||
    `http://localhost:${process.env.PORT || 3000}`,
};

export const databaseUrl = process.env.DATABASE_URL || 'sqlite:database.sqlite';

export const analytics = {
  // https://analytics.google.com/
  googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
};

export const port = process.env.PORT || 3000;

export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;

export const auth = {
  jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },

  // https://developers.facebook.com/
  facebook: {
    id: process.env.FACEBOOK_APP_ID || '186244551745631',
    secret:
      process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc',
  },

  // https://cloud.google.com/console/project
  google: {
    id:
      process.env.GOOGLE_CLIENT_ID ||
      '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
    secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd',
  },

  // https://apps.twitter.com/
  twitter: {
    key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
    secret:
      process.env.TWITTER_CONSUMER_SECRET ||
      'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ',
  },

  // 微信企业号
  wxent: {
    corpId: process.env.WXE_CORPID,
    secret: process.env.WXE_SECRET,
    agentId: process.env.WXE_AGENTID || 28,
  },

  // lb-api token
  lbApiToken: process.env.LB_API_TOKEN,

  // fc-api token
  fcApiToken: process.env.FC_API_TOKEN,

  // zq-api token
  zqApiToken: process.env.ZQ_API_TOKEN,

  // imp-api token
  impApiToken: process.env.IMP_API_TOKEN,
};
// debug
export const error = debug('dc-wxe:error');
// error.log = console.log.bind(console);

export const info = debug('dc-wxe:info');
// info.log = console.log.bind(console);

// lb-api
export const lbApiHost =
  process.env.LB_API_HOST || 'https://api.ynu.edu.cn/tsg-lb/v1';
export const lbSupervisorTag = process.env.LB_SUPERVISOR_TAG_ID || 53;
export const autoFetchInterval =
  parseInt(process.env.AUTO_FETCH_INTERVAL, 10) || 1000;

// fc-api
export const fcApiHost =
  process.env.FC_API_HOST || 'https://api.ynu.edu.cn/fc/v1';
export const fcSupervisorTag = process.env.FC_SUPERVISOR_TAG_ID || 54;

export const dailyReportCron = process.env.DAILY_REPORT_CRON || '0 0 7 * * *';

export const siteUri = process.env.DEFAULT_SITE_URI || '3F7B07E2';

// zq-api
export const zqApiHost =
  process.env.ZQ_API_HOST || 'https://api.ynu.edu.cn/zq/v1';
export const zqSupervisorTag = process.env.ZQ_SUPERVISOR_TAG_ID || 56;

// imp-api
export const impApiHost =
  process.env.IMP_API_HOST || 'https://api.ynu.edu.cn/imp/v1';
export const impSupervisorTag = process.env.IMP_SUPERVISOR_TAG_ID || 57;
