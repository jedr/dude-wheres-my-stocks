FROM node:12.16.1-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY . ./
USER node
CMD ["node", "./src/index.js"]
