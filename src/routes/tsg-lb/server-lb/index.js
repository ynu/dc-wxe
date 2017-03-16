/* eslint-disable global-require */
export default {

  path: '/server-lb',

  children: [
    require('./virtual-servers').default,
    require('./server-farms').default,
    require('./search').default,
  ],
};
