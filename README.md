# Github autoDeployment
Github Deployment Automation

Github为每个仓库(repository)都可以设置一个或多个自己专属的钩子，且每个钩子都可以设置独立的触发事件(Events)

 - push	    仓库有push时触发(默认事件)
 - create	当有分支或标签被创建时触发
 - delete	当有分支或标签被删除时触发

这里罗列webhooks的设置

 - Payloads URL：当事件被触发时，GitHub会将POST请求发送至改地址。
 - Content type：数据格式。
 - Secret： 用作给POST的body加密的字符串。采用HMAC算法。 HMAC hex digest of the body, using the secret as the key

当有push代码的时候，Github会POST一个请求到设置的服务器地址(Payloads URL)

服务器通过监测POST，校验参数，就可以执行shell脚本进行git pull更新代码

		#!/bin/bash

		PATH='./'
		USER='root'
		USERGROUP='root'

		echo "Start autoDeployment"
		cd $PATH
		echo "pulling source code..."
		git reset --hard origin/master
		git clean -f
		git pull
		git checkout master
		echo "changing permissions..."
		chown -R $USER:$USERGROUP $PATH
		echo "Finished."

 - 服务器代码修改之后，需要重新启动，这部分尚未完成......