import React, { useContext } from 'react'
import './item.css'
import { Link } from 'react-router-dom'
import cart_icon from '../Assets/cart_icon.png'
import { ShopContext } from '../../Context/ShopContext'
import Popup from 'reactjs-popup'


const Item = (props) => {

    const {product} = props;
    const {addToCart} = useContext(ShopContext);
  return (
    <div className='item'>
     {props.category === "women" ?(<Link to = {`/product/${props.id}`}><img onClick={() => window.scrollTo(0, 0)} src={props.image}alt="" /></Link>):
    (<img src={props.image}alt="" />)}
          <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">
            ${props.new_price}
        </div>
        <div className="item-price-old">
            ${props.old_price}
        </div>
        <Popup trigger={<div className="add-to-cart">
          <img  onClick={()=>{addToCart(props.id)}} src={cart_icon} alt="" />
      </div>}>
          <div className="added-to-cart">
            <p> Added to cart</p>
          </div>
        </Popup>
      </div>
      
    </div>
  )
}

export default Item
