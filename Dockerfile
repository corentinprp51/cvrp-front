FROM node:lts-alpine

RUN npm i -g pnpm
RUN npm i -g http-server

WORKDIR /app

COPY package*.json ./

COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 8080
CMD ["http-server", "dist"]
