FROM python:3.11

ENV PIP_DISABLE_PIP_VERSION_CHECK=on

RUN pip3 install django
RUN pip3 install djangorestframework
RUN pip3 install django-cors-headers
RUN pip3 install qiskit
RUN pip3 install gunicorn
RUN pip3 install whitenoise
RUN pip3 install poetry==1.5.1

WORKDIR /app
COPY pyproject.toml /app/
COPY . ./

RUN ./build.sh
CMD gunicorn quantum_server.wsgi:application

# RUN pip3 install -r requirements.txt
# CMD python3 manage.py runserver 0.0.0.0:8000