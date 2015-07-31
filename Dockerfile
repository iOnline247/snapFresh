FROM 	ubuntu:14.04

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update && apt-get install -y \
	curl

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 0.10.40

# Install nvm with node and npm
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.20.0/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default


ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/v$NODE_VERSION/bin:$PATH

ADD . /src_app
# Install app deps
RUN  cd /src_app 

WORKDIR /src_app
RUN  npm install
RUN  npm install -g gulp

EXPOSE 8080
# run application
#CMD ["mkdir -p ./src/node/express/json"]
#CMD ["mv src_app/cronjob/json/lat-long.json ./src/node/express/json/"]
RUN gulp css
RUN gulp concatSourceJS
RUN gulp concatBuildJS
CMD ["gulp"]
