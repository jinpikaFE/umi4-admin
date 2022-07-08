declare namespace Compon {
  type ComponEntity = {
    id?: string | number;
    name: string;
    type: string;
    parentId?: string;
    parentName?: string;
  };
}
