import React, { useState, useContext } from 'react';
import './css/shopcategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';
import search_icon from '../Components/Assets/search_icon.png';

const AllProducts = () => {
  const { all_product } = useContext(ShopContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

  // Filter and sort products
  const filteredProducts = all_product
    .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === 'priceAsc') {
        return a.new_price - b.new_price;
      } else if (sortOption === 'priceDesc') {
        return b.new_price - a.new_price;
      } else {
        return 0;
      }
    });

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className='shop-category'>
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {filteredProducts.length}</span> out of {all_product.length} products
        </p>
        <div className="search">
          <input
            type='text'
            placeholder='Search products...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
        </div>
        <div className="shopcategory-sort">
          Sort by
          <select value={sortOption} onChange={handleSortChange}>
            <option value="">Select Option</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="shopcategory-products">
        {filteredProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
            category={item.category}
          />
        ))}
      </div>
      <div className="shopcategory-loadmore">
        Explore more
      </div>
    </div>
  );
};

export default AllProducts;
