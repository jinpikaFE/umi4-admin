// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: 'pro',
      REACT_APP_BASE_URL: 'https://pro.pro.net',
      REACT_APP_QUESTION_URL: 'https://pro.pro.net',
      REACT_APP_MINIO_ENDPOINT: 'pro.aimed.cn',
      REACT_APP_MINIO_ACCESSKEY: 'pro',
      REACT_APP_MINIO_SECRETKEY: 'pro',
    },
  },
});
