from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import uvicorn

DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



class Car(Base):
    __tablename__ = "cars"
    id = Column(Integer, primary_key=True, index=True)
    brand = Column(String, index=True)
    model = Column(String, index=True)
    available = Column(Boolean, default=True)

class CarCreate(BaseModel):
    brand: str
    model: str

class CarBooking(BaseModel):
    car_id: int

Base.metadata.create_all(bind=engine)

@app.post("/cars/", response_model=CarCreate)
def create_car(car: CarCreate, db: Session = Depends(SessionLocal)):
    db_car = Car(brand=car.brand, model=car.model)
    db.add(db_car)
    db.commit()
    db.refresh(db_car)
    return db_car

@app.get("/cars/", response_model=List[CarCreate])
def read_cars(skip: int = 0, limit: int = 10, db: Session = Depends(SessionLocal)):
    cars = db.query(Car).offset(skip).limit(limit).all()
    return cars

@app.post("/bookings/")
def book_car(booking: CarBooking, db: Session = Depends(SessionLocal)):
    car = db.query(Car).filter(Car.id == booking.car_id).first()
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")
    if not car.available:
        raise HTTPException(status_code=400, detail="Car not available")
    car.available = False
    db.commit()
    db.refresh(car)
    return {"message": "Car booked successfully!"}

if __name__ == "__main__":
    uvicorn.run("main:app",host="127.0.0.1",port=8000,reload=True)
