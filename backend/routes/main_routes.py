from flask import Blueprint, request, jsonify
from database.db import get_db_connection
from datetime import datetime, timedelta

main_bp = Blueprint('main', __name__, url_prefix='/api')

# ✅ GET /api/products
@main_bp.route('/products', methods=['GET'])
def get_products():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM products")
    rows = cursor.fetchall()
    conn.close()
    products = [dict(row) for row in rows]
    return jsonify(products)

# ✅ POST /api/orders
@main_bp.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    product_id = data.get("product_id")
    quantity = data.get("quantity", 1)
    supplier_id = data.get("supplier_id")
    note = data.get("note", "")
    urgent = data.get("urgent")

    if not product_id:
        return jsonify({"success": False, "error": "חסר מזהה מוצר"}), 400
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO purchase_orders (product_id, quantity, supplier_id, note, urgent)
        VALUES (?, ?,?, ?, ?)
    """, (product_id, quantity,supplier_id, note, urgent))
    conn.commit()
    conn.close()
    return jsonify({"success": True, "message": "ההזמנה נוספה"}), 201

# ✅ GET /api/orders
@main_bp.route('/orders', methods=['GET'])
def get_orders():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT o.id, o.quantity, o.status, o.created_at,
               o.note, o.urgent,                           
               p.name as product_name,
               s.name as supplier_name
        FROM purchase_orders o
        JOIN products p ON o.product_id = p.id
        JOIN suppliers s ON o.supplier_id = s.id
    """)
    rows = cursor.fetchall()
    updated_orders = []

    now = datetime.now()

    for row in rows:
        order = dict(row)
        created_at = datetime.fromisoformat(order['created_at'])

        # לוגיקת עדכון סטטוס
        minutes_passed = (now - created_at).total_seconds() / 60
        supplier_name = order['supplier_name']

        if supplier_name == "Cotton Dreams":
            if minutes_passed >= 1:
                order['status'] = "לא התקבל"
        else:
            if minutes_passed >= 2:
                order['status'] = "הוזמנה אושרה"
            elif minutes_passed >= 1:
                order['status'] = "הזמנה התקבלה אצל ספק"

        updated_orders.append(order)

    conn.close()
    return jsonify(updated_orders)


# ✅ GET /api/suppliers
@main_bp.route('/suppliers', methods=['GET'])
def get_suppliers():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name FROM suppliers")
    suppliers = cursor.fetchall()
    conn.close()
    return jsonify([dict(s) for s in suppliers])

# ✅ GET /api/low-stock
@main_bp.route('/low-stock', methods=['GET'])
def get_low_stock():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM products WHERE quantity < reorder_level")
    rows = cursor.fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])
