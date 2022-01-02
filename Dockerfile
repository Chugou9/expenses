FROM node:16.13.1 as build

RUN mkdir -p /app
WORKDIR /app
COPY ./package.json ./

RUN npm i
COPY . .
RUN npm start

FROM nginx:1.15.8-alpine

COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]