import { Button, ButtonProps } from 'antd';
import React from 'react';
import styles from './index.less';

const PunkEffectButton2: React.FC<
  {
    children: any;
  } & ButtonProps
> = ({ children, ...btnProps }) => {
  return (
    <div className={styles.container}>
      <Button {...btnProps}>{children}</Button>
    </div>
  );
};

export default PunkEffectButton2;
