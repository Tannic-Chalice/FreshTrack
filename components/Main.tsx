import React from 'react';

const Main: React.FC = () => {
  return (
    <main className="main">
      <h1 className="main-title">WAREHOUSE INVENTORY MANAGEMENT</h1>
      <p className="description">
        Warehouse inventory management is a systematic approach to efficiently tracking, storing, and managing stock, ensuring optimal storage conditions and timely processing. It helps prevent spoilage of perishable items like fruits, vegetables, and groceries by monitoring expiry dates and streamlining inventory flow.
      </p>
      <div className="button-container">
        <div className="button-box" onClick={() => alert('Stock Report Clicked!')}>
          <h2>Stock Report</h2>
          <img src="/photos/stock.jpg" alt="Stock Report" className="button-image" />
        </div>
        <div className="button-box" onClick={() => alert('Check Freshness Clicked!')}>
          <h2>Check Freshness</h2>
          <img src="/photos/fresh.jpg" alt="Check Freshness" className="button-image" />
        </div>
      </div>
    </main>
  );
};

export default Main;