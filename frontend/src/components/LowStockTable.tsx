import { useEffect, useState } from "react";
import axios from "axios";

type Product = {
  id: number;
  name: string;
  quantity: number;
  reorder_level: number;
  color?: string;
  size?: string;
};

export default function LowStockTable() {
  const [lowStockItems, setLowStockItems] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/low-stock")
      .then(res => setLowStockItems(res.data))
      .catch(err => console.error("Failed to fetch low stock:", err));
  }, []);

  if (lowStockItems.length === 0) return null;

  return (
    <div className="mt-5">
      <h5 className="mb-3 text-danger">📉 פריטים שדורשים הזמנה מחדש</h5>
      <table className="table table-bordered table-hover text-center">
        <thead className="table-light">
          <tr>
            <th>מוצר</th>
            <th>צבע</th>
            <th>מידה</th>
            <th>כמות נוכחית</th>
            <th>רמת הזמנה</th>
          </tr>
        </thead>
        <tbody>
          {lowStockItems.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.color || "-"}</td>
              <td>{item.size || "-"}</td>
              <td className={item.quantity < item.reorder_level ? "text-danger fw-bold" : ""}>
                {item.quantity}
              </td>
              <td>{item.reorder_level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
