import { FORM_LAYOUT } from '@/common/constants';
import FormSelectPage, { TAsyncGetListObj } from '@/components/formSelectPage';
import FormUploadImg from '@/components/formUploadImg';
import { sendSms } from '@/global/api';
import { queryRoleList } from '@/services/assessManage/role/RoleController';
import { MailTwoTone } from '@ant-design/icons';
import { ProFormCaptcha } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { message } from 'antd';
import { FC, useEffect } from 'react';

type THosForm = {
  modalFormRef: React.RefObject<ProFormInstance<any>>;
  cItem: any;
};

const AccountForm: FC<THosForm> = (props) => {
  const { modalFormRef, cItem } = props;

  useEffect(() => {
    modalFormRef?.current?.setFieldsValue(cItem);
  }, [cItem]);

  const asyncGetList = async (obj: TAsyncGetListObj) => {
    const { setPageProps, setOptions, searchVal, pageProps } = obj;
    const { current, pageSize } = pageProps;
    const res = await queryRoleList({
      current,
      pageSize,
      search: searchVal,
    });
    setPageProps({ total: res?.total });
    const newData = res?.data?.map((item) => {
      return {
        label: item?.name,
        value: item?.id,
      };
    });
    setOptions(newData);
  };

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
        label="用户名"
        placeholder="请输入姓名"
        rules={[{ required: true, message: '请输入姓名' }]}
      />
      <ProFormText
        width="md"
        name="email"
        label="邮箱"
        placeholder="请输入邮箱"
        rules={[
          {
            type: 'email',
            message: '请输入正确的邮箱!',
          },
          {
            required: true,
            message: '请输入邮箱!',
          },
        ]}
      />
      {!cItem && (
        <>
          <ProFormText.Password
            width="md"
            label="密码"
            name="password"
            extra="密码至少包含 数字和英文，长度6-20"
            validateFirst={true}
            rules={[
              { required: true, message: '请输入密码!' },
              {
                validator: (rule, value, callback) => {
                  const match = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/g;
                  if (!match.test(value)) {
                    callback('密码至少包含 数字和英文，长度6-20');
                  } else {
                    callback();
                  }
                },
              },
            ]}
          />
          <ProFormText.Password
            width="md"
            label="确认密码"
            name="confirmPassword"
            placeholder="请再次输入密码"
            rules={[
              { required: true, message: '请输入确认密码密码!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入密码不一致!'));
                },
              }),
            ]}
          />
        </>
      )}
      <ProFormText
        width="md"
        name="phone"
        label="手机号"
        placeholder="请输入手机号"
        fieldProps={{
          maxLength: 11,
        }}
        rules={[
          { required: true, message: '请输入手机号!' },
          {
            validator: (rule, value, callback) => {
              const match =
                /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/g;
              if (!match.test(value)) {
                callback('请输入正确的手机号');
              } else {
                callback();
              }
            },
          },
        ]}
      />
      <ProFormCaptcha
        fieldProps={{
          size: 'large',
          prefix: <MailTwoTone />,
        }}
        captchaProps={{
          size: 'large',
        }}
        label="验证码"
        // 手机号的 name，onGetCaptcha 会注入这个值
        phoneName="phone"
        name="captcha"
        rules={[
          {
            required: true,
            message: '请输入验证码',
          },
        ]}
        placeholder="请输入验证码"
        // 如果需要失败可以 throw 一个错误出来，onGetCaptcha 会自动停止
        // throw new Error("获取验证码错误")
        onGetCaptcha={async (phone) => {
          // const random = parseInt((Math.random() * 10000).toString());
          // setCaptcha(random.toString());
          // message.success(`验证码为${random}`);
          const res = await sendSms({ phone });
          if (res?.code === 200) {
            message.success('获取短信验证码成功');
          }
        }}
      />
      <FormUploadImg
        required
        uploadProps={{ maxCount: 1 }}
        formItemProps={{ name: 'avatar', label: '头像' }}
      />
      <FormSelectPage
        proFormSelectProps={
          {
            name: 'role',
            label: '绑定角色',
            rules: [{ required: true, message: '请选择' }],
            placeholder: '请选择角色',
          } as any
        }
        asyncGetList={asyncGetList}
      />
    </ProForm>
  );
};

export default AccountForm;
