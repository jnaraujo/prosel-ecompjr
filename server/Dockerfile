FROM python:3.12

WORKDIR /server

ENV DATABASE_URL="mysql+pymysql://root:root@database:3306/ecompjr" \
  SERVER_URL="vps.jnaraujo.com" \
  POETRY_VERSION=1.6.1

RUN pip install poetry==$POETRY_VERSION
RUN python -m venv /venv

COPY pyproject.toml poetry.lock ./

RUN poetry config virtualenvs.create false
RUN poetry install

COPY ./app /server/app

WORKDIR /server/app

CMD ["uvicorn", "main:app", "--host", $SERVER_URL, "--port", "2258"]