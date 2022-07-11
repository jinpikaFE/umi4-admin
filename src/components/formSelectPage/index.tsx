import { ProFormSelect } from '@ant-design/pro-form';
import { useDebounceFn, useSetState } from 'ahooks';
import type { SetState } from 'ahooks/lib/useSetState';
import type { PaginationProps, SelectProps } from 'antd';
import { Divider, Pagination, Space } from 'antd';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

export type TAsyncGetListObj = {
  setPageProps: SetState<PaginationProps>;
  setOptions: React.Dispatch<React.SetStateAction<any[]>>;
  pageProps: PaginationProps;
  searchVal: string;
};

export type TFormSelectPage = {
  /** ProFormSelect属性 */
  proFormSelectProps?: typeof ProFormSelect;
  /** fieldProps Select的属性 */
  fieldProps?: SelectProps;
  /** 分页属性 */
  extraPageProps?: PaginationProps;
  /** 获取数据并处理 */
  asyncGetList: (obj: TAsyncGetListObj) => void;
};

const FormSelectPage: FC<TFormSelectPage> = (props) => {
  const { proFormSelectProps, fieldProps, extraPageProps, asyncGetList } =
    props;

  const [searchVal, setSearchVal] = useState('');

  const [options, setOptions] = useState<any[]>([]);

  /** 分页属性 */
  const [pageProps, setPageProps] = useSetState<PaginationProps>({
    current: 1,
    total: 0,
    pageSize: 20,
    pageSizeOptions: [20, 50, 100, 500],
    // showSizeChanger: true,
    showTotal: (total) => `总共 ${total} 项`,
    // pageSizeOptions: [11],
    size: 'small',
    ...extraPageProps,
  });

  const { run } = useDebounceFn(
    (val) => {
      setPageProps({ current: 1 });
      setSearchVal(val);
    },
    {
      wait: 500,
    },
  );

  const onPageChange = (current: number, pageSize: number) => {
    setPageProps({ current, pageSize });
  };

  useEffect(() => {
    asyncGetList({ setPageProps, setOptions, pageProps, searchVal });
  }, [pageProps.current, pageProps.pageSize, searchVal]);

  return (
    <ProFormSelect
      mode="multiple"
      showSearch
      // width="md"
      name="hospitals"
      label="医院名称"
      placeholder="请选择医院"
      rules={[{ required: true, message: '请选择医院' }]}
      options={options}
      fieldProps={{
        dropdownRender: (menu) => (
          <>
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <Space align="center" style={{ padding: '0 8px 4px' }}>
              <Pagination {...pageProps} onChange={onPageChange} />
            </Space>
          </>
        ),
        onSearch: (value) => {
          run(value);
        },
        ...fieldProps,
      }}
      {...proFormSelectProps}
    />
  );
};

export default FormSelectPage;
