import { toTree } from '@/utils';
import { Select, SelectProps, Tree, TreeProps } from 'antd';
import React, { FC, useState } from 'react';

export type TreeSelectJPKProps = {
  treeData: any;
  /** select属性 */
  selectProps?: SelectProps;
  /** tree属性 */
  treeProps?: TreeProps;
  /** key对应属性名 */
  keyPropName?: string;
  /** title 对应属性名 */
  titlePropName?: string;
  /** 使用简单格式的 treeData，具体设置参考可设置的类型 (此时 treeData 应变为这样的数据结构: [{id:1, pId:0, value:'1', title:"test1",...},...]， pId 是父节点的 id) */
  treeDataSimpleMode?: boolean;
  /** simpleMode模式下 id(即为key) pId title 属性名 {id:1, pId:0, title:"test1"} */
  simpleModePropName?: { id?: string; pId?: string; title?: string };
  /** formItemValue */
  value?: string[][];
  /** formItem 隐式传入的onchange */
  onChange: (value: any) => any;
};

const TreeSelectJPK: FC<TreeSelectJPKProps> = (props) => {
  const {
    selectProps,
    treeProps,
    treeData,
    keyPropName,
    titlePropName,
    treeDataSimpleMode,
    simpleModePropName,
    value,
    onChange,
  } = props;
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(value?.[0] || []);

  const onCheck = (checked: React.Key[], e: any) => {
    console.log(checked, e.halfCheckedKeys);
    setCheckedKeys(checked);
    onChange([checked, e.halfCheckedKeys]);
  };

  /** 对treeData进行加工 */
  const getTreeData = (trData: Record<string, any>[]) => {
    return trData?.map((item) => {
      const obj: any = {
        key: item?.[keyPropName || 'key'],
        title: item?.[titlePropName || 'title'],
      };
      if (item?.children) {
        obj.children = getTreeData(item?.children);
      }
      return obj;
    });
  };
  const returnTreeData = () => {
    if (treeDataSimpleMode) {
      return toTree({
        data: JSON.parse(JSON.stringify(treeData)),
        key: simpleModePropName?.id || 'id',
        parentKey: simpleModePropName?.pId || 'pId',
        cb: (item: any) => {
          item.title = item?.[simpleModePropName?.title || 'title'];
          item.key = item?.[simpleModePropName?.id || 'id'];
          return item;
        },
      });
    }
    return keyPropName || titlePropName ? getTreeData(treeData) : treeData;
  };

  return (
    <Select
      mode="multiple"
      value={checkedKeys}
      onClear={() => {
        setCheckedKeys([]);
      }}
      allowClear
      {...selectProps}
      dropdownRender={() => (
        <Tree
          checkable
          defaultExpandAll={true}
          onCheck={onCheck as any}
          checkedKeys={checkedKeys}
          treeData={returnTreeData()}
          {...treeProps}
        />
      )}
    />
  );
};

export default TreeSelectJPK;
