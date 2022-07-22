declare namespace User {
  type UserEntity = {
    id?: string | number;
    avatar?: string;
    captcha?: string;
    email?: string;
    password?: string;
    phone?: string;
    role?: string | Role.RoleEntity;
    username?: string;
  };
}
