import sqlite3
import os

DB_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), 'db.sqlite3'))

suppliers = [
    {
        "name": "אופנת מיקה",
        "contact_name": "מיקה לוי",
        "email": "mika@example.com",
        "phone": "050-1234567",
        "num_products": 120,
        "rating": 4.5,
        "reliability": 90,
        "response_time_minutes": 60,
        "payment_terms": "שוטף +30"
    },
    {
        "name": "בגדי נועה",
        "contact_name": "נועה כהן",
        "email": "noa@example.com",
        "phone": "052-7654321",
        "num_products": 85,
        "rating": 4.2,
        "reliability": 80,
        "response_time_minutes": 180,
        "payment_terms": "מזומן"
    },
    {
        "name": "סטייל רותם",
        "contact_name": "רותם רוזן",
        "email": "rotem@example.com",
        "phone": "054-8888888",
        "num_products": 200,
        "rating": 4.8,
        "reliability": 95,
        "response_time_minutes": 45,
        "payment_terms": "שוטף +60"
    }
]

def insert_suppliers():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    for supplier in suppliers:
        c.execute('''
        INSERT INTO suppliers (
            name, contact_name, email, phone,
            num_products, rating, reliability,
            response_time_minutes, payment_terms
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            supplier["name"],
            supplier["contact_name"],
            supplier["email"],
            supplier["phone"],
            supplier["num_products"],
            supplier["rating"],
            supplier["reliability"],
            supplier["response_time_minutes"],
            supplier["payment_terms"]
        ))

    conn.commit()
    conn.close()
    print("✅ Suppliers inserted successfully")

if __name__ == '__main__':
    insert_suppliers()
