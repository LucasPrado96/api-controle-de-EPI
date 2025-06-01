FROM node:18

WORKDIR /app

COPY package.json ./
RUN yarn install && yarn global add nodemon

# COPY . .

EXPOSE 3001

CMD ["yarn", "dev"]