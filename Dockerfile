FROM node:8

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

# Set a working directory
WORKDIR /usr/src/app

ADD package.json .
ADD LICENSE.txt .
ADD src ./src
ADD public ./public
ADD tools ./tools

RUN npm install
RUN ./node_modules/.bin/babel-node tools/run build --release

# RUN rm -rf node_modules

WORKDIR /usr/src/app/build

# Install Node.js dependencies
RUN yarn install --production --no-progress

EXPOSE 3000

CMD node server.js
