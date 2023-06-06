import { ResPage, Estate } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 用户管理模块
 */
// 获取用户列表
export const getEstateList = (params: Estate.ReqEstateParams) => {
  return http.post<ResPage<Estate.ResEstateList>>(PORT1 + `/estate/list`, params);
};

// 获取树形用户列表
export const getEstateTreeList = (params: Estate.ReqEstateParams) => {
  return http.post<ResPage<Estate.ResEstateList>>(PORT1 + `/estate/tree/list`, params);
};

// 新增用户
export const addEstate = (params: { id: string }) => {
  return http.post(PORT1 + `/estate/add`, params);
};

// 批量添加用户
export const BatchAddEstate = (params: FormData) => {
  return http.post(PORT1 + `/estate/import`, params);
};

// 编辑用户
export const editEstate = (params: { id: string }) => {
  return http.post(PORT1 + `/estate/edit`, params);
};

// 删除用户
export const deleteEstate = (params: { id: string[] }) => {
  return http.post(PORT1 + `/estate/delete`, params);
};

// 切换用户状态
export const changeEstateStatus = (params: { id: string; status: number }) => {
  return http.post(PORT1 + `/estate/change`, params);
};

// 导出用户数据
export const exportEstateInfo = (params: Estate.ReqEstateParams) => {
  return http.download(PORT1 + `/estate/export`, params);
};

// 获取用户状态字典
export const getEstateStatus = () => {
  return http.get<Estate.ResStatus[]>(PORT1 + `/estate/status`);
};

// 获取用户部门列表
export const getEstateDepartment = () => {
  return http.get<Estate.ResDepartment[]>(PORT1 + `/estate/department`);
};

// 获取用户角色字典
export const getEstateRole = () => {
  return http.get<Estate.ResRole[]>(PORT1 + `/estate/role`);
};
