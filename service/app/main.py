from contextlib import asynccontextmanager

from app.db.database import Base, engine
from app.models.preference_model import Preference  # must import
from app.models.product_model import Product  # must import
from app.preference.preference_api import router as preference_router
from app.products.products_api import router as products_router
from fastapi import FastAPI


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic: Create database tables
    Base.metadata.create_all(bind=engine)
    yield
    # Optional: Add shutdown logic here if needed


# Initialize the FastAPI app with the lifespan function
app = FastAPI(
    title="Products and Matching API Docs",
    description="This API provides product and preference management services.",
    version="1.0.0",
    lifespan=lifespan,  # Include the lifespan function here
)


@app.get("/ping")
def ping():
    return {"data": "pong"}


# Include API routes
app.include_router(products_router, prefix="/v1/products")
app.include_router(preference_router, prefix="/v1/preference")
