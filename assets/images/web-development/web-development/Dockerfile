FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install -g npm@6.14.13
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build
ENV HOST 0.0.0.0
EXPOSE 3000
CMD [ "npm", "start" ]


#docker build -t online_web_app .
#docker run -d --name online_web -p 9087:3000 online_web_app

