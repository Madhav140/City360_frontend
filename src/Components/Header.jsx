import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../Images/logo.png'
import { Link } from 'react-router-dom';

function Header() {
    
  const admin = sessionStorage.getItem("admin")
  const user = sessionStorage.getItem("existinguser")
  const worker = sessionStorage.getItem("existingworker")

  return (
    <>
 <Navbar  expand="lg" className="shadow" style={{backgroundColor:'#1E2761'}}>
      <Container fluid>
        <Navbar.Brand>
       <div className='d-flex align-items-center justify-content-center' style={{width:'400px',border:"3px solid #EFDBCB",borderRadius:'50px' }}>
          <img src={logo} height={'100px'}  alt="" />
           <span style={{color:"#408EC6",marginLeft:'8px',fontSize:'60px'}}>CITY <span style={{color:" #7A2048"}}>360</span></span>
       </div>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mt-4"
            style={{ maxHeight: '100px',marginLeft:'50px'}}
            navbarScroll
          >
            <Nav.Link><Link to={'/'} className='fs-4' style={{color:"#EFDBCB",textDecoration:'none'}} >Home</Link></Nav.Link>
            <Nav.Link><Link to={user?'/userpage':'/login'} style={{color:"#EFDBCB",textDecoration:'none'}} className='fs-4 ms-1'>UserPage</Link></Nav.Link>
            <Nav.Link><Link to={admin?'/adminpage':'/adminLogin'} className='fs-4 ms-1' style={{color:"#EFDBCB",textDecoration:'none'}} >Admin</Link></Nav.Link>
            <Nav.Link><Link to={worker?'/workerpage':'/workerLogin'} className='fs-4 ms-1' style={{color:"#EFDBCB",textDecoration:'none'}} >WorkerPage</Link></Nav.Link>

            <Nav.Link><Link to={'/login'}><Button variant="outline-info" style={{marginLeft:"320px"}} size="md"><i class="fa-solid fa-right-to-bracket fa-fade me-1"></i> Login</Button></Link></Nav.Link>
            <Nav.Link><Link to={'/register'}><Button variant="outline-info" size="md"><i class="fa-solid fa-user-plus fa-fade me-2"></i>Sign Up</Button></Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header