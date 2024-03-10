import React from 'react'
import elec from '../Images/electrician.jpg'
import plumb from '../Images/plumber.jpg'
import paint from '../Images/painter.jpg'
import kitchen from '../Images/kitchenRepair.jpg'
import lock from '../Images/locksmith.jpg'
import mason from '../Images/masons.jpg'
import pc from '../Images/PCservice.jpg'
import nurse from '../Images/Homenurse.jpg'
import cctv from '../Images/CCTV.jpg'
import gard from '../Images/gardener.jpg'
import hvac from '../Images/HVAC.jpg'
import car from '../Images/carpenter.jpg'
import tile from '../Images/tile.jpg'
import weld from '../Images/welder.jpg'
import clean from '../Images/houseclean.jpg'
import alum from '../Images/alumfab.jpg'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "react-bootstrap/Card";

function Jobcards() {

    const cards = [{image:elec,name:"Electrician"},{image:plumb,name:"Plumber"},{image:paint,name:"Painter"},{image:kitchen,name:"Appliances Repair"},{image:lock,name:"Locksmith"},{image:mason,name:"Masons"},{image:pc,name:"PC/Laptop Services"},{image:nurse,name:"Home Nurse"},{image:cctv,name:"CCTV Repairs/Installation"},{image:gard,name:"Gardener"},{image:hvac,name:"HVAC"},{image:car,name:"Carpenter"},{image:tile,name:"Tile/Apoxy"},{image:weld,name:"Welder"},{image:clean,name:"HouseCleaning Services"},{image:alum,name:"Aluminium Fabrication"}]

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        autoplay:true,
        autoplaySpeed: 1300 
    }
       
  return (
    <>
                
             <div className='mt-5 mb-5'>
        <h3 className='text-center'  data-aos="zoom-in-up">Available <span className='text-success'>Services</span></h3>     
                    
                    <div className='mt-5'>
                  <Slider {...settings}>
                     {   cards.map((item)=>(
                      <Card  data-aos="zoom-in-right" style={{ width: '18rem' }}>
        <Card.Img variant="top" src={item.image} />
        <Card.Body>
          <Card.Title className='text-center' >{item.name}</Card.Title>     
        </Card.Body>
      </Card>))}
                  </Slider>
                    </div>
                 </div>


      
    </>
  )
}

export default Jobcards