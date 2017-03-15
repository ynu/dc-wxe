import React from 'react';
import Cluster from './Cluster';

export default {

  path: '/cluster/:siteUri/:clusterUri',

  async action() {
    return {
      title: 'FC集群',
      component: <Cluster />,
    };
  },

};
