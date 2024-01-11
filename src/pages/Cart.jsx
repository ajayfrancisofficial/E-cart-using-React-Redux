import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { decQuantity, emptyCart, incQuantity, removeCartItem } from '../Redux/Slices/cartSlice'
import Header from '../components/Header'



function Cart() {
  const cart = useSelector(state => state.cartReducer)
  const [totalCartAmount, setTotalCartAmount] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (cart?.length > 0) {
      setTotalCartAmount(cart?.map(item => item.totalPrice)?.reduce((p1, p2) => p1 + p2))
    }
    else {
      setTotalCartAmount(0)
    }
  }, [cart])

  const handleCheckout = () => {
    alert("Order Successful...Thankyou for shopping with us:)")
    dispatch(emptyCart())
    navigate('/')
  }
  const handleDecrement=(product)=>{
    if(product.quantity==1){
      dispatch(removeCartItem(product.id))
    }
    else{
      dispatch(decQuantity(product))
    }
  }
  return (
      <>
      <Header/>
        <div style={{ paddingTop: '100px' }}>
          {cart?.length > 0 ? <Container className='pt-5'>
            <h1>Cart Summary</h1>
            <Row>
              <Col lg={8}>
                <Table >
                  <thead className='text-white'>
                    <tr >
                      <th className='text-white'>#</th>
                      <th className='text-white'>Product</th>
                      <th className='text-white'>Image</th>
                      <th className='text-white'>Quantity</th>
                      <th className='text-white'>Price</th>
                      <th className='text-white'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cart?.map((product, index) =>
                        <tr key={index}>
                          <td className='text-white'>{index + 1}</td>
                          <td className='text-white'>{product?.title}</td>
                          <td className='text-white'><img width={'60px'} height={'50px'} src={product?.thumbnail} alt="no image" /></td>
                          <td className='text-white'>
                            <div className='d-flex align-items-center'>
                              <button onClick={()=>handleDecrement(product)} className='btn '>-</button>
                              <input style={{ width: "50px" }} type="text" className='form-control' value={product?.quantity} readOnly />
                              <button onClick={()=>dispatch(incQuantity(product))} className='btn '>+</button>
                            </div>
                          </td>
                          <td className='text-white'>$ {product?.totalPrice}</td>
                          <td className='text-white'><button onClick={() => dispatch(removeCartItem(product.id))} className='btn btn-link'><i className="fa-solid fa-trash text-danger"></i></button></td>
                        </tr>)
                    }
                  </tbody>
                </Table>
                <div className='float-end m-3'>
                  <button onClick={() => dispatch(emptyCart())} className='btn btn-danger me-3'>Empty Cart</button>
                  <Link to={'/'} className='btn btn-success'>Shop More</Link>
                </div>
              </Col>
              <Col lg={4}>
                <div className='shadow'>
                  <h5>Total Products: <span className='fw-bolder'> {cart?.length}</span></h5>
                  <h3>Total price: <span className='fw-bolder'> {totalCartAmount}</span></h3>
                  <hr />
                  <div className='text-center mt-4 '>
                    <button onClick={handleCheckout} className='btn btn-success mb-4'>Checkout</button>
                  </div>
    
                </div>
    
              </Col>
            </Row>
    
          </Container> :
            <div className='container w-50 '>
              <img src="https://i.postimg.cc/x1YHjg08/empty-cart-2-removebg-preview.png" alt="Empty Cart" />
              <h1 className='ms-5'>Your Cart is Empty!!!</h1>
            </div>
    
          }
    
        </div>
      </>
     
 )
}

export default Cart