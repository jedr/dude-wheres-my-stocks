FROM node:16.9.1-alpine
WORKDIR /app
COPY package.json package-lock.json ./
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
RUN npm ci
COPY . ./
USER node
CMD ["npm", "start"]
