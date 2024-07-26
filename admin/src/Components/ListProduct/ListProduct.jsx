import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({ id: '', name: '', old_price: '', new_price: '', category: '' });

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => { setAllProducts(data); });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    await fetchInfo();
  };

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setEditForm({ id: product.id, name: product.name, old_price: product.old_price, new_price: product.new_price, category: product.category });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const saveEdit = async () => {
    await fetch('http://localhost:4000/editproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editForm),
    });
    setEditingProduct(null);
    await fetchInfo();
  };

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='listproduct'>
      <h1>All Products List</h1>
      <input
        type='text'
        placeholder='Search products...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='listproduct-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Edit</p>
        <p>Remove</p>
      </div>
      <div className='listproduct-allproducts'>
        <hr />
        {filteredProducts.map((product, index) => (
          <div key={index} className='listproduct-format-main listproduct-format'>
            <img src={product.image} alt='' className='listproduct-product-icon' />
            {editingProduct === product.id ? (
              <>
                <input type='text' name='name' value={editForm.name} onChange={handleEditChange} />
                <input type='text' name='old_price' value={editForm.old_price} onChange={handleEditChange} />
                <input type='text' name='new_price' value={editForm.new_price} onChange={handleEditChange} />
                <select type='text' name='category' value={editForm.category} onChange={handleEditChange} >
                <option value="clothing">Clothing</option>
                <option value="grocery">Grocery</option>
                <option value="sweets">Sweets</option>
                <option value="surprize">Surprize</option>
               </select>
                <div className='edit-buttons'>
                  <button onClick={saveEdit}>Save</button>
                  <button onClick={() => setEditingProduct(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <img onClick={() =>{
                   if(window.confirm("Are you sure you want to delete the product?")){
                    removeProduct(product.id)
                  }
                } }className='listproduct-remove-icon' src={cross_icon} alt='' />
              </>
            )}
          </div>
        ))}
        <hr />
      </div>
    </div>
  );
};

export default ListProduct;
