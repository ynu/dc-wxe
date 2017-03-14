import React from 'react';
import ServerFarms from './ServerFarms';

export default {

  path: '/server-farms',

  async action() {
    return {
      title: '实服务组',
      component: <ServerFarms />,
    };
  },

};
