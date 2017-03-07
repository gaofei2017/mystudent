/******************服务器搭建开始********************************/
// 获取http模块
const http = require('http');
// 创建http服务实例
const server = http.createServer();
// 监听3000端口
server.listen(3000);
/******************服务器搭建完毕********************************/
/******************加载系统、文件、第三方模块*********************/
//加载url系统模块 url.parse()解析路径
const url = require('url');
//加载第三方模块 模板引擎art-template
const template = require('art-template');
// 加载文件操作系统模块             fs.readFile(pathname,(err,file),callback):读取相应文件(内容)
const fs = require('fs');
// 加载路径操作系统模块             path.join(path1,path2):将路径进行解析(拼接)成/index/add/的形式
const path = require('path');
// 加载第三方模块 mime文件类型解析  mime.loookup(pathname):将路径名解析成文件类型的形式
const mime = require('mime');
// 加载querystring系统模块        querystring.parse(string):将一个字符串解析成对象
const querystring = require('querystring');
// 加载文件模块students
const students = require('./database/students');
/******************处理请求和响应********************************/
// 注册响应事件，监听请求,处理逻辑
server.on('request',(req,res) =>{
  // 响应头 响应状态码200表示响应成功 响应内容类型 .html文件
  // res.writeHeader(200,{'Content-Type':'text/html;charset=utf8'});
  // 以变量解构赋值的形式为pathname和query赋值
  let {pathname,query} = url.parse(req.url,true);
  // 当我的网址为：http://localhost:3000/index?username=litao&password=123
  // console.log(req.url);//请求url /index
  // console.log(url.parse(req.url));//解析url 解析后是以键值对存在形式的对象 值都为字符串
  // console.log(url.parse(req.url,true));//解析后query对应的值为一个对象
  // console.log(pathname);//路径名      /index
  // console.log(query);//请求参数 query: { username: 'litao', password: '123' }
  // 响应体 将服务器返回到客户端的字符串数据渲染到页面
  // 配置模板 让模板知道去哪找我的模板文件
  template.config('base',path.join(__dirname,'views'));
  // console.log(__dirname);//当前程序所在的绝对路径
  // console.log(__filename);//当前程序所在目录
  // 封装模板函数(拼凑模板)
  res.render = function(tpl,data) {
    // 使用模板引擎将html输出
    let html = template(tpl,data);//tpl:模板,也就是你要渲染的html文件  data:后台返回到客户端的数据
    res.writeHeader(200,{'Content-Type':'text/html'});//响应头
    res.end(html);//将字符串渲染到页面呈现出相应的html页面
  }
  // 设计路由 路由与程序有映射关系  根据响应路由找到对应程序   get请求：请求内容在url地址后
  switch(pathname){
    case '/':
    case '/add':
    /***************响应add.html页面****************/
    // 调用模板函数
    // res.end('/add.html');
    // res.render('./views/add',{});//没有静态资源
       res.render('add',{action:'/save'});
    break;
    /***************查看所有学员信息 响应list.html页面****************/
    case '/list':
    // res.end('/list.html');
    // res.render('./views/list',{});
       res.render('list',{lists:students});
    break;
    /***************新增学员信息 响应save.html页面****************/
    case '/save':
    // res.end('/save.html');
    // post请求 伴随请求主体发送 客户端一快快发送  服务器陆陆续续的接收
    req.body = '';//把请求内容放到body请求体中
    // 注册数据传输响应事件‘
    req.on('data',(chunk) =>{
      req.body += chunk;
    });

    // 注册数据传输完成事件
    req.on('end',() => {

      //将post提交的字符串数据解析成对象
      let formData = querystring.parse(req.body);
      console.log(formData);
      // students是一个文件模块students.json文件 返回的是一个空数组
      students.push(formData);//将对象数据追加到数组students中
      // 以写的模式打开students.json文件
      fs.open('./database/students.json','w', (err,fd) =>{
        //fd:文件描述符
        //err:服务器内部错误
        if(err){
          return res.end('服务器内部错误！');
        }
        // 将数据保存到文件中 写入数据 响应到客户端 渲染到页面
        fs.write(fd,JSON.stringify(students));//JSON.stringify([]/obj):将一个对象或数据解析成字符串
        // 跳转页面 重定向
        res.writeHeader(302,{
          Location:'/list'
        });
        res.end('表单数据提交成功');
      })
    })
    // req.on('end')
    break;
    /**** 取出编辑的数据  跳转回到add.html页面 ****/
    case '/edit':
    // query.key是get传的参数(索引值) query是get的参数 在query上定义一个自定义属性key存放索引
    // 根据索引到数组students中取数据
    let sts = students[query.key];//取出的数据是学院信息，是一个对象
    // 在sts对象上添加属性
    sts.action = '/update?key='+query.key;
    // 渲染模板
    res.render('add',sts);
    break;
    /**** 更新编辑内容 ****/
    case '/update':
    req.body ='';
    req.on('data',(chunk) =>{
      req.body += chunk;
    });
    req.on('end',()=>{
      let formData = querystring.parse(req.body);
      //到原数组中找到原数据并替换更新
      students.splice(query.key,1,formData);
      fs.open('./database/students.json','w',(err,fd) =>{
        if (err) {
          return res.end('内部错误！');
        }
        fs.write(fd,JSON.stringify(students));
        res.writeHeader(302,{
          Location:'/list'
        });
        res.end();
      })
    })
    break;
    /**** 删除 ****/
    case '/del':
    // 根据索引值将数据从数组删除
    students.splice(query.key, 1);

    fs.open('./database/students.json', 'w', (err, fd) => {
      if(err) {
        return res.end('内部错误');
      }

      fs.write(fd, JSON.stringify(students));

      res.writeHeader(302, {
        Location: '/list'
      });

      res.end();
    });

    break;
    // res.end('成功！');

    default:
      /***************响应静态资源(图片,css,js)****************/
      fs.readFile(path.join('public',pathname),(err,file) => {//file:操作的当前文件
        if (err) {//没有找到相应文件，读取失败
          return res.end('NOT FOUND!');
        }
        res.writeHeader(200,{'Content-Type':mime.lookup(pathname)});//响应头
        res.end(file);//响应完成
      })
  }
})







/******************请求响应处理完毕********************************/
