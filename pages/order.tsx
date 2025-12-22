import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Axios for HTTP requests
import Header from '../components/header'; // Import header component

const Order: React.FC = () => {
  const [items, setItems] = useState<any[]>([]); // Stores all items
  const [orderItem, setOrderItem] = useState<any | null>(null); // Stores item details based on ID search
  const [itemId, setItemId] = useState<string>(''); // Stores the entered ID
  const [quantity, setQuantity] = useState<number>(0); // Stores quantity entered by user
  const [totalPrice, setTotalPrice] = useState<number>(0); // Calculates total price

  useEffect(() => {
    // Fetch all items from the Flask backend
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/items'); // Replace with your Flask backend URL
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleItemIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemId(event.target.value);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const qty = parseInt(event.target.value);
    setQuantity(qty);
    if (orderItem) {
      setTotalPrice(orderItem.price * qty); // Update total price based on quantity
    }
  };

  const handleSearchItem = () => {
    // Find item by ID
    const item = items.find((item) => item.id === parseInt(itemId));
    if (item) {
      setOrderItem(item); // Set item details if found
      setTotalPrice(item.price * quantity); // Set initial total price
    } else {
      setOrderItem(null);
      alert('Item ID does not exist.');
    }
  };

  const handlePlaceOrder = async () => {
    if (orderItem && quantity > 0) {
      try {
        // Update the item's quantity in PostgreSQL via Flask backend
        const updatedQuantity = orderItem.Quantity - quantity;

        if (updatedQuantity <= 0) {
          // If quantity is 0 or less, delete the item
          await axios.delete(`http://127.0.0.1:5000/api/items/${orderItem.id}`);
        } else {
          // Otherwise, update the quantity
          await axios.put(`http://127.0.0.1:5000/api/items/${orderItem.id}`, {
            Quantity: updatedQuantity,
          });
        }

        alert('Order placed successfully!');
        
        // Reset form
        setOrderItem(null);
        setItemId('');
        setQuantity(0);
        setTotalPrice(0);

        // Refresh the page after order is placed
        window.location.reload();
      } catch (error) {
        console.error('Error placing order:', error);
      }
    }
  };

  const handleCancelOrder = () => {
    // Reset form and cancel order
    setOrderItem(null);
    setItemId('');
    setQuantity(0);
    setTotalPrice(0);
  };

  return (
    <div style={{ paddingTop: '100px', fontFamily: 'Arial, sans-serif', backgroundColor: '#FAF3DC' }}>
      <Header /> {/* Import and render the Header */}

      {/* Table showing all available items */}
      <div style={{ padding: '20px' }}>
        <h2 style={{ color: '#2E7D32' }}>Available Items</h2>
        <table style={{ width: '100%', border: '1px solid #ddd', borderCollapse: 'collapse', backgroundColor: '#f9f9f9' }}>
          <thead>
            <tr>
              <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Item Name</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Category</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Quantity</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Price</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Supplier</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td style={{ padding: '10px', textAlign: 'left' }}>{item.id}</td>
                <td style={{ padding: '10px', textAlign: 'left' }}>{item.Item_name}</td>
                <td style={{ padding: '10px', textAlign: 'left' }}>{item.Category}</td>
                <td style={{ padding: '10px', textAlign: 'left' }}>{item.Quantity}</td>
                <td style={{ padding: '10px', textAlign: 'left' }}>₹{item.price}</td> {/* Changed to ₹ */}
                <td style={{ padding: '10px', textAlign: 'left' }}>{item.Supplier}</td>
                <td style={{ padding: '10px', textAlign: 'left' }}>{item.Expiry_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Input box for searching item by ID */}
      <div style={{ padding: '20px', marginTop: '30px' }}>
        <h2 style={{ color: '#2E7D32' }}>Search Item by ID</h2>
        <input
          type="text"
          value={itemId}
          onChange={handleItemIdChange}
          placeholder="Enter Item ID"
          style={{ padding: '10px', width: '200px', marginRight: '10px' }}
        />
        <button
          onClick={handleSearchItem}
          style={{
            padding: '10px 20px',
            backgroundColor: '#388E3C',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </div>

      {/* Display item details and allow user to enter quantity */}
      {orderItem && (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', maxWidth: '600px', margin: '20px auto' }}>
          <h3 style={{ color: '#388E3C' }}>Item Details</h3>
          <p><strong>Item Name:</strong> {orderItem.Item_name}</p>
          <p><strong>Supplier:</strong> {orderItem.Supplier}</p>
          <p><strong>Expiry Date:</strong> {orderItem.Expiry_date}</p>
          <p><strong>Price per item:</strong> ₹{orderItem.price}</p> {/* Changed to ₹ */}

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#388E3C' }}>Enter Quantity:</h4>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max={orderItem.Quantity}
              style={{ padding: '10px', width: '150px' }}
            />
            <p style={{ marginTop: '10px' }}><strong>Total Price:</strong> ₹{totalPrice}</p> {/* Changed to ₹ */}
          </div>

          <div style={{ marginTop: '20px' }}>
            <button
              onClick={handlePlaceOrder}
              style={{
                padding: '10px 20px',
                backgroundColor: '#388E3C',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '20px',
              }}
            >
              Place Order
            </button>
            <button
              onClick={handleCancelOrder}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f44336',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
