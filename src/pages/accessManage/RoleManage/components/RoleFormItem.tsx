import TreeSelectJPK from '@/components/TreeSelectJPK';
import { ProFormText } from '@ant-design/pro-form';
import { Form } from 'antd';
import React from 'react';

const Type = {};

const RoleFormItem: React.FC<{ treeData: any[] }> = ({ treeData }) => {
  return (
    <>
      <ProFormText
        name="name"
        label="角色名"
        tooltip="最长为 16 位"
        placeholder="请输入角色名"
        rules={[
          { required: true, message: '请输入角色名!' },
          {
            validator: (rule, value, callback) => {
              if (value.length > 16) {
                callback('角色名过长，最长为 16 位');
              } else {
                callback();
              }
            },
          },
        ]}
      />
      <ProFormText
        name="desc"
        label="角色描述"
        rules={[{ required: true, message: '请输入角色描述!' }]}
      />
      <Form.Item
        label="权限"
        name="compon"
        rules={[{ required: true, message: '请选择权限!' }]}
      >
        <TreeSelectJPK
          // onChange 必传爆红修改处理
          {...(Type as any)}
          treeData={treeData}
          simpleModePropName={{
            id: 'id',
            pId: 'parentId',
            title: 'name',
          }}
          treeDataSimpleMode
          treeProps={{ height: 500 }}
        />
      </Form.Item>
    </>
  );
};

export default RoleFormItem;
