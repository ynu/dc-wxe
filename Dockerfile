FROM node:8.6.0-alpine

# RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN apk --no-cache add tzdata  && \
    ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone

# Set a working directory
WORKDIR /usr/src/app

ADD package.json .
ADD LICENSE.txt .
ADD yarn.lock .
ADD src ./src
ADD public ./public
ADD tools ./tools

RUN yarn
RUN ./node_modules/.bin/babel-node tools/run build --release

# RUN rm -rf node_modules

WORKDIR /usr/src/app/build

# Install Node.js dependencies
RUN yarn install --production --no-progress

EXPOSE 3000

CMD node server.js
