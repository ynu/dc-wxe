/* eslint-disable global-require */
export default {

  path: '/tsg-lb',

  children: [
    require('./dashboard').default,
  ],
};
