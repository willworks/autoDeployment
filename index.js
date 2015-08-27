var app = require('express')();
var task = require('queue-async')();
var cp = require('child_process');

app.post('*', function(res, req){
	res.send(202);
	task.defer(function(req, res){
			var eType = req.headers["x-github-event"];
			var body = req.body;
			var branch = body.ref.split('/')[2];
			var name = body.repository.name;
			var actions = (listener[name] && listener[name][eType] && listener[name][eType][branch]);
			if (typeof actions === 'undefined'){
				console.log('INFO: ' + name + ':' + branch + ' got a ' + eType + ' trigger but no action fount.');
				return;
			}
			for (var i in actions){
					console.log('INFO: ' + name + ':' + branch + ' triggered script ' + actions[i]);
					var dirname = path.dirname(path.resolve(actions[i]));
					cp.execFile(actions[i],[dirname],{}, _runCMDcb);
			}
	}, req, res).await();
});

POST http://localhost:8888
Content-type: application/x-www-form-urlencoded
POST_BODY:
variable1=avalue&variable2=1234&variable3=anothervalue