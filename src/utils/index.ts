import moment from 'moment';

const getBase64 = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const exportExecl = (data: any) => {
  const blob = new Blob([data], {
    type: 'application/vnd.ms-excel',
  }); // for .xlsx files

  // 通过URL.createObjectURL生成文件路径
  const url = window.URL.createObjectURL(blob);

  // 创建a标签
  const ele = document.createElement('a');
  ele.style.display = 'none';

  // 设置href属性为文件路径，download属性可以设置文件名称
  ele.href = url;
  ele.download = moment().format('YYYY-MM-DD HH:mm:ss') + '导出的列表数据.xlsx';
  // const fileName = decodeURI(
  //   data.headers['content-disposition'].split(';')[1].split('filename=')[1],
  // );
  // ele.setAttribute('download', fileName);
  // 将a标签添加到页面并模拟点击
  document.querySelectorAll('body')[0].appendChild(ele);
  ele.click();

  // 移除a标签
  ele.remove();
};

/**
 *
 * 实现树级递归，生成树形菜单
 * toTree(
    {msg.data,
    '_id',
    'lastMenu',
    (item) => item,}
  )
 * @param {any[]} data 要转换的数组
 * @param {string} key 标识字段
 * @param {string} parentKey 父级字段
 * @param {Function} cb 对item处理的回调函数 (item) => item
 * @param {string} children 子数组字段
 * @param {string} type 基本用于菜单的筛选，菜单与组件用同一个接口，可以前端筛选出菜单也可以后端做,
 * 非菜单节点的子节点请不要设置菜单节点，一般也没有改业务
 * @returns
 */
const toTree = ({
  data,
  key,
  parentKey,
  cb,
  children = 'children',
  type,
}: {
  data: any[];
  key: string;
  parentKey: string;
  cb: (param: any) => any;
  children?: string;
  type?: string;
}) => {
  // 删除 所有 children,以防止多次调用
  data.forEach(function (item) {
    delete item.children;
  });

  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  const map: any = {};
  data.forEach(function (item) {
    map[item?.[key]] = item;
  });
  //        console.log(map);
  const val: any[] = [];
  data.forEach(function (item) {
    // 以当前遍历项，的pid,去map对象中找到索引的id
    const parent = map?.[item?.[parentKey]];
    const newItem = cb(item);
    const getNewVal = () => {
      // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
      if (parent) {
        (parent?.[children] || (parent[children] = [])).push(newItem);
      } else {
        //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
        val.push(newItem);
      }
    };
    if (type) {
      if (item?.type === type) {
        getNewVal();
      }
    } else {
      getNewVal();
    }
  });
  return val;
};

/**
 * 通用脱敏方法
 * @param str 要脱敏对的字符
 * @param beginLen 前面保留数
 * @param endLen 末尾保留数
 * @returns
 */
const desensitization = (str: string = '', beginLen: number, endLen: number) => {
  if (!str && beginLen + endLen >= str?.length) {
    return '';
  }

  const leftStr = str.substring(0, beginLen);
  const rightStr = str.substring(str.length - endLen, str.length);

  let strCon = '';
  for (let i = 0; i < str.length - endLen - beginLen; i++) {
    strCon += '*';
  }
  return leftStr + strCon + rightStr;
};

export { getBase64, exportExecl, toTree, desensitization };
