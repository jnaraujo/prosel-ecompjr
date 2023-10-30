FROM python:3.9

WORKDIR /server

COPY ./requirements.txt /server/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /server/requirements.txt

COPY ./app /server/app

WORKDIR /server/app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3000"]

EXPOSE 3000