FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev


COPY . .

EXPOSE 3000
EXPOSE 5500

CMD ["sh", "-c", "node server.js & node app.js"]