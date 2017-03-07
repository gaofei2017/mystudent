#基于nodejs的学员档案管理系统
##主要功能模块
###1.学员信息添加操作add
###2.学员信息查看操作list
###3.学员信息编辑修改操作edit
###4.学员信息删除操作del
##主要技术点
##一:路由
		路由与程序有映射关系  根据相应路由找到对应程序
##二:模块的使用
		
###1.如何获取所需模块 ----require(module)
		
###2.使用系统模块http搭建服务器
####1)http.createServer()方法的使用
####2)server.listen(3000)监听端口

###3.使用系统模块fs对文件进行操作
####1)fs.readFile(pathname,(err,file),callback):读取相应文件(内容)
####2)fs.open(file,'r/w/a',(err,fd),callback)打开文件 
	  r:读模式 w:写模式 a:追加模式
####3)fs.write(fd,string)  将字符串数据响应到客户端
	  JSON.stringify([]/obj):将一个对象或数据解析成字符串

###4.使用系统模块url   url.parse()解析路径
###5.使用路径path系统模块             
	 path.join(path1,path2):将路径进行解析(拼接)成/index/add/的形式
###6.querystring系统模块
	 querystring.parse(string):将一个字符串解析成对象
###7.文件模块
	  通过require()方法获取文件返回文件内容
###8.第三方模块 
####1)mime文件类型解析模块的使用
		mime.loookup(pathname):将路径名解析成文件类型的形式
####1)模板引擎art-template在nodejs与前端页面的配合使用
		1>nodejs中模板引擎的使用：template(tpl,data)拼凑模板
		2>模板引擎的配置template.config('base',path);
		3>前端页面中模板引擎的使用{{each list}}遍历对象
##三:ES6的使用
	__filename:当前程序所在目录
	__dirname:当前程序所在的绝对路径
##四:get与post请求
		get请求时发送的数据在url后边
		post请求时请求内容在请求体中