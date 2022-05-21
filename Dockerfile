# syntax=docker/dockerfile:1
FROM node:14-alpine
ENV NODE_ENV production

WORKDIR /app

RUN apk update
RUN apk add curl

COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci --only=production
RUN npx prisma generate

COPY . .

USER node

CMD ["npm", "start"]
