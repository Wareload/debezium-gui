FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENV SKIP_ENV_VALIDATION=true
RUN npm run build
ENV SKIP_ENV_VALIDATION=""
CMD npm run start