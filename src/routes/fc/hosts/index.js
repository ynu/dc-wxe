import React from 'react';
import Host from './Host';

export default {

  path: '/hosts/:siteUri/:hostUri',

  async action({ params }) {
    return {
      title: 'FC主机',
      component: <Host {...params} />,
    };
  },

};
