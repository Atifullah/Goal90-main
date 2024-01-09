#!/bin/bash
ps -ef|grep /data/webinfo/web/node_modules/ | grep -v grep | awk '{print $2}' | xargs sudo kill -9
npm start


 