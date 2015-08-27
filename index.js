/**
POST测试代码
POST http://localhost:8888
Content-type: application/x-www-form-urlencoded
POST_BODY:
variable1=avalue&variable2=1234&variable3=anothervalue
*/

// var app = require('express')();
// var task = require('queue-async')();
// var cp = require('child_process');

// app.post('*', function(res, req){
// 	res.send(202);
// 	task.defer(function(req, res){
// 			var eType = req.headers["x-github-event"];
// 			var body = req.body;
// 			var branch = body.ref.split('/')[2];
// 			var name = body.repository.name;
// 			var actions = (listener[name] && listener[name][eType] && listener[name][eType][branch]);
// 			if (typeof actions === 'undefined'){
// 				console.log('INFO: ' + name + ':' + branch + ' got a ' + eType + ' trigger but no action fount.');
// 				return;
// 			}
// 			for (var i in actions){
// 					console.log('INFO: ' + name + ':' + branch + ' triggered script ' + actions[i]);
// 					var dirname = path.dirname(path.resolve(actions[i]));
// 					cp.execFile(actions[i],[dirname],{}, _runCMDcb);
// 			}
// 	}, req, res).await();
// });

var http = require('http');
var createHandler = require('github-webhook-handler');
var handler = createHandler({ path: '/incoming', secret: 'myHashSecret' });
http.createServer(function(req, res){
  handler(req, res, function (err) {
    res.statusCode = 404;
    res.end('no such location');
  })
}).listen(8080);

function run_cmd(cmd, args, callback) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var resp = "";
  child.stdout.on('data', function(buffer) { resp += buffer.toString(); });
  child.stdout.on('end', function() { callback (resp) });
}

handler.on('push', function(event){
	console.log('Received a push event for %s to %s',event.payload.repository.name,event.payload.ref);
	run_cmd('sh', ['./deploy-dev.sh'], function(text){ console.log(text) });
})