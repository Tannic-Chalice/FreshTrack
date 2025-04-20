import React, { useEffect, useState } from 'react';
import styles from '../styles/stock-report.module.css'; // Import the CSS module

interface Item {
  item: string;
  quantity: number;
  fresh_items: number;
  rotten_items: number;
  disposed_items: number;
  freshness_status: string[]; // This will contain fresh/rotten status info
}

const StockReport: React.FC = () => {
  const [inventoryData, setInventoryData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch inventory data via HTTP request (replacing WebSocket)
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/inventory-report');
        const data = await response.json();
        setInventoryData(data);  // Update state with fetched data
        setLoading(false);  // Stop loading once data is fetched
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching inventory data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array, so this effect runs only once

  // If still loading, show a loading message
  if (loading) return <div>Loading...</div>;

  // If there's an error, show the error message
  if (error) return <div>{error}</div>;

  // Render the inventory data in a table
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Warehouse Inventory Stock Report</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Total Quantity</th>
            <th>Fresh Items</th>
            <th>Rotten Items</th>
            <th>Disposed Items</th>
            <th>Freshness Status</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((item, index) => (
            <tr key={index}>
              <td>{item.item}</td>
              <td>{item.quantity}</td>
              <td>{item.fresh_items}</td>
              <td>{item.rotten_items}</td>
              <td>{item.disposed_items}</td>
              <td>
                <ul className={styles.freshnessStatusList}>
                  {/* Ensure freshness_status is an array */}
                  {(item.freshness_status || []).map((status, idx) => (
                    <li key={idx}>{status}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockReport;
