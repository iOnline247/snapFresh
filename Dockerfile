FROM 	ubuntu:14.04

RUN apt-get update && apt-get install -y \
	curl

# perform nvm tasks
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash
RUN nvm install 0.10.40
RUN nvm alias default 0.10.40

ADD . /src_app
# Install app deps
RUN  cd /src_app 
RUN  npm install -g gulp
RUN  npm install

# build 
RUN  css
RUN  concatSourceJS 
RUN  concatBuildJS 

EXPOSE 8080
# run application
CMD ["cd ./src"]
CMD ["mkdir -p ./node/express/json"]
CMD ["mv src_app/cronjob/json/lat-long.json ./node/express/json"]
CMD ["cd src_app"]
CMD ["gulp"]
