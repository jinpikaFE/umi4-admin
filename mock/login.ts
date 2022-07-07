export default {
  'POST /api/login': (req: any, res: any) => {
    res.json({
      code: 200,
      message: '管理员登录成功',
      data: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiX2lkIjowLCJpYXQiOjE2NTcwMDk5MjksImV4cCI6MTY1NzAyNzkyOX0.te_hg9JeCiNIBF5yThNjI8LjX_tYKx5MbOGMatlF6E0',
        role: 'admin',
        userName: 'admin',
      },
    });
  },
};
