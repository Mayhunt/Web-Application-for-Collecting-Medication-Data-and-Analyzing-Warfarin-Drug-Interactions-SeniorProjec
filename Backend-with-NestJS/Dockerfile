FROM node:16-alpine3.12 AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine3.12 as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --prod
COPY --from=build /usr/src/app/dist ./dist
CMD ["node", "dist/main"]