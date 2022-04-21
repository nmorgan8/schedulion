FROM python:3.9
WORKDIR /schedulion-api

# COPY ./requirements.txt ./api.py ./.flaskenv ./net_predictor/ ./firebase_creds.json ./
COPY ./requirements.txt ./api.py ./firebase_creds.json ./firebase_config.json ./Procfile ./
# COPY ./requirements.txt ./api.py ./firebase_creds.json ./firebase_config.json ./
RUN pip3 install --no-cache-dir -r ./requirements.txt
COPY ./flask_blueprints ./flask_blueprints
# COPY ./net_predictor/NET_linear_regression.py ./net_predictor/

EXPOSE 5000

# CMD [ "python3", "api.py" ]
CMD ["gunicorn", "api:app", "-w", "4"]

# build image for backend:
# docker build -f Dockerfile.api -t schedulion-api .

# create container using image made above:
# docker run -d -t --rm -p 5000:5000 schedulion-api
