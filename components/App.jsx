import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/createClient';
import styles from './App.module.css'; // Importing styles as a CSS Module
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
    const { data } = await supabase.from('grocery').select('*');
    console.log(data); // Log the data to check if it contains all the fields
    setItems(data);
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
    await supabase.from('grocery').insert({
      Item_name: item.Item_name,
      Category: item.Category,
      Quantity: item.Quantity,
      price: item.price,
      Supplier: item.Supplier,
      Expiry_date: item.Expiry_date,
    });
    fetchItems();
  }

  async function deleteItem(itemID) {
    await supabase.from('grocery').delete().eq('id', itemID);
    fetchItems();
  }

  function displayItem(itemID) {
    const item = items.find((item) => item.id === itemID);
    if (item) {
      setItemToEdit({ ...item });
      setIsEditing(true);
    }
  }

  async function updateItem(itemID) {
    await supabase
      .from('grocery')
      .update({
        Item_name: itemToEdit.Item_name,
        Category: itemToEdit.Category,
        Quantity: itemToEdit.Quantity,
        price: itemToEdit.price,
        Supplier: itemToEdit.Supplier,
        Expiry_date: itemToEdit.Expiry_date,
      })
      .eq('id', itemID);
    fetchItems();
    setIsEditing(false);
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
          required
          className={styles.input} // Using styles from the CSS Module
        />
        <input
          type="text"
          placeholder="Category"
          name="Category"
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Quantity"
          name="Quantity"
          onChange={handleChange}
          min="0"
          required
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          onChange={handleChange}
          step="0.01"
          required
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Supplier"
          name="Supplier"
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="date"
          placeholder="Expiry Date"
          name="Expiry_date"
          onChange={handleChange}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Add Item</button>
      </form>

      {/* Display Table of Items */}
      <DisplayTable items={items} deleteItem={deleteItem} displayItem={displayItem} />

      {/* Edit Item Form */}
      {isEditing && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateItem(itemToEdit.id);
          }}
        >
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
