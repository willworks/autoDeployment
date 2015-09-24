#!/bin/bash

# PATH='/srv/http/autoDeployment/'
PATH='/home/kevin/Desktop/test/'
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