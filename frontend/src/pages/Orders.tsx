import { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  status: string;
  supplier_name: string;
  created_at: string;
  note?: string;
  urgent?: boolean;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [paymentOrder, setPaymentOrder] = useState<Order | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const fetchOrders = () => {
      axios
        .get("http://localhost:5000/api/orders")
        .then((res) => setOrders(res.data))
        .catch((err) => console.error("שגיאה בטעינת ההזמנות:", err));
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleConfirmAndUpdateStock = (order: Order) => {
    axios
      .put(`http://localhost:5000/api/products/${order.product_id}/add-stock`, {
        quantity: order.quantity,
      })
      .then(() => {
        alert(`✔️ כמות עודכנה במלאי עבור המוצר: ${order.product_name}`);
      })
      .catch((err) => {
        console.error("שגיאה בעדכון כמות:", err);
        alert("❌ שגיאה בעדכון המלאי.");
      });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentOrder(null);
      setPaymentSuccess(false);
    }, 2000);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">הזמנות רכש</h2>

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
              <th>פעולה</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
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
                        : order.status === "הזמנה אושרה"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                    style={{
                      cursor:
                        order.status === "לא התקבל" || order.status === "הזמנה אושרה"
                          ? "pointer"
                          : "default",
                    }}
                    onClick={() => {
                      if (order.status === "לא התקבל") {
                        setPopupMessage("⚠️ המוצר חסר במלאי אצל הספק, אנא בחר ספק אחר");
                        setShowPopup(true);
                      } else if (order.status === "הזמנה אושרה") {
                        setPaymentOrder(order);
                      }
                    }}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{new Date(order.created_at).toLocaleString("he-IL")}</td>
                <td>{order.note || "—"}</td>
                <td>{order.urgent ? "כן" : "לא"}</td>
                <td>
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => handleConfirmAndUpdateStock(order)}
                  >
                    ההזמנה התקבלה ועודכנה במלאי
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showPopup && (
        <div className="modal d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center">
              <div className="modal-header">
                <h5 className="modal-title">שגיאת הזמנה</h5>
                <button type="button" className="btn-close" onClick={() => setShowPopup(false)}></button>
              </div>
              <div className="modal-body">
                <p>{popupMessage}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowPopup(false)}>
                  סגור
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {paymentOrder && (
        <div className="modal d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">חשבונית לתשלום</h5>
                <button type="button" className="btn-close" onClick={() => setPaymentOrder(null)}></button>
              </div>
              <div className="modal-body">
                {paymentSuccess ? (
                  <div className="alert alert-success text-center">
                    ✅ התשלום בוצע בהצלחה!
                  </div>
                ) : (
                  <form onSubmit={handlePaymentSubmit}>
                    <p>מוצר: <strong>{paymentOrder.product_name}</strong></p>
                    <p>כמות: {paymentOrder.quantity}</p>
                    <p>ספק: {paymentOrder.supplier_name}</p>
                    <hr />
                    <div className="mb-3">
                      <label className="form-label">מספר כרטיס</label>
                      <input type="text" className="form-control" required />
                    </div>
                    <div className="row">
                      <div className="col">
                        <label className="form-label">תוקף</label>
                        <input type="text" className="form-control" required />
                      </div>
                      <div className="col">
                        <label className="form-label">CVV</label>
                        <input type="text" className="form-control" required />
                      </div>
                    </div>
                    <div className="mt-3 text-end">
                      <button type="submit" className="btn btn-success">שלם עכשיו</button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
