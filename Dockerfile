FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
EXPOSE 5500

CMD ["sh", "-c", "node server.js & node app.js"]