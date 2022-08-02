const users = [
  { name: 'Umi', nickName: 'U', gender: 'MALE' },
  { name: 'Fish', nickName: 'B', gender: 'FEMALE' },
];

export default {
  'GET /api/users/2': (req: any, res: any) => {
    res.json({
      code: 200,
      message: '查询成功',
      data: {
        id: 2,
        username: 'admin',
        email: 'admin@qq.com',
        phone: '14770998033',
        avatar: 'http://dummyimage.com/100x100',
        createTime: '2022-07-27T02:46:59.759Z',
        updateTime: '2022-07-27T02:46:59.759Z',
        role: [
          {
            id: 14,
            name: '超级管理员',
            desc: '超级管理员',
            is_super: true,
            createTime: '2022-07-27T02:44:55.015Z',
            updateTime: '2022-07-27T02:45:23.940Z',
            compon: [],
          },
        ],
      },
    });
  },
  'GET /api/v1/queryUserList': (req: any, res: any) => {
    res.json({
      code: 200,
      message: '查询成功',
      data: { list: users },
    });
  },
  'PUT /api/v1/user/': (req: any, res: any) => {
    res.json({
      code: 200,
      message: '添加成功',
    });
  },
};
