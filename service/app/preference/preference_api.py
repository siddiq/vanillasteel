from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.preference.preference_service import fetch_all_rows, upload_file

router = APIRouter()

# Endpoint to fetch all rows
@router.get("")
def get_all_rows(db: Session = Depends(get_db)):
    all_rows = fetch_all_rows(db)
    return all_rows

# New endpoint to upload a CSV file
@router.post("/upload-csv")
async def upload_csv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if file.content_type != 'text/csv':
        raise HTTPException(status_code=400, detail="Invalid file format. Please upload a CSV file.")

    # Read the uploaded file
    contents = await file.read()

    # Pass the file contents to the service for processing
    message = upload_file(contents, db)

    return {"message": message}
