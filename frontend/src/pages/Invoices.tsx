import { useEffect, useState } from "react";
import axios from "axios";

type Invoice = {
  id: number;
  order_id: number;
  product_name: string;
  supplier_name: string;
  quantity: number;
  price_per_unit: number;
  total_price: number;
  issued_at: string;
  urgent?: boolean;
  note?: string;
  recipient: string;
};

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/invoices")
      .then((res) => setInvoices(res.data))
      .catch((err) => console.error("שגיאה בטעינת החשבוניות:", err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📄 חשבוניות</h2>
      {invoices.length === 0 ? (
        <div className="alert alert-info">אין חשבוניות להצגה.</div>
      ) : (
        <table className="table table-bordered text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>מזהה הזמנה</th>
              <th>מוצר</th>
              <th>ספק</th>
              <th>כמות</th>
              <th>מחיר יחידה</th>
              <th>סה"כ</th>
              <th>הונפק בתאריך</th>
              <th>הערה</th>
              <th>דחוף</th>
              <th>נמען</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, idx) => (
              <tr key={inv.id}>
                <td>{idx + 1}</td>
                <td>{inv.order_id}</td>
                <td>{inv.product_name}</td>
                <td>{inv.supplier_name}</td>
                <td>{inv.quantity}</td>
                <td>{inv.price_per_unit} ₪</td>
                <td>{inv.total_price} ₪</td>
                <td>{new Date(inv.issued_at).toLocaleString("he-IL")}</td>
                <td>{inv.note || "—"}</td>
                <td>{inv.urgent ? "כן" : "לא"}</td>
                <td>{inv.recipient}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
