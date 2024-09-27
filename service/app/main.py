from fastapi import FastAPI
from app.product.product_api import router as product_router
from app.db.database import engine
from app.models.product_model import Base
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    Base.metadata.create_all(bind=engine)
    yield
    # Optional: Add shutdown logic here if needed

app = FastAPI(lifespan=lifespan)

@app.get("/ping")
def ping():
    return "pong"

# Include API routes
app.include_router(product_router, prefix="/v1/product")
