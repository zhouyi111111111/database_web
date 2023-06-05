const express     = require('express');
const bodyParser  = require('body-parser');
const mysql       = require('mysql2/promise');
const app         = express();

//增加头部信息解决跨域问题
app.all('*', function (req, res, next){
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");//允许源访问，本利前端访问路径为“http://localhost:8080”
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("X-Powered-By", ' 3.2.1');
    next();
});

//使用bodyParse解释前端提交数据
app.use(bodyParser.urlencoded({extended:true})) ;
app.use(bodyParser.json());


// 路由
const loginRouter = require('./routes/api/login');
app.use('/api/login', loginRouter);



// 监听3000端口
var server=app.listen(3000);

console.log("服务器已运行");
console.log("监听网址为:http://127.0.0.1:3000/");




/*var ddb = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'xsr170314',
  database: 'housesearch',
  charset:'utf8'
});
ddb.query('select * from buyers').then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
});*/

// 处理根目录的get请求
/*app.get('/',function(req,res){
}) ;

// 处理/login请求
app.post('/login', function(req, res) {
  //获取登录名称和密码
  uname = req.body.name;
  pwd = req.body.pwd;
  role = req.body.role;

  res.status(200).send(
      "后台反馈信息：登录帐号："+uname+" | 登录密码："+pwd+ " | 登录角色："+role
    ) ;


  //查询数据库中是否有该用户
  mysql.query(`SELECT * FROM ${role}s WHERE name = '${uname}' AND password = '${pwd}'`, function(error, results, fields) {
    if (error) {
      res.send(error);
    } else if (results.length > 0) {
      // 将用户信息保存在session中
      req.session.user = {
        id: results[0].id,
        name: results[0].name,
        role: role
      };

      res.send(`登录成功，欢迎您，${uname}！`);
    } else {
      res.send('用户名或密码错误！');
    }
  });
});
*/