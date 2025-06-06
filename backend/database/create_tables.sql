CREATE TABLE IF NOT EXISTS suppliers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  num_products INTEGER,
  rating REAL,
  reliability INTEGER,
  response_time TEXT,
  payment_terms TEXT
);
