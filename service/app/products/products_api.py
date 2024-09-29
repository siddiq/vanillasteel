from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.products.products_service import fetch_all_products, fetch_product_by_product_number, fetch_products_matched_by_preference

router = APIRouter()

@router.get("")
def get_all_products(db: Session = Depends(get_db)):
    all = fetch_all_products(db)
    return all

@router.get("/matched")
def get_products_matched_by_preference(db: Session = Depends(get_db)):
    all = fetch_products_matched_by_preference(db)
    return all

@router.get("/{product_number}")
def get_product_by_product_number(product_number: str, db: Session = Depends(get_db)):
    product = fetch_product_by_product_number(db, product_number)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

