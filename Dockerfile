FROM node:11.4.0

RUN git clone https://github.com/Hiro-Nakamura/ab_service_file_processor.git app && cd app && npm install

WORKDIR /app

CMD ["node", "--inspect", "app.js"]
