# syntax=docker/dockerfile:1

# DOCKER_BUILDKIT=1 docker build .

FROM ubuntu:latest

# firebase ports
EXPOSE 443
# if issues expose following ports:
# EXPOSE 5228 
# EXPOSE 5229
# EXPOSE 5230

# install python and python package
RUN apt-get -y update && apt-get install -y python
RUN apt-get -y install python3-pip
# RUN pip3 install flask python-dotenv

# install ReactJS
# RUN apt-get -y install npm

# copy files in directories to Docker container
COPY net_predictor usr/src/schedulion/net_predictor