import React from 'react';
import './displaytable1.css';

const displaytable = ({ items, deleteItem, displayItem }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Supplier</th>
            <th>Expiry Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.Item_name}</td>
              <td>{item.Category}</td>
              <td>{item.Quantity}</td>
              <td>{item.price}</td>
              <td>{item.Supplier}</td>
              <td>{item.Expiry_date}</td>
              <td>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
                <button onClick={() => displayItem(item.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default displaytable;
