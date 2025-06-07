import React from 'react';
import LowStockAlert from "../components/LowStockAlert";
import StatsCards from "../components/StatsCards";
import LowStockTable from "../components/LowStockTable";
import RecentOrdersTable from "../components/RecentOrdersTable";


function Home() {
  return (
    <div className="container mt-5">
      <LowStockAlert />

      <h1 className="mb-3">ברוכה הבאה ל־CHAQUEMOIS</h1>
      <p className="mb-4 text-muted">
        כאן תופיע סקירה כללית של המלאי, הספקים וההזמנות שלך.
      </p>

      <StatsCards />
      <LowStockTable />
      <RecentOrdersTable />

    </div>
  );
}

export default Home;
