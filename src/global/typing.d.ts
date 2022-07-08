declare namespace Global {
  type pageParams = {
    pageSize?: number;
    current?: number;
  };

  type Result<T = any> = {
    code?: number;
    message?: string;
    data: T;
    total?: number;
  };
}
