/** 
    Document   : autoDeployment
    Created on : 2015.9
    Author     : Kevin Zhong
    License    : MIT
    github     : https://github.com/willworks/autoDeployment/ 
    Description: Github webhook 实现检测push事件，生产环境自动部属
    Copyright (c) 2015 Kevin Zhong
*/
var express = require('express');
	app = express();

function run_cmd(cmd, args, callback) {
	var spawn = require('child_process').spawn;
	var child = spawn(cmd, args);
	var resp = "";
	// 输出信息
	child.stdout.on('data', function(buffer) { resp += buffer.toString(); });
	child.stdout.on('end', function() { callback (resp);});
}

// 触发push事件的时候，可以发起一个POST请求
// 处理github POST请求
app.post('/', function(req, res){
	// 头部识别，做为安全的一小步
	// 若去掉，当当发起一个POST就能引起shell执行，可以引发安全问题
	if(req.headers["x-github-event"]=='push'){
		run_cmd('sh', ['deploy.sh'], function(text){console.log(text);});
	}
	res.send('done!');
});

app.listen(4000, function(){
	console.log('listening on *:4000');
});
