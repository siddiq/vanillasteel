from app.models.preference_model import Preference
from app.models.product_model import Product
from sqlalchemy import and_, or_
from sqlalchemy.orm import Session


def fetch_all_products(db: Session):
    return db.query(Product).all()


def fetch_product_by_product_number(db: Session, product_number: str):
    return db.query(Product).filter(Product.product_number == product_number).first()


def fetch_products_matched_by_preference(db: Session):
    # Fetch all preferences
    preferences = db.query(Preference).all()

    filters = []
    # Iterate over preferences and create filters
    for rule in preferences:
        conditions = []
        print(vars(rule))

        # Only match that are > 10 tons
        conditions.append(Product.weight >= 10)

        # Apply Material, Form, Choice, Grade and Dimensions
        # Check each condition and add it only if it's not None
        if rule.material is not None and rule.material != "":
            conditions.append(Product.material == rule.material)
        if rule.form is not None and rule.form != "":
            conditions.append(Product.form == rule.form)
        if rule.grade is not None and rule.grade != "":
            conditions.append(Product.grade == rule.grade)
        if rule.choice is not None and rule.choice != "":
            conditions.append(Product.choice == rule.choice)
        if rule.width_min is not None:
            conditions.append(Product.width >= rule.width_min)
        if rule.width_max is not None:
            conditions.append(Product.width <= rule.width_max)
        if rule.thickness_min is not None:
            conditions.append(Product.thickness >= rule.thickness_min)
        if rule.thickness_max is not None:
            conditions.append(Product.thickness <= rule.thickness_max)

        # Add the conditions as an 'and_' clause
        if conditions:
            filters.append(and_(*conditions))

    # Combine all 'and_' clauses with 'or_'
    query = db.query(Product).filter(or_(*filters))
    print(str(query.statement))

    return query.all()
