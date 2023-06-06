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
  // 请求参数对象
  export interface ReqUserParams extends ReqPage {
    username: string;
    gender: number;
    idCard: string;
    email: string;
    address: string;
    createTime: string[];
    status: number;
  }
  // 用户列表 响应
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
  // 用户状态
  export interface ResStatus {
    userLabel: string;
    userValue: number;
  }
  // 用户性别
  export interface ResGender {
    genderLabel: string;
    genderValue: number;
  }
  // 用户部门
  export interface ResDepartment {
    id: string;
    name: string;
    children?: ResDepartment[];
  }
  // 用户角色
  export interface ResRole {
    id: string;
    name: string;
    children?: ResDepartment[];
  }
}

// 房产管理模块
export namespace Estate {
  // 请求参数对象
  export interface ReqEstateParams extends ReqPage {
    id: string;
    estatename: string;
    lug: string;
    lat: string;
    prvin: string;
    city: string;
    munici: string;
    community: string;
    date: string;
    price: string;
    avgprice: string;
    listedprice: string;
    arch: string; // 户型
    floor: string;
    farea: string;
    duplex: string; // 复式
    towards: string;
    ages: string;
    heating: string;
    rate: string;
    right: string;
    elevator: string;
    range: string;
    change: string;
    visitor: string;
  }
  // 房产列表 响应
  export interface ResEstateList {
    id: string;
    estatename: string;
    lug: string;
    lat: string;
    prvin: string;
    city: string;
    munici: string;
    community: string;
    date: string;
    price: string;
    avgprice: string;
    listedprice: string;
    arch: string; // 户型
    floor: string;
    farea: string;
    duplex: string; // 复式
    towards: string;
    ages: string;
    heating: string;
    rate: string;
    right: string;
    elevator: string;
    range: string;
    change: string;
    visitor: string;
  }
  // 用户状态
  export interface ResStatus {
    userLabel: string;
    userValue: number;
  }
  // 用户性别
  export interface ResGender {
    genderLabel: string;
    genderValue: number;
  }
  // 用户部门
  export interface ResDepartment {
    id: string;
    name: string;
    children?: ResDepartment[];
  }
  // 用户角色
  export interface ResRole {
    id: string;
    name: string;
    children?: ResDepartment[];
  }
}