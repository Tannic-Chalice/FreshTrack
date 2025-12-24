import React from 'react';
// 1. Import the styles object
import styles from './displaytable1.module.css';

const DisplayTable = ({ items, deleteItem, displayItem }) => {
  return (
    // 2. Apply classes using styles.className
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.headerCell}>ID</th>
            <th className={styles.headerCell}>Item Name</th>
            <th className={styles.headerCell}>Category</th>
            <th className={styles.headerCell}>Quantity</th>
            <th className={styles.headerCell}>Price</th>
            <th className={styles.headerCell}>Supplier</th>
            <th className={styles.headerCell}>Expiry Date</th>
            <th className={styles.headerCell}>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {items.map((item) => (
            <tr key={item.id}>
              <td className={styles.tableCell}>{item.id}</td>
              <td className={styles.tableCell}>{item.Item_name}</td>
              <td className={styles.tableCell}>{item.Category}</td>
              <td className={styles.tableCell}>{item.Quantity}</td>
              <td className={styles.tableCell}>{item.price}</td>
              <td className={styles.tableCell}>{item.Supplier}</td>
              <td className={styles.tableCell}>{item.Expiry_date}</td>
              <td className={styles.tableCell}>
                <button 
                  className={styles.actionButton} 
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>
                <button 
                  className={styles.actionButton} 
                  onClick={() => displayItem(item.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTable;