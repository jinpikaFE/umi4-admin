export default {
  'POST /api/login': (req: any, res: any) => {
    res.json({
      code: 200,
      message: '登录成功',
      data: {
        userId: 2,
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOjIsImlhdCI6MTY1OTQzMzM1MSwiZXhwIjoxNjU5NTE5NzUxfQ.1LEalubAtZwQHsz2wnWWRTvArbZJwYuBYfcp20gHc84',
      },
    });
  },
};
