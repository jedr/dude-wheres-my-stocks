FROM node:12.16.1-alpine
WORKDIR /app
COPY package.json yarn.lock ./
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
RUN yarn --frozen-lockfile
COPY . ./
USER node
CMD ["node", "./src/index.js"]