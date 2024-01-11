import { Badge, Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchByProduct } from '../Redux/Slices/productSlice'

function Header({ insideHome }) {
  const wishlist = useSelector(state => state.wishlistReducer)
  const cart = useSelector(state => state.cartReducer)
  const dispatch=useDispatch()
  return (
    <Navbar style={{ zIndex: 1 }} expand="lg" className="bg-body-tertiary w-100 position-fixed">
      <Container>
        <Link to={'/'} style={{ textDecoration: 'none' }}><i class="fa-solid fa-cart-shopping me-2 fs-3"></i> <Navbar.Brand>E-Cart</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {insideHome && <Nav.Link className='mx-3'> <input onChange={(e)=>dispatch(searchByProduct(e.target.value.toLowerCase()))} style={{ width: '250px' }}
              placeholder='Search Products Here!' type="text " className='form-control rounded' /></Nav.Link>}
            <Nav.Link className='mx-3'><Link to={'/wishlist'} style={{ textDecoration: 'none' }}><i class="fa-solid fa-heart me-1" style={{ color: "#ec416c" }}></i>Wishlist <Badge>{wishlist?.length}</Badge></Link></Nav.Link>
            <Nav.Link className='mx-3'><Link to={'/cart'} style={{ textDecoration: 'none' }}><i class="fa-solid fa-cart-shopping me-1" style={{ color: "#ec416c" }}></i>Cart  <Badge>{cart?.length}</Badge></Link></Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header