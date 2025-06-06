from backend.database.db import get_db_connection

def check_tables():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    tables = cursor.fetchall()

    print("📦 Tables in DB:")
    for table in tables:
        print("-", table["name"])

    conn.close()

if __name__ == "__main__":
    check_tables()
