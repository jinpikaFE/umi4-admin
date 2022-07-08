import { FORM_LAYOUT } from '@/common/constants';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormSelect } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { useEffect } from 'react';
import type { FC } from 'react';

type THosForm = {
  modalFormRef: React.RefObject<ProFormInstance<any>>;
  cItem: any;
};

const AccountForm: FC<THosForm> = (props) => {
  const { modalFormRef, cItem } = props;

  const roleOptions = [
    { label: '管理后台用户', value: 0 },
    { label: '企业后台用户', value: 1 },
  ];

  useEffect(() => {
    modalFormRef?.current?.setFieldsValue(cItem);
  }, [cItem]);

  return (
    <ProForm
      formRef={modalFormRef}
      style={{ marginTop: 24 }}
      layout="horizontal"
      submitter={false}
      {...FORM_LAYOUT}
    >
      <ProFormText
        width="md"
        name="username"
        label="姓名"
        placeholder="请输入姓名"
        rules={[{ required: true, message: '请输入姓名' }]}
        disabled={cItem}
      />
      <ProFormText
        width="md"
        name="mobile"
        label="手机号"
        placeholder="请输入手机号"
        fieldProps={{
          maxLength: 11,
        }}
        rules={[{ required: true, message: '请输入手机号' }]}
        disabled={cItem}
      />
      <ProFormSelect
        options={roleOptions}
        width="md"
        name="role"
        label="绑定角色"
        placeholder="请选择角色"
        rules={[{ required: true, message: '请选择角色' }]}
        initialValue={0}
        disabled
      />
    </ProForm>
  );
};

export default AccountForm;
