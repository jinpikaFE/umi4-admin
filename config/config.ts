import { defineConfig } from '@umijs/max';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  npmClient: 'yarn',
  proxy: proxy[REACT_APP_ENV || 'dev'],
  routes,
});
