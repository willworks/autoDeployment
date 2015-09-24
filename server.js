var express = require('express');
var app = express();

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
	if(req.headers["x-github-event"]=='push'){
		run_cmd('sh', ['deploy.sh'], function(text){console.log(text);});
	}
	res.send('done!');
});

app.listen(4000, function(){
	console.log('listening on *:4000');
});
