import { useEffect, useState } from "react";
import axios from "axios";

type Order = {
  id: number;
  product_id: number;
  name: string;
  quantity: number;
  status: string;
  created_at: string;
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error("שגיאה בטעינת ההזמנות:", err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📦 הזמנות רכש</h2>

      {orders.length === 0 ? (
        <div className="alert alert-info">לא נמצאו הזמנות.</div>
      ) : (
        <table className="table table-bordered text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>שם מוצר</th>
              <th>כמות</th>
              <th>סטטוס</th>
              <th>תאריך יצירה</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.quantity}</td>
                <td>
                  <span className={`badge bg-${order.status === "pending" ? "warning" : "success"}`}>
                    {order.status === "pending" ? "ממתינה" : "הושלמה"}
                  </span>
                </td>
                <td>{new Date(order.created_at).toLocaleString("he-IL")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
