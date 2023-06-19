import { ResPage, stock } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 用户管理模块
 */
// 获取用户列表
export const getstockList = (params: stock.ReqstockParams) => {
  return http.post<ResPage<stock.ResstockList>>(PORT1 + `/stock/list`, params);
};

// 获取树形用户列表
export const getstockTreeList = (params: stock.ReqstockParams) => {
  return http.post<ResPage<stock.ResstockList>>(PORT1 + `/stock/tree/list`, params);
};

// 新增用户
export const addstock = (params: { id: string }) => {
  return http.post(PORT1 + `/stock/add`, params);
};

// 批量添加用户
export const BatchAddstock = (params: FormData) => {
  return http.post(PORT1 + `/stock/import`, params);
};

// 编辑用户
export const editstock = (params: { id: string }) => {
  return http.post(PORT1 + `/stock/edit`, params);
};

// 删除用户
export const deletestock = (params: { id: string[] }) => {
  return http.post(PORT1 + `/stock/delete`, params);
};

// 切换用户状态
export const changestockStatus = (params: { id: string; status: number }) => {
  return http.post(PORT1 + `/stock/change`, params);
};

// 导出用户数据
export const exportstockInfo = (params: stock.ReqstockParams) => {
  return http.download(PORT1 + `/stock/export`, params);
};

// 获取用户状态字典
export const getstockStatus = () => {
  return http.get<stock.ResStatus[]>(PORT1 + `/stock/status`);
};
