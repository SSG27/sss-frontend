FROM node:22

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

ENV API_URL = "backend.default.svc.cluster.local"

EXPOSE 3000

CMD ["npm", "start"]