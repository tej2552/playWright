FROM node:21

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

#this is to install the necessary dependencies for playwright to run properly in a docker container
#because many things related to browser will not work properly without these dependencies, 
#such as running headless browsers, taking screenshots, etc.
RUN npx playwright install --with-deps 

COPY . .

CMD ["npx", "playwright", "test", "tests/"]