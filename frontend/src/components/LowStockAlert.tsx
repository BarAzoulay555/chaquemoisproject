import { useEffect, useState } from 'react';
import axios from 'axios';

type Product = {
  id: number;
  name: string;
  quantity: number;
  reorder_level: number;
};

type Props = {
  onClose?: () => void;
};

export default function LowStockAlert({ onClose }: Props) {
  const [lowStockItems, setLowStockItems] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((response) => {
        const lowStock = response.data.filter((product: Product) =>
          product.quantity < product.reorder_level
        );
        setLowStockItems(lowStock);
        if (lowStock.length > 0) {
          setShowModal(true);
        } else { 
          if(onClose) onClose()
        }
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleClose = () => {
    setShowModal(false);
    if (onClose) onClose();
  };

  if (!showModal) return null;

  return (
    <div className="modal show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header bg-warning">
            <h5 className="modal-title text-danger">התראת מלאי נמוך</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>הפריטים הבאים במלאי נמוך ודורשים הזמנה מחדש:</p>
            <ul className="list-group">
              {lowStockItems.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {item.name}
                  <span className="badge bg-danger">
                    {item.quantity} / {item.reorder_level}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={handleClose}>סגור</button>
          </div>
        </div>
      </div>
    </div>
  );
}
