import React, { useContext } from 'react';
import './cartitems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import CheckoutButton from './CheckOutButton';

const CartItems = () => {
    const { getTotalAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

  // Function to collect cart information
  const collectCartInfo = () => {
    return all_product
      .filter(product => cartItems[product.id] > 0)
      .map(product => ({
        id: product.id,
        name: product.name,
        quantity: cartItems[product.id],
        price: product.new_price,
      }));
  };

  const cartInfo = collectCartInfo();

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return <div>
                        <div className="cartitems-format cartitems-format-main">
                            <img className='carticon-product-icon' src={e.image} alt="" />
                            <p>{e.name}</p>
                            <p>${e.new_price}</p>
                            <p className='cartitems-quantity'>{cartItems[e.id]}</p>
                            <p>${e.new_price * cartItems[e.id]}</p>
                            <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
                        </div>
                        <hr />
                    </div>
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalAmount()}</h3>
                        </div>
                    </div>
                    <CheckoutButton totalAmount={getTotalAmount() } cartInfo={cartInfo}/>
                </div>
           
            </div>
        </div>
    )
}

export default CartItems;
