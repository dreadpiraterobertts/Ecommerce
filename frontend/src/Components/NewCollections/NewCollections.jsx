import React, { useEffect, useState } from 'react'
import './newcollections.css'
import Item from '../Item/Item'
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const NewCollections = () => {

  const[new_collection,setNew_collection] = useState([])

  useEffect(()=>{
    fetch(`${backendUrl}/newcollection`)
    .then((response)=>response.json())
    .then((data)=>setNew_collection(data))
  },[])

  return (
    <div className='newcollections'>
       <h1>NEW COLLECTIONS</h1>
       <hr />
       <div className="collections">
            {new_collection.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
       </div>
    </div>
  )
}

export default NewCollections
