import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavigateToNextPage, NavigateToPrevPage, fetchProducts } from '../Redux/Slices/productSlice';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function Home() {
  const dispatch = useDispatch()

  const { allProducts, loading, error, productsPerPage, currentPage } = useSelector(state => state.productReducer)
  const totalPages = Math.ceil(allProducts?.length / productsPerPage)
  const lastProductIndex = currentPage * productsPerPage
  const firstProductIndex= lastProductIndex-productsPerPage
  const visibleProductsCard=allProducts?.slice(firstProductIndex,lastProductIndex)


  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
const handlePrevPage=()=>{
  if(currentPage!=1){
    dispatch(NavigateToPrevPage())
  }
}
const handleNextPage=()=>{
    if(currentPage!=totalPages){
      dispatch(NavigateToNextPage())
    }
}

  return (

    <>
      <Header insideHome />
      <div style={{ paddingTop: '100px' }}>

        {
          loading ? <div className='text-center m-3'>
            <Spinner animation="border" variant="warning" />loading......
          </div> :
            <Row className='m-5'>
              {allProducts?.length > 0 ? visibleProductsCard.map((product, index) => (
                <Col key={index} className='mb-3 ' sm={12} md={6} lg={4} xl={3}>
                  <Card className='shadow-lg' style={{ width: '18rem' }}>
                    <Card.Img variant="top" height={"200px"} src={product?.thumbnail} />
                    <Card.Body>
                      <Card.Title>{product?.title.slice(0, 30)}...</Card.Title>
                      <Link to={`/view/${product?.id}`} className='btn btn-success ' variant="primary">View More</Link>
                    </Card.Body>
                  </Card>
                </Col>)
              ) :
                <div className='fw-bolder text-center m-5 fs-4 text-danger'>Product Not Found!!!</div>
              }
            </Row>
        }
        <div className='d-flex justify-content-center'>
          <button onClick={handlePrevPage} className='btn'><i className='fa-solid fa-backward '></i></button>
          <span className='fw-bolder mt-2'> {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} className='btn'><i className='fa-solid fa-forward '></i></button>

        </div>
      </div>
    </>

  )
}

export default Home