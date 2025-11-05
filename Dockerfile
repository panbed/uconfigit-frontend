FROM node:slim AS builder

WORKDIR /app

ADD package*.json ./
RUN npm install

COPY . .

RUN npx vite build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY build/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]