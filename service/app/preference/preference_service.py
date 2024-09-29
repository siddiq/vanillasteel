from sqlalchemy.orm import Session
from app.models.preference_model import Preference
import csv
import io

def fetch_all_rows(db: Session):
    return db.query(Preference).all()

def upload_file(file_contents: bytes, db: Session):
    try:
        # Clear the table before inserting new data
        db.query(Preference).delete() # Truncate is faster but requires manual sql        

        # Convert byte data to string and parse CSV
        csv_data = io.StringIO(file_contents.decode("utf-8"))
        reader = csv.DictReader(csv_data)

        # Iterate over the rows of the CSV
        for row in reader:
            # Map the CSV row to the Preference model
            new_preference = Preference(
                material=row['Material'],
                form=row['Form'],
                grade=row['Grade'],
                choice=row.get('Choice', None),  # Set 'choice' to None if not provided
                width_min=float(row['Width (Min)']) if row['Width (Min)'] else None,
                width_max=float(row['Width (Max)']) if row['Width (Max)'] else None,
                thickness_min=float(row['Thickness (Min)']),
                thickness_max=row['Thickness (Max)']  # Keep as string for potential mixed types
            )

            # Add the new record to the session
            db.add(new_preference)

        # Commit the transaction to save the records in the database
        db.commit()

        return "CSV data uploaded and processed successfully."

    except Exception as e:
        # Handle parsing or database errors
        db.rollback()  # Rollback in case of any errors
        return f"An error occurred: {e}"
