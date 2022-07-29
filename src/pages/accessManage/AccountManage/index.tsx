import {
  addUser,
  delUser,
  editUser,
  queryUserList,
} from '@/services/assessManage/user/UserController';
import type { ProFormInstance } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, message, Modal, Popconfirm } from 'antd';
import type { FC } from 'react';
import { useRef } from 'react';
import AccountForm from './components/accountForm';

const AccountManage: FC = () => {
  // table form逻辑
  const modalFormRef = useRef<ProFormInstance>(null);
  const tableRef = useRef<ActionType>(null);
  const onSubmit = async (item: any) => {
    await modalFormRef?.current?.validateFields();
    const values = await modalFormRef?.current?.getFieldsValue();
    const relVal = {
      ...values,
      avatar: values?.avatar?.[0]?.file_link,
      role: values?.role?.[0]?.label
        ? values?.role?.map((item: { value: any }) => item?.value)
        : values?.role,
    };
    if (item) {
      // 编辑
      const res = await editUser({
        ...relVal,
        id: item?.id,
      });
      if (res?.code === 200) {
        message.success(res?.message || '编辑成功');
        tableRef?.current?.reload();
        return Promise.resolve();
      }
      return Promise.reject();
    } else {
      const res = await addUser(relVal);
      if (res?.code === 200) {
        message.success(res?.message || '创建成功');
        tableRef?.current?.reload();
        return Promise.resolve();
      }
      return Promise.reject();
    }
  };
  const onOpenModal = (item: any = null) => {
    if (item) {
      item = {
        ...item,
        avatar: [
          {
            uid: 'test',
            name: item?.avatar?.split('/')?.[
              item?.avatar?.split('/')?.length - 1
            ],
            // name: '富文本',
            status: 'done',
            url: item?.avatar,
          },
        ],
        role: item?.role?.map((item: Role.RoleEntity) => ({
          label: item?.name,
          value: item?.id,
        })),
      };
    }
    Modal.confirm({
      title: item ? '编辑人员' : '新增人员',
      width: 600,
      icon: false,
      onOk: () => onSubmit(item),
      okText: '保存',
      cancelText: '取消',
      content: <AccountForm modalFormRef={modalFormRef} cItem={item} />,
    });
  };

  const onDel = async (id: number) => {
    const res = await delUser({ id });
    if (res?.code === 200) {
      message.success(res?.message || '删除成功');
      tableRef?.current?.reloadAndRest?.();
    }
  };

  const columns: ProColumns[] = [
    {
      title: '姓名/用户账号',
      dataIndex: 'search',
      hideInTable: true,
    },
    {
      title: '序号',
      dataIndex: 'id',
      hideInSearch: true,
      width: 60,
    },
    {
      title: '姓名',
      dataIndex: 'username',
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      hideInSearch: true,
    },
    {
      title: '角色',
      dataIndex: 'role',
      hideInSearch: true,
      render: (text, record) => {
        return record?.role?.length > 0
          ? record?.role?.map((item: Role.RoleEntity) => item.name).join('，')
          : '-';
      },
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      width: 200,
      render: (_, value) => [
        <Button type="primary" key="edit" onClick={() => onOpenModal(value)}>
          编辑
        </Button>,
        <Popconfirm
          placement="topRight"
          title={'是否确定删除数据？'}
          onConfirm={() => onDel(value?.id)}
          okText="确定"
          cancelText="取消"
          key="del"
        >
          <Button type="dashed" danger>
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        actionRef={tableRef}
        bordered
        rowKey="id"
        columns={columns}
        search={{ labelWidth: 'auto' }}
        request={async (params = {}, sort, filter) => {
          console.log(params, sort, filter);
          const { current, pageSize, ...otherParams } = params;
          const res = await queryUserList({
            current,
            pageSize,
            ...otherParams,
          });
          if (res?.code === 200) {
            return {
              total: res?.total,
              data: res?.data,
              success: true,
            };
          }
          return {
            success: false,
          };
        }}
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
        }}
        toolBarRender={() => [
          <Button type="primary" key="new" onClick={() => onOpenModal()}>
            新增人员
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default AccountManage;
