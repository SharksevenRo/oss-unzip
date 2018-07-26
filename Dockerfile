FROM jrottenberg/ffmpeg

RUN apt-get update

RUN apt-get install curl -y

# install fork of gifsicle with better lossless gif support
ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 8.9.1

# 中科大nodejs源
RUN curl -SLO "http://ipv4.mirrors.ustc.edu.cn/node/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" \
    && tar -xvf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 \
    && rm "node-v$NODE_VERSION-linux-x64.tar.gz" \
    && ln -s /usr/local/bin/node /usr/local/bin/nodejs

ADD ./ /root/workspace

WORKDIR /root/workspace

RUN bash -c 'cd /root/workspace && npm install'

# RUN bash -c "npm install pm2 -g"

EXPOSE  9100

ENTRYPOINT node index.js && /bin/bash
