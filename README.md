# Data visualization for AllIncomeFood's snapfresh

## Instructions

### To get running (non-docker):
  1. ```npm install```
  2. ```gulp css```
  3. ```gulp concatSourceJS```
  4. ```gulp concatBuildJS```
  5. ```gulp```

### To get running (with docker):
  1. ```docker build -t [your username]/snapfresh .```
  2. ```docker run -p 49160:8080 -d [your username]/snapfresh```

__Note: See ```gulp-connect``` option "root" to see where content its being served from__

Using Node verison 0.10.40
suggested to use nvm to control multiple node versions
https://github.com/creationix/nvm

## Sources for development
* [Gulp tut](https://travismaynard.com/writing/getting-started-with-gulp)
* [Npm tutorial](http://nodeschool.io/#workshoppers)
* [Docker tut](http://docs.docker.com/mac/started/)
* [Gitignore samples](https://github.com/github/gitignore)
* [Gulp-connect doc](https://www.npmjs.com/package/gulp-connect)
* [Nvm in docker](http://stackoverflow.com/questions/25899912/install-nvm-in-dockerhello)
* [How to use dockerfiles](https://www.digitalocean.com/community/tutorials/docker-explained-using-dockerfiles-to-automate-building-of-images)
* [Docker with nodejs](https://docs.docker.com/examples/nodejs_web_app/)
