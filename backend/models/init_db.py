import sqlite3
import os

DB_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '../database/db.sqlite3'))

def create_tables():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    c.execute('''
    CREATE TABLE IF NOT EXISTS suppliers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        contact_name TEXT,
        email TEXT,
        phone TEXT,
        num_products INTEGER,
        rating REAL,
        reliability INTEGER,
        response_time_minutes INTEGER,
        payment_terms TEXT
    )
    ''')

    conn.commit()
    conn.close()
    print("✅ Database initialized successfully")

if __name__ == '__main__':
    create_tables()
