import os
from backend.database.db import get_db_connection
import sqlite3

DB_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), 'db.sqlite3'))

def insert_products():
    products = [
        {
            "name": "Beige Ruby Skirt",
            "quantity": 150,
            "reorder_level": 20,
            "price": 220,
            "image": "BeigeRubySkirt.png"
        },
        {
            "name": "Black Ruby Skirt",
            "quantity": 150,
            "reorder_level": 20,
            "price": 210,
            "image": "BlackRubySkirt.png"
        },
        {
            "name": "Emma dress Black",
            "quantity": 200,
            "reorder_level": 20,
            "price": 300,
            "image": "EmmadressBlack.png"
        },
        {
            "name": "White Ruby Skirt",
            "quantity": 150,
            "reorder_level": 20,
            "price": 220,
            "image": "WhiteRubySkirt.png"
        },
        {
            "name": "Emma dress white",
            "quantity": 200,
            "reorder_level": 20,
            "price": 300,
            "image": "EmmadressWhite.png"
        }
    ]

    conn = get_db_connection()
    cursor = conn.cursor()

    for product in products:
        cursor.execute("""
            INSERT INTO products (name, quantity, reorder_level, price, image)
            VALUES (?, ?, ?, ?, ?)
        """, (
            product["name"],
            product["quantity"],
            product["reorder_level"],
            product["price"],
            product["image"]
        ))

    conn.commit()
    conn.close()
    print("✅ Products inserted successfully")

if __name__ == "__main__":
    insert_products()
