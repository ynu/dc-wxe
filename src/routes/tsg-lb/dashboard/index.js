import React from 'react';
import DashBoard from './DashBoard';

export default {

  path: '/dashboard',

  async action() {
    return {
      title: '仪表盘',
      component: <DashBoard />,
    };
  },

};
