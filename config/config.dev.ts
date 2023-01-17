// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: 'dev',
      REACT_APP_MINIO_ENDPOINT: 'dev.aimed.cn',
      REACT_APP_MINIO_ACCESSKEY: 'dev',
      REACT_APP_MINIO_SECRETKEY: 'dev',
    },
  },
});
