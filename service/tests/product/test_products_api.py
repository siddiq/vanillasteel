from unittest.mock import MagicMock, patch

from fastapi.testclient import TestClient

from app.main import app
from app.products.products_service import (
    fetch_all_products,
    fetch_product_by_product_number,
)

# we need a test client
client = TestClient(app)


def test_get_all_products():
    mock_products = [
        {"product_number": "123", "name": "Product 1"},
        {"product_number": "456", "name": "Product 2"},
    ]

    with patch(
        "app.products.products_api.fetch_all_products", return_value=mock_products
    ):
        response = client.get("/v1/products/")
        assert response.status_code == 200
        assert response.json() == mock_products


def test_get_product_by_product_number():
    mock_product = {"product_number": "123", "name": "Product 1"}

    with patch(
        "app.products.products_api.fetch_product_by_product_number",
        return_value=mock_product,
    ):
        response = client.get("/v1/products/123")
        assert response.status_code == 200
        assert response.json() == mock_product


def test_get_product_by_product_number_not_found():
    with patch(
        "app.products.products_api.fetch_product_by_product_number", return_value=[]
    ):
        response = client.get("/v1/products/999")
        assert response.status_code == 404
        assert response.json() == {"detail": "Product not found"}
