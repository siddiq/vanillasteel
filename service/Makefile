# Variables
PYTHONPATH=.
CSV_FILE=../files/inventory.csv

# Run FastAPI Server
run:
	poetry run uvicorn app.main:app --reload

# Initialize the Database with CSV
init_db:
	PYTHONPATH=$(PYTHONPATH) poetry run python app/db/seed.py $(CSV_FILE)

# Bring up Docker Compose (e.g., for services like Postgres or Redis)
docker_up:
	docker-compose up -d

# Stop Docker Compose
docker_down:
	docker-compose down

# Rebuild Docker Compose (optional)
docker_rebuild:
	docker-compose up --build -d

# Run all (run Docker and then FastAPI server)
run_all: docker_up run
