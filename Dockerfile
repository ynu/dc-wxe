FROM node:8

# Set a working directory
WORKDIR /usr/src/app

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

COPY ./build/package.json .
COPY ./build/yarn.lock .

# Install Node.js dependencies
RUN yarn install --production --no-progress

# Copy application files
COPY ./build .

CMD node build/server.js
