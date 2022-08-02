import RightDrawer from '@/components/RightDrawer';
import { queryComponList } from '@/services/assessManage/compon/ComponController';
import {
  addRole,
  delRole,
  editRole,
  queryRoleList,
} from '@/services/assessManage/role/RoleController';
// import { getInterviewList } from '@/services/account/api';

import { PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, message, Popconfirm } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import RoleFormItem from './components/RoleFormItem';

const RoleManager: React.FC = () => {
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
  const [cItem, setCItem] = useState<Compon.ComponEntity>();
  const refTable = useRef<ActionType>();
  const formRef = useRef<ProFormInstance | any>();

  const [treeData, setTreeData] = useState<Compon.ComponEntity[]>([]);

  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const onCloseDrawer = () => {
    setVisibleDrawer(false);
  };

  const edit = async (item: any) => {
    setCItem({
      ...item,
      compon: [
        item?.compon?.map((citem: any) => citem?.id),
        item?.half_compon?.map((citem: any) => citem?.id),
      ],
    });
    showDrawer();
  };

  const del = async (id: string) => {
    const res = await delRole({ id });
    if (res.code === 200) {
      message.success(res?.message || '删除成功');
      refTable?.current?.reloadAndRest?.();
    }
  };

  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: 'id',
      hideInSearch: true,
      width: 60,
    },
    {
      title: '角色名',
      dataIndex: 'name',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '角色描述',
      dataIndex: 'desc',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record) => [
        <Button
          type="primary"
          key="editable"
          onClick={() => {
            edit(record);
          }}
        >
          编辑
        </Button>,
        <Popconfirm
          key="del"
          placement="topRight"
          title="确定要删除吗?"
          onConfirm={() => del(record?.id)}
          okText="确定"
          okType="danger"
          cancelText="取消"
        >
          <Button danger key="delete">
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  const getCompon = async () => {
    const res = await queryComponList();
    if (res?.code === 200) {
      setTreeData(res?.data);
    }
  };

  useEffect(() => {
    getCompon();
  }, []);

  const renderFormItemDom = () => {
    return <RoleFormItem treeData={treeData} />;
  };

  const onFinish = async (values: any) => {
    const relVal = {
      ...values,
      compon: values?.compon?.[0],
      half_compon: values?.compon?.[1],
    };
    if (cItem) {
      // 编辑逻辑，后端要操作组件数据和角色数据
      const res = await editRole({ ...relVal, id: cItem?.id });
      if (res?.code === 200) {
        message.success(res?.message || '创建成功');
        setVisibleDrawer(false);
        refTable?.current?.reload();
      }
    } else {
      // 新增逻辑，后端要操作组件数据和角色数据
      const res = await addRole(relVal);
      if (res?.code === 200) {
        message.success(res?.message || '创建成功');
        setVisibleDrawer(false);
        refTable?.current?.reload();
      }
    }
  };

  return (
    <PageContainer>
      <ProTable
        scroll={{ x: true }}
        bordered
        request={async (params) => {
          const { current, pageSize, ...restParams } = params;
          const res = await queryRoleList({
            current,
            pageSize,
            ...restParams,
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
        columns={columns}
        actionRef={refTable}
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30', '50', '100'],
        }}
        dateFormatter="string"
        headerTitle="角色列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              showDrawer();
              setCItem(undefined);
            }}
          >
            新建
          </Button>,
        ]}
      />
      <RightDrawer
        ref={formRef}
        onCloseDrawer={onCloseDrawer}
        visibleDrawer={visibleDrawer}
        cItem={cItem}
        title="新增角色"
        renderFormItemDom={renderFormItemDom}
        onFinish={onFinish as any}
      />
    </PageContainer>
  );
};

export default RoleManager;
