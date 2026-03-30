FROM node:21

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

CMD ["npx", "playwright", "test", "tests/"]