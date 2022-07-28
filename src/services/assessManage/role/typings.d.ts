declare namespace Role {
  type RoleEntity = {
    id?: string | number;
    authority: string;
    name: string;
    is_super: boolean;
    compon: Compon.ComponEntity;
  };
}
