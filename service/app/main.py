from fastapi import FastAPI
from app.product.product_api import router as product_router
from app.db.database import engine
from app.models.product_model import Base

app = FastAPI()

@app.on_event("startup")
async def startup():
    # Ensure all models are created in the database
    Base.metadata.create_all(bind=engine)

@app.get("/ping")
def ping():
    return "pong"

# Include API routes
app.include_router(product_router, prefix="/v1/product")
 