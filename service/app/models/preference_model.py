from sqlalchemy import Column, Integer, String, Float
from app.db.database import Base

class Preference(Base):
    __tablename__ = "preference"
    
    id = Column(Integer, primary_key=True, index=True)
    material = Column(String, nullable=False)  
    form = Column(String, nullable=False)      
    grade = Column(String, nullable=False)     
    choice = Column(String, nullable=True)     
    width_min = Column(Float, nullable=True)   
    width_max = Column(Float, nullable=True)   
    thickness_min = Column(Float, nullable=False) 
    thickness_max = Column(String, nullable=False)  

