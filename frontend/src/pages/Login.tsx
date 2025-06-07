import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import LowStockAlert from '../components/LowStockAlert';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      setShowAlert(true)
    } else {
      setError('שם משתמש או סיסמה שגויים');
    }
  };

  const handleAlertClosed = () => {
    setShowAlert(false)
    navigate('/home')
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 position-relative">
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="text-center mb-3">
          <img src="/images/logo.png" alt="CHAQUEMOIS Logo" style={{ height: '80px' }} />
          <h3 className="mt-2">CHAQUEMOIS</h3>
          <p className="text-muted">מערכת ניהול חנות</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">שם משתמש</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="הכנס שם משתמש"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">סיסמה</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="הכנס סיסמה"
            />
          </div>
          {error && <div className="text-danger">{error}</div>}
          <button className="btn btn-dark w-100" type="submit">התחבר</button>
        </form>
      </div>

      {/* התראת מלאי נמוך – מוצגת מעל הטופס */}
      {showAlert && <LowStockAlert onClose={handleAlertClosed} />}
    </div>
  );
}
