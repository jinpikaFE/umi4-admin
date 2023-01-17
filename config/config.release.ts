// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: 'release',
      REACT_APP_BASE_URL: 'https://release.release.cn',
      REACT_APP_QUESTION_URL: 'https://release.release.cn',
      REACT_APP_MINIO_ENDPOINT: 'release.aimed.cn',
      REACT_APP_MINIO_ACCESSKEY: 'release',
      REACT_APP_MINIO_SECRETKEY: 'release',
    },
  },
  outputPath: 'dist-prod',
});
