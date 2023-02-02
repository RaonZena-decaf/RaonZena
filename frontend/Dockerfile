# 이미지를 사용합니다. 뒤에 tag가 없으면 latest 를 사용.
FROM node:18

# root 에 app 폴더를 생성
RUN mkdir -p /app

# work dir 고정
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]