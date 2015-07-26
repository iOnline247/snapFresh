# Data visualization for AllIncomeFood's snapfresh

## Instructions

### To get running (non-docker):
--1. npm install
--2. gulp css
--3. gulp concatSourceJS
--4. gulp concatBuildJS
--5. gulp

### To get running (with docker):
--1. docker build -t <your username>/snapfresh .
--2. docker run -p 49160:8080 -d <your username>/snapfresh

__Note: See gulp-connect option "root" to see where content its being served from__

Node project using Gulp streaming build system
To be containerized with docker soon

using Node verison 0.10.38
suggested to use nvm to control multiple node versions
https://github.com/creationix/nvm

sources for development
[gulp tut](https://travismaynard.com/writing/getting-started-with-gulp)
[npm tutorial](http://nodeschool.io/#workshoppers)
[docker tut](http://docs.docker.com/mac/started/)
[gitignore samples](https://github.com/github/gitignore)
[gulp-connect doc](https://www.npmjs.com/package/gulp-connect)
[nvm in docker](http://stackoverflow.com/questions/25899912/install-nvm-in-dockerhello)
[how to use dockerfiles](https://www.digitalocean.com/community/tutorials/docker-explained-using-dockerfiles-to-automate-building-of-images)
[docker with nodejs](https://docs.docker.com/examples/nodejs_web_app/)
