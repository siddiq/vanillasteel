# Search Orders

## start backend

```
poetry run uvicorn app.main:app --reload
```

Init db

```
PYTHONPATH=. poetry run python app/db/seed.py ../files/inventory.csv
```

# Decisions

- Used Python FAST API, as I am already familiar with it and also since its a newer framework and it has some cool features like async/await, Pydantic validations, built on ASGI and has open api docs
- Used poetry instead of python environments

# Assumptions

- Product Number seems to be unique id

#

#

#

#

#

# API

/v1/

# TODO

1. setup postgresql in docker
   create a docker compose for dev that runs postgresql

2. makefile

# imporanbt todo

docker compose

deployment
pipelines?
