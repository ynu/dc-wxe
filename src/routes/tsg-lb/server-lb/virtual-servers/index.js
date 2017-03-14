import React from 'react';
import VirtualServers from './VirtualServers';

export default {

  path: '/virtual-servers',

  async action() {
    return {
      title: '虚服务',
      component: <VirtualServers />,
    };
  },

};
