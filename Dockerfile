FROM node:lts-alpine
WORKDIR /app
RUN npm install pm2 -g
ADD package.json package.json
RUN npm set unsafe-perm true
RUN apk add --no-cache --virtual .build-deps git \
 && npm install --production --silent \
 && apk del .build-deps
RUN cd ./node_modules/react-web-gifted-chat/ && npm install --silent && npm run compile
EXPOSE 3000
COPY .next ./.next
COPY public ./public
USER node
CMD [ "pm2-runtime", "start", "npm", "--", "start" ]
