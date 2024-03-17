import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import work from '../Images/img.png'
import work1 from '../Images/img3.png'
import work2 from '../Images/img1.png'
import friends from '../Images/friends.png'
import banner from '../Images/banner.jpg'
import money from '../Images/money.png'
import productivity from '../Images/productivity.png'
import potrait from '../Images/portrait.png'
import './Home.css'
import AOS from "aos";
import "aos/dist/aos.css";
import Jobcards from '../Components/Jobcards';
import { Link } from 'react-router-dom';
AOS.init();


function Home() {

  return (
    <>
      <Carousel>
        <Carousel.Item>
          <div className='w-100' style={{ height: "800px", background: 'linear-gradient(to bottom, #1E2761, #408EC6)' }}>
            <div className='row'>
              <div className="col-6 mt-5" data-aos="fade-right"
                data-aos-easing="linear"
                data-aos-duration="1300">
                <div className='d-flex flex-column align-items-center justify-content-center mt-5'>
                  <h1 style={{ color: '#C0D7FB', fontFamily: "poppins", fontSize: '80px' }} className='text-center mt-4'>Empowering Homes</h1>
                  <h1 style={{ color: '#C0D7FB', fontFamily: "poppins", fontSize: '80px' }} className='text-center mt-1'>Connecting Lives</h1>

                  <h2 style={{ color: '#C0D7FB', fontFamily: "poppins" }} className='text-center'> City 360 - where services meet simplicity.</h2>
                  <div className='w-75 mt-5'> <h3 style={{ color: 'white', fontFamily: "poppins", textAlign: 'justify' }}>Welcome to City 360, your all-in-one destination for revolutionizing the way you manage household services. In the bustling landscape of modern living, we understand the challenges of balancing work, family, and maintaining a home. City 360 is here to simplify your life by bringing a comprehensive array of household services right to your fingertips.</h3></div>
                </div>
              </div>

              <div className="col-6 d-flex align-items-center justify-content-center mt-5" data-aos="fade-left"
                data-aos-easing="linear"
                data-aos-duration="1300">
                <img src={work} height={'550px'} className='mt-5 me-5' alt="" />

              </div>
            </div>
          </div>
        </Carousel.Item> 
        <Carousel.Item>
          <div className='w-100' style={{ height: "800px", background: 'linear-gradient(to bottom, #1E2761, #408EC6)' }}>
            <div className='row'>
              <div className="col-6 mt-4">
                <div className='d-flex flex-column align-items-center justify-content-center mt-5'>
                  <h1 style={{ color: '#C0D7FB', fontFamily: "poppins", fontSize: '63px' }} className='text-center mt-5 ms-5' >Electricians,Plumber,Masons or Cleaning Services....</h1>
                  <h2 style={{ color: '#C0D7FB', fontFamily: "poppins", fontSize: '40px' }} className='text-center mt-2'>Be it any Services you want</h2>
                  <div className='w-75 mt-5'> <h3 style={{ color: 'white', fontFamily: "poppins", textAlign: 'justify' }}>City 360 seamlessly connects you to a network of trusted service providers, ensuring that your home receives the care it deserves. From plumbing and electrical services to cleaning and maintenance, we've curated a diverse range of offerings to cater to your every need.</h3></div>
                </div>

              </div>

              <div className="col-6 d-flex align-items-center justify-content-center">
                <img src={work1} height={'700px'} className='me-5 mb-1' alt="" />

              </div>
            </div>
          </div>
        </Carousel.Item>
       <Carousel.Item>
          <div className='w-100' style={{ height: "800px", background: 'linear-gradient(to bottom, #1E2761, #408EC6)' }}>
            <div className='row'>
              <div className="col-6">
                <div className='d-flex flex-column align-items-center justify-content-center mt-4'>
                  <h1 style={{ color: '#C0D7FB', fontFamily: "poppins", fontSize: '70px' }} className='text-center mt-5 mb-5' >Register as User or Worker..</h1>
                  <div className='w-75'>
                    <h2 style={{ color: 'white', fontFamily: "poppins", textAlign: 'left' }}>Joining City 360 as a <span className='text-warning'>USER</span> is a straightforward and secure process designed to provide you with quick access to a world of household services and book any services you need</h2>
                    <h2 style={{ color: 'white', fontFamily: "poppins", textAlign: 'left' }} className='mt-4' >Joining City 360 as a <span className='text-warning'>WORKER</span> lets you connect with users seeking your expertise.</h2>
                  </div>
                </div>

              </div>
              <div className="col-6 d-flex align-items-center justify-content-center">
                <img src={work2} height={'570px'} className='me-5 mt-3' alt="" />

              </div>
            </div>
          </div>
        </Carousel.Item> 
      </Carousel>

      <Jobcards />


      <div className='mt-5'>
        <div style={{
          width: '100%',
          height: '500px',
          backgroundImage: `url(${banner})`,
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>

          <div style={{ marginRight: '50px', width: '700px', height: '160px', backgroundColor: '#ffc400', borderRadius: '50px' }} className='p-4 d-flex'>
            <h1 className='mt-4'>  <i class="fa-solid fa-mobile-screen-button fa-2xl"></i></h1>
            <div className='d-flex flex-column ms-3'>
              <h3 className='text-center'>Get a better City360 experience on mobile</h3>
              <h4>Download the City360 app now!</h4>
              
             <div className='d-flex'>
               
                  <div style={{ height: '50px', width: '200px', backgroundColor: 'black', borderRadius: '10px' }} className='d-flex justify-content-center align-items-center'>
                    <h6 className='me-3'><i class="fa-brands fa-apple text-white fa-2xl" ></i></h6>
                    <div className='d-flex flex-column'>
                     <h6 className='text-light mt-2 mb-0'>Download on the</h6>
                     <h5 className='text-light mb-2'>App Store</h5>
                    </div>
                </div>
  
                <div style={{ height: '50px', width: '200px', backgroundColor: 'black', borderRadius: '10px'}} className='d-flex justify-content-center align-items-center ms-3'>
                    <h6 className='me-3'><i class="fa-brands fa-google-play text-white fa-xl" ></i></h6>
                    <div className='d-flex flex-column'>
                     <h6 className='text-light mt-2 mb-0'>Download on the</h6>
                     <h5 className='text-light mb-2 mt-0'>Play Store</h5>
                    </div>
                </div>
             </div>


            </div>

          </div>

          <div className='ms-3 referal'>
            <img style={{ position: 'absolute', top: '40%', left: '9%', transform: 'translate(-50%, -50%)', zIndex: '1',width:'120px' }} src={friends} alt="" />
            <h4 style={{ position: 'absolute', top: '30%', left: '61%', transform: 'translate(-50%, -50%)', zIndex: '1', color: '#fff',textAlign:'left',width:'580px' }}>Tell your friends about City360 and earn cashback and other benefits. Earn upto 750 coins for each referral!!</h4>

            <div style={{ height: '40px', width: '150px', backgroundColor: '#ffc400', borderRadius: '10px',position: 'absolute', top: '75%', left: '25%', transform: 'translate(-50%, -50%)', zIndex: '1'}} className='d-flex justify-content-center align-items-center ms-3'>
                     <h4 className='text-dark text-center mt-1'>Refer Now!</h4>
                   
                </div>
          </div>
        </div>
      </div>




      <div className='row w-100'  style={{height:'600px'}}>
        
          <div className='col-8 d-flex justify-content-center align-items-center flex-column p-5'>
                <div style={{height:"135px",width:'60rem',border:'5px solid #ffc400'}} className='p-3 d-flex justify-content-between mb-5 ms-2'>
                  <div>
                    <h3>ARE YOU A SERVICE EXPERT?</h3>
                   <h4>JOIN WORLDS LARGEST SERVICE NETWORK</h4>
                   <h5>ALREADY A PARTNER? PLEASE <Link  to={'/workerLogin'}>LOGIN</Link></h5>

                  </div> 
<Link to={'/worker/register'}  >
    <button className='btn text-warning mt-2' style={{float:'right',backgroundColor:'#031f50',height:'60px',width:'200px',fontSize:'19px'}}>Register as a Partner</button>
</Link>   
    </div>

                <div className='d-flex mb-4'>
                   <img height={'75px'} className='me-3' src={money} alt="" /> 
                   <div className='d-flex flex-column'>
                     <h4>INCREASE YOUR EARNINGS</h4>
                     <h5>With City360, you do more than your usual jobs, and earn more. No more bargaining with your customers!</h5>
                   </div>
                </div>

                <div className='d-flex mb-4 me-5'>
                   <img height={'75px'} className='me-3' src={productivity} alt="" /> 
                   <div className='d-flex flex-column'>
                     <h4>IMPROVE PRODUCTIVITY</h4>
                     <h5>You get jobs near to your location, travel less, thereby saving time and money. You get more jobs too!</h5>
                   </div>
                </div>

                <div className='d-flex me-5'>
                 <h2 className='text-warning mt-2'> <i class="fa-solid fa-users fa-2xl"></i></h2>
                   <div className='d-flex flex-column ms-3'>
                     <h4>LARGE CUSTOMER BASE</h4>
                     <h5>With us, you are visible to a much larger customer base, without any marketing costs.We do it for you!</h5>
                   </div>
                </div>

            </div> 
            <div className='col-4 d-flex justify-content-center align-items-end flex-column'>
              <img className='ms-5' height={'600px'} src={potrait} alt="" />
             </div>
      </div>


      <div className='p-5' style={{height:'400px',backgroundColor:'#eceeee',width:'100%'}}>
       
            <h2 className='fw-bolder ms-5'>Why City360?</h2> 
            <div className='d-flex align-items-center justify-content-center'>
                
                <div className='d-flex justify-content-between align-items-center mt-4' style={{width:'100rem'}}>
  
                 <div className='d-flex flex-column mt-5'>
                <h1> <i class="fa-regular fa-calendar-days fa-2xl ms-4"></i></h1>
                 <h5  className='mt-3 fw-bolder'>ON DEMAND/ <br/> <h5 style={{fontWeight:'bold'}}>Scheduled</h5>  </h5>
                 </div>
  
                 <div className='d-flex flex-column mt-5'>
                <h1> <i class="fa-solid fa-user-check fa-2xl ms-5"></i></h1>
                 <h5 className='mt-3 fw-bolder'>VERIFIED PARTNERS</h5>
                 </div>
  
                 <div className='d-flex flex-column mt-5'>
                <h1> <i class="fa-solid fa-shield fa-2xl ms-5"></i></h1>
                 <h5 className='mt-3 fw-bolder'>SERVICE WARRANTY</h5>
                 </div>
  
                 <div className='d-flex flex-column mt-5'>
                <h1> <i class="fa-solid fa-tags fa-2xl ms-5"></i></h1>
                 <h5 className='mt-2 fw-bolder'>TRANSPARENT PRICING</h5>
                 </div>

                 <div className='d-flex flex-column mt-5'>
                <h1><i class="fa-brands fa-cc-visa fa-2xl ms-5"></i></h1>
                 <h5 className='mt-3 fw-bolder'>ONLINE PAYMENTS</h5>
                 </div>

                 <div className='d-flex flex-column mt-5'>
                <h1> <i class="fa-solid fa-headset fa-2xl"></i></h1>
                 <h5 className='mt-3 fw-bolder'>SUPPORT</h5>
                 </div>
  
                </div>
            </div>
      </div>





    </>
  )
}

export default Home