FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV SKIP_ENV_VALIDATION=true
RUN npm run build
ENV SKIP_ENV_VALIDATION=""
EXPOSE 3000
CMD npm run start