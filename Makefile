# Makefile

# Variables
APP_NAME=service.fastapi.main:app
PORT=8000
UVICORN=uvicorn
BLACK=black
ISORT=isort
FLAKE8=flake8
PYTEST=pytest
MYPY=mypy

# Default target: run the FastAPI app
run:
	$(UVICORN) $(APP_NAME) --reload --host 0.0.0.0 --port $(PORT)

# Format the code using black and isort
format:
	$(BLACK) .
	$(ISORT) .

# Linting code using flake8
lint:
	$(FLAKE8) .

# Type check using mypy
typecheck:
	$(MYPY) .

# Run tests using pytest
test:
	$(PYTEST)

# Install dev dependencies (assuming you use poetry, update based on your tool)
install:
	poetry install

# Clean up bytecode and caches
clean:
	find . -name '*.pyc' -delete
	find . -name '__pycache__' -delete

.PHONY: run format lint typecheck test install clean
