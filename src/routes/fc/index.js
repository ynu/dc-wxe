/* eslint-disable global-require */
export default {

  path: '/fc',

  children: [
    require('./sites').default,
    require('./clusters').default,
  ],
};
