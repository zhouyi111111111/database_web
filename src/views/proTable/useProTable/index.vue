<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="房产成交记录"
      :columns="columns"
      :request-api="getTableList"
      :init-param="initParam"
      :data-callback="dataCallback"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader="scope">
        <el-button v-auth="'add'" type="primary" :icon="CirclePlus" @click="openDrawer('新增')"> 新增股票 </el-button>
        <el-button v-auth="'batchAdd'" type="primary" :icon="Upload" plain @click="batchAdd"> 批量添加股票 </el-button>
        <el-button v-auth="'export'" type="primary" :icon="Download" plain @click="downloadFile"> 导出股票数据 </el-button>
        <el-button type="primary" plain @click="toDetail"> To 子集详情页面 </el-button>
        <el-button type="danger" :icon="Delete" plain :disabled="!scope.isSelected" @click="batchDelete(scope.selectedListIds)">
          批量删除股票
        </el-button>
      </template>
      <!-- Expand -->
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <!-- usernameHeader -->
      <template #usernameHeader="scope">
        <el-button type="primary" @click="ElMessage.success('我是通过作用域插槽渲染的表头')">
          {{ scope.column.label }}
        </el-button>
      </template>
      <!-- createTime -->
      <template #createTime="scope">
        <el-button type="primary" link @click="ElMessage.success('我是通过作用域插槽渲染的内容')">
          {{ scope.row.createTime }}
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)"> 查看 </el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)"> 编辑 </el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)"> 删除 </el-button>
      </template>
    </ProTable>
    <UserDrawer ref="drawerRef" />
    <ImportExcel ref="dialogRef" />
  </div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { User } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import { useDownload } from "@/hooks/useDownload";

import { ElMessage, ElMessageBox } from "element-plus";
import ProTable from "@/components/ProTable/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import UserDrawer from "@/views/proTable/components/UserDrawer.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen, Download, Upload, View } from "@element-plus/icons-vue";
import { deleteUser, editUser, addUser, exportUserInfo, BatchAddUser } from "@/api/modules/user";
import { getstockList } from "@/api/modules/stock";

const router = useRouter();

// 跳转详情页
const toDetail = () => {
  router.push(`/proTable/useProTable/detail/${Math.random().toFixed(3)}?params=detail-page`);
};

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref<ProTableInstance>();

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({ type: 1 });

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total && pageNum && pageSize 这些字段，那么你可以在这里进行处理成这些字段
// 或者直接去 hooks/useTable.ts 文件中把字段改为你后端对应的就行
const dataCallback = (data: any) => {
  return {
    list: data.list,
    total: data.total,
    pageNum: data.pageNum,
    pageSize: data.pageSize
  };
};

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
const getTableList = (params: any) => {
  let newParams = JSON.parse(JSON.stringify(params));
  newParams.createTime && (newParams.startTime = newParams.createTime[0]);
  newParams.createTime && (newParams.endTime = newParams.createTime[1]);
  delete newParams.createTime;
  return getstockList(newParams);
};

// 页面按钮权限（按钮权限既可以使用 hooks，也可以直接使用 v-auth 指令，指令适合直接绑定在按钮上，hooks 适合根据按钮权限显示不同的内容）
//const { BUTTONS } = useAuthButtons();

// 自定义渲染表头（使用tsx语法）
//const headerRender = (scope: HeaderRenderScope<User.ResUserList>) => {
//return (
//<el-button type="primary" onClick={() => ElMessage.success("我是通过 tsx 语法渲染的表头")}>
//{scope.column.label}
//</el-button>
//);
//};

// 表格配置项
const columns: ColumnProps<User.ResUserList>[] = [
  { type: "selection", fixed: "left", width: 80 },
  { type: "index", label: "#", width: 80 },
  { type: "expand", label: "Expand", width: 100 },
  {
    prop: "ts_code",
    label: "股票代码",
    search: { el: "input" }
  },
  {
    prop: "trade_date",
    label: "日期",
    search: { el: "input" }
  },
  { prop: "open", label: "开盘价" },
  { prop: "high", label: "最高价" },
  { prop: "low", label: "最低价" },
  { prop: "close", label: "收盘价" },
  { prop: "pre_close", label: "预收盘价" },
  { prop: "change", label: "涨跌额" },
  { prop: "pct_chg", label: "涨跌幅" },
  { prop: "vol", label: "成交量" },
  { prop: "amount", label: "成交额" }
];

// 删除用户信息
const deleteAccount = async (params: User.ResUserList) => {
  await useHandleData(deleteUser, { id: [params.id] }, `删除【${params.username}】用户`);
  proTable.value?.getTableList();
};

// 批量删除用户信息
const batchDelete = async (id: string[]) => {
  await useHandleData(deleteUser, { id }, "删除所选用户信息");
  proTable.value?.clearSelection();
  proTable.value?.getTableList();
};

// 切换用户状态
//const changeStatus = async (row: User.ResUserList) => {
//await useHandleData(changeUserStatus, { id: row.id, status: row.status == 1 ? 0 : 1 }, `切换【${row.username}】用户状态`);
//proTable.value?.getTableList();
//};

// 导出用户列表
const downloadFile = async () => {
  ElMessageBox.confirm("确认导出用户数据?", "温馨提示", { type: "warning" }).then(() =>
    useDownload(exportUserInfo, "用户列表", proTable.value?.searchParam)
  );
};

// 批量添加用户
const dialogRef = ref<InstanceType<typeof ImportExcel> | null>(null);
const batchAdd = () => {
  const params = {
    title: "用户",
    tempApi: exportUserInfo,
    importApi: BatchAddUser,
    getTableList: proTable.value?.getTableList
  };
  dialogRef.value?.acceptParams(params);
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof UserDrawer> | null>(null);
const openDrawer = (title: string, row: Partial<User.ResUserList> = {}) => {
  const params = {
    title,
    isView: title === "查看",
    row: { ...row },
    api: title === "新增" ? addUser : title === "编辑" ? editUser : undefined,
    getTableList: proTable.value?.getTableList
  };
  drawerRef.value?.acceptParams(params);
};
</script>

