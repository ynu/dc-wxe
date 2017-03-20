import React from 'react';
import Site from './Site';

export default {

  path: '/site/:siteUri',

  async action({ params }) {
    return {
      title: 'FC站点',
      component: <Site {...params} />,
    };
  },

};
