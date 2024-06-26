/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { RouteSchemaComponent } from '@nocobase/client';
import { renderApp, waitFor, screen } from '@nocobase/test/client';
import React from 'react';

describe('route-schema-component', () => {
  it('should render correctly', async () => {
    await renderApp({
      designable: true,
      noWrapperSchema: true,
      appOptions: {
        router: {
          type: 'memory',
          initialEntries: ['/admin/test'],
          routes: {
            test: {
              path: '/admin/:name',
              element: <RouteSchemaComponent />,
            },
          },
        },
      },
      apis: {
        '/uiSchemas:getProperties/test': {
          data: {
            type: 'void',
            properties: {
              test: {
                'x-component': 'div',
                'x-content': 'test',
                'x-component-props': {
                  'data-testid': 'test',
                },
              },
            },
          },
        },
      },
    });

    await waitFor(() => {
      expect(screen.queryByTestId('test')).toBeInTheDocument();
      expect(screen.queryByTestId('test')).toHaveTextContent('test');
    });
  });
});
