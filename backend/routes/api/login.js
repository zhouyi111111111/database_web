const express = require('express');
const router = express.Router();
const buyerModel = require('../../models/buyer');
const agentModel = require('../../models/agent');


router.post('/', function(req, res) {
  const { username, password, role } = req.body;
  let userModel;

  // 根据登录用户的角色选择不同的模型
  if (role === 'buyer') {
    userModel = buyerModel;
  } else if (role === 'agent') {
    userModel = agentModel;
  } else {
    return res.status(400).send('Invalid role');
  }

  // 通过模型查询用户
  userModel.findOne(username, password).then(function(result) {
    if (result.length == 0) {
      return res.status(401).json({ error: '用户名或密码错误' });
    }
    console.log(result)
    return res.status(200).json({ message: '登陆成功' });
  }).catch(err => {
    return res.status(500).json({ error: '服务器出错' });
  });
});

module.exports = router;

