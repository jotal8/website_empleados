FROM node:lts-alpine

RUN apk --no-cache add curl
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY ./ /app/
RUN npm install && npm run build

# start app
CMD ["npm", "run", "start"]