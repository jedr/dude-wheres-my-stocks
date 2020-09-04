FROM node:14.9.0-alpine
WORKDIR /app
COPY package.json yarn.lock ./
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
RUN yarn --frozen-lockfile
COPY . ./
USER node
CMD ["npm", "start"]
