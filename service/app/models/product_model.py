from sqlalchemy import Column, Integer, String, Float
from app.db.database import Base

class Product(Base):
    __tablename__ = "product"

    product_number = Column(String, primary_key=True, index=True)
    material = Column(String, index=True)
    form = Column(String)
    choice = Column(String)
    grade = Column(String)
    finish = Column(String, nullable=True)
    surface = Column(String, nullable=True)
    quantity = Column(Integer)
    weight = Column(Float)
    length = Column(Float, nullable=True)
    width = Column(Float, nullable=True)
    height = Column(Float, nullable=True)
    thickness = Column(Float, nullable=True)
    outer_diameter = Column(Float, nullable=True)
    wall_thickness = Column(Float, nullable=True)
    web_thickness = Column(Float, nullable=True)
    flange_thickness = Column(Float, nullable=True)
    certificates = Column(String, nullable=True)
    location = Column(String)
