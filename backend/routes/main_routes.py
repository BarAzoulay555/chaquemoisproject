from flask import Blueprint, request, jsonify
from backend.database.db import get_db_connection

main_bp = Blueprint('main', __name__)

# ✅ GET /api/products
@main_bp.route('/api/products', methods=['GET'])
def get_products():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM products")
    rows = cursor.fetchall()
    conn.close()
    products = [dict(row) for row in rows]
    return jsonify(products)

# ✅ POST /api/orders
@main_bp.route('/api/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    product_id = data.get("product_id")
    quantity = data.get("quantity", 1)
    if not product_id:
        return jsonify({"success": False, "error": "חסר מזהה מוצר"}), 400
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO purchase_orders (product_id, quantity)
        VALUES (?, ?)
    """, (product_id, quantity))
    conn.commit()
    conn.close()
    return jsonify({"success": True, "message": "ההזמנה נוספה"}), 201

# ✅ GET /api/orders
@main_bp.route('/api/orders', methods=['GET'])
def get_orders():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT o.id, o.product_id, o.quantity, o.status, o.created_at,
               p.name
        FROM purchase_orders o
        JOIN products p ON p.id = o.product_id
    """)
    orders = cursor.fetchall()
    conn.close()
    return jsonify([dict(order) for order in orders])

# ✅ GET /api/suppliers
@main_bp.route('/api/suppliers', methods=['GET'])
def get_suppliers():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name FROM suppliers")
    suppliers = cursor.fetchall()
    conn.close()
    return jsonify([dict(s) for s in suppliers])
