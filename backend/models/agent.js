const pool = require('./db');

// 根据用户名和密码查找中介信息
function findOne(uname, pwd) {
  return pool.query('select * from agents where name=? and password=?', [uname, pwd]).then(res => {
    return res[0];
  }).catch(err => {
    console.log(err)
    throw err
  });
}

// 暴露查询中介信息函数
module.exports = {
  findOne
};
