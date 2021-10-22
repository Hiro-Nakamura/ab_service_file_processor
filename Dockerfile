##
## digiserve/ab-file-processor:develop
##
## This is our microservice for our AppBuilder Definitions.
##
## Docker Commands:
## ---------------
## $ docker build -t digiserve/ab-file-processor:develop .
## $ docker push digiserve/ab-file-processor:develop
##

FROM digiserve/service-cli:develop

RUN git clone --recursive https://github.com/digi-serve/ab_service_file_processor.git app && cd app && git checkout develop && git submodule update --recursive && npm install --force

WORKDIR /app

CMD [ "node", "--inspect=0.0.0.0:9229", "app.js" ]
