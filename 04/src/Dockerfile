FROM node:latest
WORKDIR /app
COPY . /app

ENV REDIS_HOST redis
ENV REDIS_PORT 6379

EXPOSE 8080
CMD ["node", "index.js"]
