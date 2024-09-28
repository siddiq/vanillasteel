from sqlalchemy.orm import Session
from app.models.product_model import Product

def fetch_all_products(db: Session):
    return db.query(Product).all()

def fetch_product_by_product_number(db: Session, product_number: str):
    return db.query(Product).filter(Product.product_number == product_number).first()
