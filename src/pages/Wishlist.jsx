import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { removeFromWishlist } from '../Redux/Slices/wishlistSlice';
import { addToCart } from '../Redux/Slices/cartSlice';
import Header from '../components/Header';


function Wishlist() {
  const wishlist =useSelector(state=>state.wishlistReducer)
  const dispatch=useDispatch()
  // console.log(wishlist);
  const handleCart=(product)=>{
    dispatch(removeFromWishlist(product.id))
    dispatch(addToCart(product))
  }
  return (
   <>
   <Header/>
      <div style={{ paddingTop: '70px' }}>
       <div className='container'>
          <Row className='m-3'>
            {wishlist?.length>0?wishlist?.map((product,index)=>(
            <Col key={index} className='m-1' sm={12} md={6} lg={4} xl={3}>
            <Card className='shadow' style={{ width: '18rem' }}>
          <Card.Img height={'200px'} variant="top" src={product.thumbnail}/>
          <Card.Body>
            <Card.Title>{product.title.slice(0,20)}...</Card.Title>
            <div className='d-flex justify-content-between'>
              <button onClick={()=>dispatch(removeFromWishlist(product.id))} className='btn btn-link'><i className='fa-solid fa-heart-circle-minus text-danger'></i></button>
              <button onClick={()=>handleCart(product)} className='btn btn-link'><i className='fa-solid fa-cart-plus text-success'></i></button>
  
            </div>
          </Card.Body>
        </Card>
            </Col>))
            :
            <div className='container w-50 '>
              <img  src="https://i.postimg.cc/x1YHjg08/empty-cart-2-removebg-preview.png" alt="Empty Cart" />
              <h1 className='ms-5'>Your WishList is Empty!!!</h1>
              </div>
            }
          
          </Row>
       </div>
      </div>
   </>
  
  )
}

export default Wishlist