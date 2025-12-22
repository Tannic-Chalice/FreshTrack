import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import styles from './App.module.css';
import DisplayTable from './displaytable1';

const App = () => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({
    Item_name: '',
    Category: '',
    Quantity: '',
    price: '',
    Supplier: '',
    Expiry_date: '',
  });

  const [itemToEdit, setItemToEdit] = useState({
    id: '',
    Item_name: '',
    Category: '',
    Quantity: '',
    price: '',
    Supplier: '',
    Expiry_date: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const response = await axios.get('http://localhost:5000/api/items'); // Update URL to your Flask API
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
      alert('Failed to fetch items');
    }
  }

  function handleChange(event) {
    setItem((prevItem) => ({
      ...prevItem,
      [event.target.name]: event.target.value,
    }));
  }

  function handleEditChange(event) {
    setItemToEdit((prevItem) => ({
      ...prevItem,
      [event.target.name]: event.target.value,
    }));
  }

  async function createItem() {
    try {
      const response = await axios.post('http://localhost:5000/api/items', item); // POST request to create item
      fetchItems(); // Reload the items after creation
      setItem({ Item_name: '', Category: '', Quantity: '', price: '', Supplier: '', Expiry_date: '' });
    } catch (error) {
      console.error('Error creating item:', error);
      alert('Failed to create item');
    }
  }

  async function deleteItem(itemID) {
    try {
      await axios.delete(`http://localhost:5000/api/items/${itemID}`); // DELETE request to remove item
      fetchItems(); // Reload the items after deletion
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  }

  async function updateItem(itemID) {
    try {
      await axios.put(`http://localhost:5000/api/items/${itemID}`, itemToEdit); // PUT request to update item
      fetchItems(); // Reload the items after update
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to update item');
    }
  }

  function closeEditForm() {
    setIsEditing(false);
  }

  return (
    <div className={styles.container}>
      {/* Create Item Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createItem();
        }}
      >
        <input
          type="text"
          placeholder="Item Name"
          name="Item_name"
          onChange={handleChange}
          value={item.Item_name}
          required
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Category"
          name="Category"
          onChange={handleChange}
          value={item.Category}
          required
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Quantity"
          name="Quantity"
          onChange={handleChange}
          value={item.Quantity}
          min="0"
          required
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          onChange={handleChange}
          value={item.price}
          step="0.01"
          required
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Supplier"
          name="Supplier"
          onChange={handleChange}
          value={item.Supplier}
          required
          className={styles.input}
        />
        <input
          type="date"
          placeholder="Expiry Date"
          name="Expiry_date"
          onChange={handleChange}
          value={item.Expiry_date}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Add Item</button>
      </form>

      {/* Display Table of Items */}
      <DisplayTable items={items} deleteItem={deleteItem} displayItem={setItemToEdit} />

      {/* Edit Item Form */}
      {isEditing && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateItem(itemToEdit.id);
          }}
        >
          {/* Same fields as Create Form, but using itemToEdit values */}
          <input
            type="text"
            value={itemToEdit.Item_name}
            name="Item_name"
            onChange={handleEditChange}
            required
            className={styles.input}
          />
          <input
            type="text"
            value={itemToEdit.Category}
            name="Category"
            onChange={handleEditChange}
            required
            className={styles.input}
          />
          <input
            type="number"
            value={itemToEdit.Quantity}
            name="Quantity"
            onChange={handleEditChange}
            min="0"
            required
            className={styles.input}
          />
          <input
            type="number"
            value={itemToEdit.price}
            name="price"
            onChange={handleEditChange}
            step="0.01"
            required
            className={styles.input}
          />
          <input
            type="text"
            value={itemToEdit.Supplier}
            name="Supplier"
            onChange={handleEditChange}
            required
            className={styles.input}
          />
          <input
            type="date"
            value={itemToEdit.Expiry_date}
            name="Expiry_date"
            onChange={handleEditChange}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Update</button>
          <button type="button" onClick={closeEditForm} className={styles.button}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default App;
