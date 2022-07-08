import ComponTree from '@/components/ComponTree';
import {
  addCompon,
  delCompon,
  editCompon,
  queryComponList,
} from '@/services/assessManage/compon/ComponController';
import { toTree } from '@/utils';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { useModel } from '@umijs/max';
import { Button, message, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import ComponFormItem from './components/ComponFormItem';

const SideMenu: React.FC = () => {
  const refTable = useRef<ActionType>();
  const formRef = useRef();
  const childrenRef = useRef<any>(null);

  const [cItem, setCItem] = useState<Compon.ComponEntity>();

  const { setAuthCompon } = useModel('useAuthModel', (model) => ({
    setAuthCompon: model.setAuthCompon,
  }));

  const del = async (id: string) => {
    const res = await delCompon({ id });
    if (res?.code === 200) {
      refTable?.current?.reload();
      message.success('删除成功！');
    }
  };

  const columns: ProColumns[] = [
    {
      title: '组件名称',
      dataIndex: 'name',
      copyable: true,
    },
    {
      title: '序号',
      dataIndex: 'id',
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'select',
      width: '10%',
      valueEnum: {
        menu: { text: '菜单组件', color: 'green' },
        page: {
          text: '页面组件',
          color: 'pink',
        },
        component: {
          text: '普通组件',
          color: 'blue',
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record) => [
        <Button
          type="link"
          key="addChild"
          onClick={() => {
            childrenRef.current?.edit({
              parentId: record?.id,
              parentName: record?.name,
            });
          }}
        >
          添加子组件
        </Button>,
        <Button
          type="link"
          key="editable"
          onClick={() => {
            setCItem(record);
            childrenRef.current?.edit({
              ...record,
              parentName: record?.parent?.name,
            });
          }}
        >
          编辑
        </Button>,
        <span key="del">
          {!record?.children && (
            <Popconfirm
              placement="topRight"
              title="确定要删除吗?"
              onConfirm={() => del(record?.id)}
              okText="确定"
              okType="danger"
              cancelText="取消"
            >
              <Button type="link" danger key="delete">
                删除
              </Button>
            </Popconfirm>
          )}
        </span>,
      ],
    },
  ];

  const renderFormItemDom = () => {
    return (
      // 在组件列表中复制对应的id
      // 当前['admin1', 'test'] 在mock中添加admin即可显示
      <>
        <ComponFormItem cRecord={cItem} />
      </>
    );
  };

  const onFinish = async (values: any) => {
    if (cItem && cItem?.name) {
      // 编辑逻辑
      const res = await editCompon({
        ...values,
        id: cItem?.id,
        parentName: undefined,
      });
      if (res?.code === 200) {
        message.success(res?.message || '编辑成功');
        refTable?.current?.reload();
        childrenRef.current?.colseDrawer();
      }
    } else {
      const res = await addCompon(values);
      if (res.code === 200) {
        message.success(res?.message || '创建成功');
        refTable?.current?.reload();
        childrenRef.current?.colseDrawer();
      }
    }
  };

  return (
    <PageContainer>
      <ComponTree
        ref={childrenRef}
        onFinish={onFinish}
        formRef={formRef}
        refTable={refTable}
        newBtnTitle="添加一级组件"
        proTableProps={{
          headerTitle: '组件列表',
          request: async () => {
            const res = await queryComponList();
            if (res?.code === 200) {
              setAuthCompon(res?.data)
              const dataTemp = toTree({
                data: JSON.parse(JSON.stringify(res?.data)),
                key: 'id',
                parentKey: 'parentId',
                cb: (item) => item,
              });
              return {
                data: dataTemp,
                success: true,
                total: 0,
              };
            }
            return {
              success: false,
            };
          },
        }}
        FromProps={{
          initialValues: {
            isLink: 0,
            // parentId: cItem?.parentId,
          },
        }}
        cItem={cItem}
        setCItem={setCItem}
        drawerTitle="新增组件"
        renderFormItemDom={renderFormItemDom}
        columns={columns}
      />
    </PageContainer>
  );
};

export default SideMenu;
