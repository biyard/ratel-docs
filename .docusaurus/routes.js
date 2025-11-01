import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/',
    component: ComponentCreator('/', '3fd'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', 'ca7'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '63b'),
            routes: [
              {
                path: '/guide/getting-started',
                component: ComponentCreator('/guide/getting-started', '457'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/intro',
                component: ComponentCreator('/intro', '9fa'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
