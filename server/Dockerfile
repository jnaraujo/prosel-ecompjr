FROM python:3.12

WORKDIR /server

ARG MYSQL_ROOT_PASSWORD
ARG JWT_SECRET_KEY

ENV DATABASE_URL="mysql+pymysql://root:${MYSQL_ROOT_PASSWORD}@database:3306/ecompjr" \
  POETRY_VERSION=1.6.1 \
  JWT_SECRET_KEY=${JWT_SECRET_KEY}

RUN pip install poetry==$POETRY_VERSION
RUN python -m venv /venv

COPY pyproject.toml poetry.lock ./

RUN poetry config virtualenvs.create false
RUN poetry install

COPY ./app /server/app

WORKDIR /server/app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3000"]