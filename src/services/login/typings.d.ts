declare namespace Login {
  type LoginEntity = {
    username: string;
    password: string;
    loginType: string;
  };

  type Result_Login = Global.Result<{
    token?: string;
    role: string;
    userName: string;
  }>;
}
