// /pages/index.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/createClient'; // Import the supabase client
import DisplayTable from '../components/displaytable'; // Import the DisplayTable component
import styles from '../styles/displaytable.module.css'; // Import styles

const Index = () => {
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

  // Fetch items from Supabase
  async function fetchItems() {
    const { data } = await supabase.from('grocery').select('*');
    setItems(data);
  }

  // Handle input change for new items
  function handleChange(event) {
    setItem((prevItem) => ({
      ...prevItem,
      [event.target.name]: event.target.value,
    }));
  }

  // Handle input change for edited items
  function handleEditChange(event) {
    setItemToEdit((prevItem) => ({
      ...prevItem,
      [event.target.name]: event.target.value,
    }));
  }

  // Create new item in Supabase
  async function createItem() {
    await supabase.from('grocery').insert([{
      Item_name: item.Item_name,
      Category: item.Category,
      Quantity: item.Quantity,
      price: item.price,
      Supplier: item.Supplier,
      Expiry_date: item.Expiry_date,
    }]);
    fetchItems();
  }

  // Delete an item
  async function deleteItem(itemID) {
    await supabase.from('grocery').delete().eq('id', itemID);
    fetchItems();
  }

  // Display item in edit form
  function displayItem(itemID) {
    const item = items.find((item) => item.id === itemID);
    if (item) {
      setItemToEdit({ ...item });
      setIsEditing(true);
    }
  }

  // Update an item
  async function updateItem() {
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
      .eq('id', itemToEdit.id);  // Use the itemToEdit.id for the correct record
    fetchItems();
    setIsEditing(false);
  }

  // Close the edit form
  function closeEditForm() {
    setIsEditing(false);
  }

  return (
    <div className={styles.container}>
      {/* Create Item Form */}
      <form onSubmit={(e) => {
        e.preventDefault();
        createItem();
      }}>
        <input type="text" placeholder="Item Name" name="Item_name" onChange={handleChange} required />
        <input type="text" placeholder="Category" name="Category" onChange={handleChange} required />
        <input type="number" placeholder="Quantity" name="Quantity" onChange={handleChange} min="0" required />
        <input type="number" placeholder="Price" name="price" onChange={handleChange} step="0.01" required />
        <input type="text" placeholder="Supplier" name="Supplier" onChange={handleChange} required />
        <input type="date" placeholder="Expiry Date" name="Expiry_date" onChange={handleChange} required />
        <button type="submit">Add Item</button>
      </form>

      {/* Display Table of Items */}
      <DisplayTable items={items} deleteItem={deleteItem} displayItem={displayItem} />

      {/* Edit Item Form */}
      {isEditing && (
        <form onSubmit={(e) => {
          e.preventDefault();
          updateItem(itemToEdit.id);  // Call updateItem without the ID as it's already inside itemToEdit
        }}>
          <input type="text" value={itemToEdit.Item_name} name="Item_name" onChange={handleEditChange} required />
          <input type="text" value={itemToEdit.Category} name="Category" onChange={handleEditChange} required />
          <input type="number" value={itemToEdit.Quantity} name="Quantity" onChange={handleEditChange} min="0" required />
          <input type="number" value={itemToEdit.price} name="price" onChange={handleEditChange} step="0.01" required />
          <input type="text" value={itemToEdit.Supplier} name="Supplier" onChange={handleEditChange} required />
          <input type="date" value={itemToEdit.Expiry_date} name="Expiry_date" onChange={handleEditChange} required />
          <button type="submit">Update</button>
          <button type="button" onClick={closeEditForm}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default Index;
