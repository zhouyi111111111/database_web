const pool = require('./db');

// 根据用户名和密码查找购房用户信息
function findOne(uname, pwd) {
  //console.log(uname, pwd)
  return pool.query('select * from buyers where name=? and password=?', [uname, pwd]).then(res => {
    return res[0]  
  }).catch(err => {
    console.log(err)
    throw err
  });
}

// 暴露查询用户信息函数
module.exports = {
  findOne
};