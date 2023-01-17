// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: 'prorelease',
      REACT_APP_BASE_URL: 'https://prorelease.prorelease.cn',
      REACT_APP_QUESTION_URL: 'https://prorelease.prorelease.cn',
      REACT_APP_MINIO_ENDPOINT: 'prorelease.aimed.cn',
      REACT_APP_MINIO_ACCESSKEY: 'prorelease',
      REACT_APP_MINIO_SECRETKEY: 'prorelease',
    },
  },
  outputPath: 'dist-protest',
});
