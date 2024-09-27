import csv
import argparse
from app.db.database import SessionLocal
from app.models.product_model import Product

# Function to populate the database from CSV
def populate_database_from_csv(csv_file_path):
    with SessionLocal() as db:
        try:
            # Open the CSV file
            with open(csv_file_path, mode='r') as file:
                reader = csv.DictReader(file)

                # Iterate over each row in the CSV
                for row in reader:
                    # Create a new Product object for each row
                    product = Product(
                        product_number=row['Product Number'],
                        material=row['Material'],
                        form=row['Form'],
                        choice=row['Choice'],
                        grade=row['Grade'],
                        finish=row['Finish'],
                        quantity=int(row['Quantity']),
                        weight=float(row['Weight (t)']),
                        length=float(row['Length (mm)']) if row['Length (mm)'] else None,
                        width=float(row['Width (mm)']) if row['Width (mm)'] else None,
                        height=float(row['Height (mm)']) if row['Height (mm)'] else None,
                        thickness=float(row['Thickness (mm)']) if row['Thickness (mm)'] else None,
                        outer_diameter=float(row['Outer Diameter (mm)']) if row['Outer Diameter (mm)'] else None,
                        location=row['Location']
                    )

                    # Add the Product object to the session
                    db.add(product)

                # Commit the session to insert all rows into the database
                db.commit()
                print("Database populated successfully from CSV.")

        except Exception as e:
            db.rollback()
            print(f"An error occurred: {e}")

if __name__ == "__main__":
    # Set up argument parsing
    parser = argparse.ArgumentParser(description="Populate database from a CSV file")
    parser.add_argument('csv_file', help="Path to the CSV file")

    # Parse the arguments
    args = parser.parse_args()

    # Call the function with the provided CSV file path
    populate_database_from_csv(args.csv_file)
