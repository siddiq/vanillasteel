import csv
import io

from sqlalchemy.orm import Session

from app.models.preference_model import Preference
from app.util.converters import parse_float


def fetch_all_rows(db: Session):
    return db.query(Preference).all()


def upload_file(file_contents: bytes, db: Session):
    try:
        # Clear the table before inserting new data
        db.query(Preference).delete()  # Truncate is faster but requires manual sql

        # Convert byte data to string and parse CSV
        csv_data = io.StringIO(file_contents.decode("utf-8"))
        reader = csv.DictReader(csv_data)

        for row in reader:
            new_preference = Preference(
                material=row["Material"],
                form=row["Form"],
                grade=row["Grade"],
                choice=row.get("Choice", None),
                width_min=(
                    parse_float(row["Width (Min)"]) if row["Width (Min)"] else None
                ),
                width_max=(
                    parse_float(row["Width (Max)"]) if row["Width (Max)"] else None
                ),
                thickness_min=parse_float(row["Thickness (Min)"]),
                thickness_max=parse_float(row["Thickness (Max)"]),
            )

            db.add(new_preference)

        # Commit the transaction all together
        db.commit()

        return "CSV data uploaded and processed successfully."

    except Exception as e:
        # Otherwise rollback
        db.rollback()
        return f"An error occurred: {e}"
