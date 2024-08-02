# original from repo
FROM node:20-bullseye-slim

RUN apt update && \
  apt install -qqy python3 build-essential

EXPOSE 3000

# ---
# customized 

RUN apt update &&\
  apt install -qqy curl
  
RUN apt-get clean 
