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

    c.execute('''DROP TABLE IF EXISTS products;''');


    c.execute('''
  CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  reorder_level INTEGER NOT NULL DEFAULT 5,
  price INTEGER NOT NULL,
  image TEXT NOT NULL,
  supplier_id INTEGER,
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);

    ''')

    c.execute('''
    CREATE TABLE IF NOT EXISTS purchase_orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  status TEXT DEFAULT 'ממתינה',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id)
);
''')

    conn.commit()
    conn.close()
    print("✅ Database initialized successfully")

if __name__ == '__main__':
    create_tables()
