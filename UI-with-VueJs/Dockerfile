FROM node:lts-alpine AS builder
WORKDIR /usr/src/front-end
COPY package.json .
RUN yarn install
COPY . .
RUN ["yarn", "build"]

FROM nginx:1.14.2-alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /usr/src/front-end/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]