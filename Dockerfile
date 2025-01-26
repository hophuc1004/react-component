FROM node:18-alpine as builder

WORKDIR /app

COPY .yarn .yarn
COPY package.json yarn.lock .yarnrc.yml ./

RUN yarn

COPY . .

RUN yarn build

FROM nginx:alpine

WORKDIR /usr/app

COPY --from=builder /app/dist/ .
COPY --from=builder /app/package.json .

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 443

ENTRYPOINT ["nginx", "-g", "daemon off;"]