import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { addToWishlist } from '../Redux/Slices/wishlistSlice';
import { addToCart } from '../Redux/Slices/cartSlice';
import Header from '../components/Header';

function View() {
  const { id } = useParams()
  // console.log(id);
  const [product, setProduct] = useState({})
  const wishlist=useSelector(state=>state.wishlistReducer)
  const dispatch=useDispatch()
  useEffect(() => {
    const allProducts = JSON.parse(sessionStorage.getItem("allProducts"))
    setProduct(allProducts?.find(item => item.id == id))
  }, [])
  const handleWishlist=(product)=>{
    const existingProduct=wishlist?.find(item=>item.id==product.id)
    if(existingProduct){
      alert("Product already in WishList")
    }
    else{
      dispatch(addToWishlist(product))
    }
  }
  // console.log(wishlist);
  return (
   <>
   <Header/>
      <div style={{ paddingTop: '100px' }}>
        <Row>
          <Col>
      <img height={'400px'} src={product?.thumbnail} alt="" />
          </Col>
          <Col >
          <h4>Product ID: {product?.id}</h4>
            <h1 style={{color:"white"}}>{product.title}</h1>
            <p style={{textAlign:'justify'}} className='fw-bolder'>{product?.description}</p>
            <h4>$ {product?.price}</h4>
          <div className='d-flex justify-content-between mt-5 me-5'>
              <button onClick={()=>handleWishlist(product)} className='btn btn-success me-2' ><i className='fa-solid fa-heart text-danger me-2'></i>Add to WishList</button>
              
              <button onClick={()=>dispatch(addToCart(product))} className='btn btn-success '><i className='fa-solid fa-cart-plus text-tertiary me-2'></i>Add to Cart</button>
    
          </div>
          </Col>
        </Row>
  
  
      </div>
   </>
  
  )
}

export default View