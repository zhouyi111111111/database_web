// 请求响应参数（不包含data）
export interface Result {
  code: string;
  msg: string;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
  data: T;
}

// 分页响应参数
export interface ResPage<T> {
  list: T[];
  pageNum: number;
  pageSize: number;
  total: number;
}

// 分页请求参数
export interface ReqPage {
  pageNum: number;
  pageSize: number;
}

// 文件上传模块
export namespace Upload {
  export interface ResFileUrl {
    fileUrl: string;
  }
}

// 登录模块
export namespace Login {
  export interface ReqLoginForm {
    username: string;
    password: string;
  }
  export interface ResLogin {
    access_token: string;
  }
  export interface ResAuthButtons {
    [key: string]: string[];
  }
}

// 用户管理模块
export namespace User {
  export interface ReqUserParams extends ReqPage {
    username: string;
    gender: number;
    idCard: string;
    email: string;
    address: string;
    createTime: string[];
    status: number;
  }
  export interface ResUserList {
    id: string;
    username: string;
    gender: number;
    user: { detail: { age: number } };
    idCard: string;
    email: string;
    address: string;
    createTime: string;
    status: number;
    avatar: string;
    photo: any[];
    children?: ResUserList[];
  }
  export interface ResStatus {
    userLabel: string;
    userValue: number;
  }
  export interface ResGender {
    genderLabel: string;
    genderValue: number;
  }
  export interface ResDepartment {
    id: string;
    name: string;
    children?: ResDepartment[];
  }
  export interface ResRole {
    id: string;
    name: string;
    children?: ResDepartment[];
  }
}

// 股票管理模块
export namespace stock {
  // 请求参数对象
  export interface ReqstockParams extends ReqPage {
    ts_code: string;
    trade_date: string;
    open: string;
    high: string;
    low: string;
    close: string;
    pre_close: string;
    change: string;
    pct_chg: string;
    vol: string;
    amount: string;
  }
  // 股票列表 响应
  export interface ResstockList {
    ts_code: string;
    trade_date: string;
    open: string;
    high: string;
    low: string;
    close: string;
    pre_close: string;
    change: string;
    pct_chg: string;
    vol: string;
    amount: string;
  }
  // 用户状态
  export interface ResStatus {
    userLabel: string;
    userValue: number;
  }
}

// 城区固定兴趣点模块
export namespace Point {
  // 请求参数对象
  export interface ReqPointParams extends ReqPage {
    name: string;
    lng: string;
    lat: string;
    address: string;
    category: string;
  }
  // 兴趣点列表 响应
  export interface ResPointList {
    name: string;
    lng: string;
    lat: string;
    address: string;
    category: string;
  }
}
