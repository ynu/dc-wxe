import React from 'react';
import Vm from './Vm';

export default {

  path: '/vms/:siteUri/:vmUri',

  async action({ params }) {
    return {
      title: 'FC虚拟机',
      component: <Vm {...params} />,
    };
  },

};
