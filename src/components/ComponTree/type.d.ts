import type { ProFormProps } from '@ant-design/pro-form';
import type {
  ActionType,
  ProColumns,
  ProTableProps,
} from '@ant-design/pro-table';
import type { MutableRefObject } from 'react';
import type { DrawerForm } from '../RightDrawer/type';

export type ComponProps = {
  columns: ProColumns[];
  formRef: any;
  cItem: any;
  setCItem: (cItem: any | undefined) => void;
  refTable: MutableRefObject<ActionType | undefined>;
  drawerTitle?: string; // 抽屉标题
  newBtnTitle?: string;
  proTableProps: ProTableProps<any, any>; // proTable的属性
  FromProps?: ProFormProps; // DrawerForm的属性
} & DrawerForm;
