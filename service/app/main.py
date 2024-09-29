from fastapi import FastAPI
from app.products.products_api import router as products_router
from app.preference.preference_api import router as preference_router
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
    return {"data": "pong"}

# Include API routes
app.include_router(products_router, prefix="/v1/products")
app.include_router(preference_router, prefix="/v1/preference")
