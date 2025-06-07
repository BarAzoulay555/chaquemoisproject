import { useEffect, useState } from "react";
import axios from "axios";

type Order = {
  id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  status: string;
  supplier_name: string;
  created_at: string;
  note?: string;
  urgent?: boolean;
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    const fetchOrders = () => {
      axios
        .get("http://localhost:5000/api/orders")
        .then((res) => setOrders(res.data))
        .catch((err) => console.error("שגיאה בטעינת ההזמנות:", err));
    };

    fetchOrders(); // קריאה מיידית
    const interval = setInterval(fetchOrders, 15000); // כל 15 שניות

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">📦 הזמנות רכש</h2>

      {orders.length === 0 ? (
        <div className="alert alert-info">לא נמצאו הזמנות.</div>
      ) : (
        <table className="table table-bordered text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>שם מוצר</th>
              <th>כמות</th>
              <th>ספק</th>
              <th>סטטוס</th>
              <th>תאריך יצירה</th>
              <th>הערה</th>
              <th>דחוף</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.product_name}</td>
                <td>{order.quantity}</td>
                <td>{order.supplier_name || "—"}</td>
                <td>
                  <span
                    className={`badge ${
                      order.status === "ממתינה"
                        ? "bg-warning"
                        : order.status === "לא התקבל"
                        ? "bg-danger"
                        : order.status === "הוזמנה אושרה"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                    style={{
                      cursor:
                        order.status === "לא התקבל" ? "pointer" : "default",
                    }}
                    onClick={() => {
                      if (order.status === "לא התקבל") {
                        setPopupMessage(
                          "⚠️ המוצר חסר במלאי אצל הספק, אנא בחר ספק אחר"
                        );
                        setShowPopup(true);
                      }
                    }}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  {new Date(order.created_at).toLocaleString("he-IL")}
                </td>
                <td>{order.note || "—"}</td>
                <td>{order.urgent ? "כן" : "לא"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* פופאפ מודרני */}
      {showPopup && (
        <div
          className="modal d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center">
              <div className="modal-header">
                <h5 className="modal-title">שגיאת הזמנה</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPopup(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>{popupMessage}</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowPopup(false)}
                >
                  סגור
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
