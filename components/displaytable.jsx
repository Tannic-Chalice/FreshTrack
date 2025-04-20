import React from 'react';
import Head from '../components/header'; // Importing the header component

const displaytable = ({ items, deleteItem, displayItem }) => {
  // Inline styles for the component
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
  };

  const tableStyle = {
    width: '90%',
    maxWidth: '1000px',
    borderCollapse: 'collapse',
    margin: '20px 0',
    fontSize: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const theadStyle = {
    backgroundColor: '#343a40',
    color: '#ffffff',
  };

  const thStyle = {
    textAlign: 'left',
    padding: '12px 15px',
    whiteSpace: 'nowrap',
  };

  const tbodyStyle = {
    backgroundColor: '#f2f2f2',
  };

  const tbodyRowStyle = {
    padding: '12px 15px',
    borderBottom: '1px solid #ddd',
    whiteSpace: 'nowrap',
  };

  const buttonStyle = {
    marginLeft: '8px',
    padding: '10px 18px',
    fontSize: '16px',
    color: '#ffffff',
    backgroundColor: '#47698d',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, box-shadow 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#333a41',
  };

  return (
    <div style={containerStyle}>
      <Head /> {/* Including the Header Component */}
      <table style={tableStyle}>
        <thead style={theadStyle}>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Item Name</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Quantity</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Supplier</th>
            <th style={thStyle}>Expiry Date</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} style={tbodyStyle}>
              <td style={tbodyRowStyle}>{item.id}</td>
              <td style={tbodyRowStyle}>{item.Item_name}</td>
              <td style={tbodyRowStyle}>{item.Category}</td>
              <td style={tbodyRowStyle}>{item.Quantity}</td>
              <td style={tbodyRowStyle}>{item.price}</td>
              <td style={tbodyRowStyle}>{item.Supplier}</td>
              <td style={tbodyRowStyle}>{item.Expiry_date}</td>
              <td style={tbodyRowStyle}>
                <button
                  style={buttonStyle}
                  onClick={() => deleteItem(item.id)}
                  onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                  onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
                >
                  Delete
                </button>
                <button
                  style={buttonStyle}
                  onClick={() => displayItem(item.id)}
                  onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                  onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
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

export default displaytable;
