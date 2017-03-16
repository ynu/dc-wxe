import React from 'react';
import Search from './Search';

export default {

  path: '/search',

  async action() {
    return {
      title: '域名检索',
      component: <Search />,
    };
  },

};
