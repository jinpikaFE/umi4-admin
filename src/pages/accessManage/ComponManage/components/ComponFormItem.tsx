import { ProFormSelect, ProFormText } from '@ant-design/pro-form';

import React, { useEffect } from 'react';

const ComponFormItem: React.FC<{ cRecord: any }> = (props) => {
  const { cRecord } = props;

  useEffect(() => {}, [cRecord]);

  return (
    <>
      <ProFormText
        width="md"
        name="parentId"
        label="上级组件"
        disabled
        hidden
      />
      <ProFormText
        width="md"
        name="parentName"
        label="上级组件"
        disabled
      />
      <ProFormSelect
        width="md"
        name="type"
        label="组件类型"
        placeholder="请输入选择组件类型"
        rules={[{ required: true, message: '请输入选择组件类型!' }]}
        valueEnum={{
          menu: { text: '菜单组件', color: 'green' },
          page: {
            text: '页面组件',
            color: 'pink',
          },
          component: {
            text: '普通组件',
            color: 'blue',
          },
        }}
      />
      <ProFormText
        width="md"
        name="name"
        label="组件名称"
        tooltip="最长为 16 位"
        placeholder="请输入组件名称"
        rules={[
          { required: true, message: '请输入组件名称!' },
          {
            validator: (rule, value, callback) => {
              if (value.length > 16) {
                callback('组件名过长，最长为 16 位');
              } else {
                callback();
              }
            },
          },
        ]}
      />
    </>
  );
};

export default ComponFormItem;
