import { Space } from 'antd';
import React from 'react';
import Avatar from './AvatarDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  return (
    <Space className={styles.right}>
      <Avatar />
    </Space>
  );
};
export default GlobalHeaderRight;
