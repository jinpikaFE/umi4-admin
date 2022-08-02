export default {
  'GET /api/users': (req: any, res: any) => {
    res.json({
      code: 200,
      message: '查询成功',
      data: [
        {
          id: 1,
          username: 'user',
          email: '8@qq.com',
          phone: '15757182982',
          avatar:
            'https://jinpika-1308276765.cos.ap-shanghai.myqcloud.com/file/2022-07-28/src=http___desk-fd.zol-img.com.cn_t_s960x600c5_g2_M00_00_0B_ChMlWl6yKqyILFoCACn-5rom2uIAAO4DgEODxAAKf7-298.jpg&refer=http___desk-fd.zol-img.com.png.png',
          createTime: '2022-07-27T01:28:34.837Z',
          updateTime: '2022-07-28T06:02:10.000Z',
          role: [
            {
              id: 13,
              name: '角色',
              desc: '角色',
              is_super: false,
              createTime: '2022-07-27T01:34:11.757Z',
              updateTime: '2022-07-28T02:47:14.000Z',
              compon: [
                {
                  name: '角色管理',
                },
              ],
            },
            {
              id: 15,
              name: '23',
              desc: '首页',
              is_super: false,
              createTime: '2022-07-28T06:00:21.450Z',
              updateTime: '2022-07-28T06:00:21.450Z',
              compon: [
                {
                  name: '首页',
                },
              ],
            },
          ],
        },
        {
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
      ],
      total: 2,
    });
  },
  'GET /api/roles': (req: any, res: any) => {
    res.json({
      code: 200,
      message: '查询成功',
      data: [
        {
          id: 13,
          name: '角色',
          desc: '角色',
          is_super: false,
          createTime: '2022-07-27T01:34:11.757Z',
          updateTime: '2022-07-28T02:47:14.000Z',
          compon: [
            {
              id: 10,
              name: '角色管理',
              type: 'menu',
              parentId: 8,
              createTime: '2022-07-29T10:00:25.367Z',
              updateTime: '2022-07-29T10:00:25.367Z',
            },
            {
              id: 11,
              name: '用户管理',
              type: 'menu',
              parentId: 8,
              createTime: '2022-07-29T10:00:34.554Z',
              updateTime: '2022-07-29T10:00:34.554Z',
            },
          ],
          half_compon: [
            {
              id: 8,
              name: '权限管理',
              type: 'menu',
              parentId: null,
              createTime: '2022-07-29T10:00:06.034Z',
              updateTime: '2022-07-29T10:00:06.034Z',
            },
          ],
        },
        {
          id: 14,
          name: '超级管理员',
          desc: '超级管理员',
          is_super: true,
          createTime: '2022-07-27T02:44:55.015Z',
          updateTime: '2022-07-27T02:45:23.940Z',
          compon: [],
          half_compon: [],
        },
        {
          id: 15,
          name: '23',
          desc: '首页',
          is_super: false,
          createTime: '2022-07-28T06:00:21.450Z',
          updateTime: '2022-07-28T06:00:21.450Z',
          compon: [
            {
              id: 7,
              name: '首页',
              type: 'menu',
              parentId: null,
              createTime: '2022-07-29T09:59:57.557Z',
              updateTime: '2022-07-29T09:59:57.557Z',
            },
          ],
          half_compon: [],
        },
        {
          id: 16,
          name: 'half-compon',
          desc: 'half-compon',
          is_super: false,
          createTime: '2022-08-01T03:18:02.285Z',
          updateTime: '2022-08-01T03:18:02.285Z',
          compon: [
            {
              id: 10,
              name: '角色管理',
              type: 'menu',
              parentId: 8,
              createTime: '2022-07-29T10:00:25.367Z',
              updateTime: '2022-07-29T10:00:25.367Z',
            },
          ],
          half_compon: [
            {
              id: 8,
              name: '权限管理',
              type: 'menu',
              parentId: null,
              createTime: '2022-07-29T10:00:06.034Z',
              updateTime: '2022-07-29T10:00:06.034Z',
            },
          ],
        },
      ],
      total: 4,
    });
  },
  'GET /api/compon': (req: any, res: any) => {
    res.json({
      code: 200,
      message: '查询成功',
      data: [
        {
          id: 9,
          name: '组件管理',
          type: 'menu',
          parentId: 8,
          createTime: '2022-07-29T10:00:15.948Z',
          updateTime: '2022-07-29T10:00:15.948Z',
          parent: {
            id: 8,
            name: '权限管理',
            type: 'menu',
            parentId: null,
            createTime: '2022-07-29T10:00:06.034Z',
            updateTime: '2022-07-29T10:00:06.034Z',
          },
        },
        {
          id: 10,
          name: '角色管理',
          type: 'menu',
          parentId: 8,
          createTime: '2022-07-29T10:00:25.367Z',
          updateTime: '2022-07-29T10:00:25.367Z',
          parent: {
            id: 8,
            name: '权限管理',
            type: 'menu',
            parentId: null,
            createTime: '2022-07-29T10:00:06.034Z',
            updateTime: '2022-07-29T10:00:06.034Z',
          },
        },
        {
          id: 11,
          name: '用户管理',
          type: 'menu',
          parentId: 8,
          createTime: '2022-07-29T10:00:34.554Z',
          updateTime: '2022-07-29T10:00:34.554Z',
          parent: {
            id: 8,
            name: '权限管理',
            type: 'menu',
            parentId: null,
            createTime: '2022-07-29T10:00:06.034Z',
            updateTime: '2022-07-29T10:00:06.034Z',
          },
        },
        {
          id: 7,
          name: '首页',
          type: 'menu',
          parentId: null,
          createTime: '2022-07-29T09:59:57.557Z',
          updateTime: '2022-07-29T09:59:57.557Z',
          parent: null,
        },
        {
          id: 8,
          name: '权限管理',
          type: 'menu',
          parentId: null,
          createTime: '2022-07-29T10:00:06.034Z',
          updateTime: '2022-07-29T10:00:06.034Z',
          parent: null,
        },
      ],
    });
  },
};
