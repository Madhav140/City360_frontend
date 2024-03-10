import React from 'react'
import {Link}from 'react-router-dom'
import './foot.css';

function Footer() {

 
  return (
  <>
     <div>
       <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <h6> <span className='fs-1 fw-bolder' style={{color:"#408EC6"}}>CITY <span style={{color:" #7A2048"}}>360</span></span></h6>
              <p className="text-justify">City 360 is a groundbreaking project that revolutionizes the way we access essential household services such as electricians and plumbing by bringing them online. This innovative platform seamlessly connects residents with a network of skilled and reliable service providers, creating a comprehensive solution for all home-related needs.</p>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6 className='fs-4'>GUIDES</h6>
              <ul className="list-unstyled">
              <li>
                <Link to={'https://react.dev/'} style={{ textDecoration: "none", color: "white" }}>React</Link>
              </li>
              <li>
                <Link to={'https://react-bootstrap.netlify.app/'} style={{ textDecoration: "none", color: "white" }}>React Bootstrap</Link>
              </li>
              <li>
                <Link to={'https://bootswatch.com/'} style={{ textDecoration: "none", color: "white" }}>Bootswatch</Link>
              </li>
            </ul>
             
             
            </div>

            <div className="col-xs-6 col-md-3">
              <h6 className='fs-4'>Quick Links</h6>
              <ul className="list-unstyled ">
              <li>
                <Link to={'/'} style={{ textDecoration: "none", color: "white" }}>Landing Page</Link>
              </li>
              <li>
                <Link to={'/home'} style={{ textDecoration: "none", color: "white" }}>Home page</Link>
              </li>
              <li>
                <Link to={'/login'} style={{ textDecoration: "none", color: "white" }}>Login</Link>
              </li>
             
            </ul>
              
            </div>
          </div>
          <hr />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">Copyright &copy; 2024 All Rights Reserved </p>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
                <li><a className="facebook" href="#"><i class="fa-brands fa-instagram "></i></a></li>
                <li><a className="twitter" href="#"><i class="fa-brands fa-twitter "></i></a></li>
                <li><a className="dribbble" href="#"><i class="fa-brands fa-linkedin-in"></i></a></li>
                <li><a className="linkedin" href="#"><i class="fa-brands fa-facebook "></i></a></li>   
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>

   </>
  )
}

export default Footer