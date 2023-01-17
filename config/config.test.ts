// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
  define: {
    'process.env': {
      NODE_ENV: 'test',
      // REACT_APP_BASE_URL: 'https://test.test.net',
      REACT_APP_MINIO_ENDPOINT: 'test.aimed.cn',
      REACT_APP_MINIO_ACCESSKEY: 'test',
      REACT_APP_MINIO_SECRETKEY: 'test',
    },
  },
});
