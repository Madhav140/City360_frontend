import React, { useContext, useEffect, useState } from 'react'
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Stack';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { approvedworkersAPI, userBookingAPI } from '../Services/allApi';
import { BASE_URL } from '../Services/baseUrl';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Booked, isAuthToken } from '../Context/ContextShare';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Usercanvas from './Usercanvas';



function Userpage() {
  const [APworkers, setAPworkers] = useState([])
  const[modalitem,setmodalitem]=useState({})
  const {isloggedOut,SetisloggedOut} = useContext(isAuthToken)
 const[booking,setbooking] = useState({
    date:'',
    service:'',
    location:'',
    locationURL:'',
    review:''
 })
 console.log(booking);

  const {isBooked,setisBooked} = useContext(Booked)

  const navigate = useNavigate()

  const districts = ["Alappuzha", "Ernakulam", "Palakkad", "Trivandrum", "Idukki", "Kannur", "Kasargod", "Kozhikode", "Pathanamthitta", "Kollam", "Wayanad", "Thrissur", "Malappuram", "Kottayam"]

   const [search,setsearch] = useState("")
  const [district, setdistrict] = React.useState('');
  const handleChange = (event) => {
    setdistrict(event.target.value);
  };

  const approvedworkers = async () => {
    const token = sessionStorage.getItem("token")
    const reqheader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await approvedworkersAPI(reqheader)
    setAPworkers(result.data)
  }

  useEffect(()=>{
    approvedworkers()
  },[])
    
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleshow = (item) =>{
     handleShow()
     setmodalitem(item)
  }

  const name = JSON.parse(sessionStorage?.getItem("existinguser"))
  const bothitems =  APworkers?.filter((item)=>item.district.toLowerCase().includes(district.toLowerCase()) && item.worktype.toLowerCase().includes(search.toLowerCase()))

   const handleLogout = ()=>{
  sessionStorage.removeItem("token")
  sessionStorage.removeItem("existinguser")
  SetisloggedOut(false)
  navigate('/')
   }

   const handleBooking = async(e,id,worker)=>{
    e.preventDefault()
    const {date,service,location,locationURL} = booking
    if(!date || !service || !location || !locationURL){
      toast.info('please fill the full form')
    }
      else{
    const token = sessionStorage.getItem("token")
    const reqheader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await userBookingAPI(id,booking,reqheader)
    if(result.status>=200&&result.status<300){
      Swal.fire({
        title: 'Booked!!',
        text: `${worker} is succesfully booked for a service`,
        icon: 'success'   
      })
      setbooking({
        date:'',
    service:'',
    location:'',
    locationURL:'',
    workerid:'',
    review:''
      })
         handleClose()
         setisBooked(result)
      }
     else{
         Swal.fire({
          title: 'Error',
          text: `${result.response.data}`,
          icon: 'error'   
        })
        console.log(result.response.data)
     }
   }
  }
   
  return (
    <>
          <div style={{height:'100%',padding:'20px'}}>
            <h1 className='ms-5 mt-3'>Welcome <span className='text-primary'>{name?.username}</span></h1>
            <button onClick={handleLogout} style={{float:'right'}} className='btn btn-outline-danger me-4'>Logout</button>
           <span style={{float:'right'}}> <Usercanvas user={name}/></span>
             <h2 className='text-center'>Discover all the Workers we have..</h2>
             <div className='d-flex justify-content-center align-items-center'>
             <InputGroup className="mb-3 w-25">
        <Form.Control
          placeholder="Search by Worktype"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={(e)=>{setsearch(e.target.value)}}
        />
        <Button variant="outline-secondary" id="button-addon2">
        <i class="fa-solid fa-magnifying-glass"></i>
        </Button>
      </InputGroup>

      <Box sx={{ minWidth: 120 }} >
      <FormControl fullWidth className='ms-5 mb-3' style={{width:'200px'}} size="small">
        <InputLabel id="demo-simple-select-label">Sort by District</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={district}
          label="Sort by District"
          onChange={handleChange}
        >
           <MenuItem value="">
          <em>None</em>
        </MenuItem>
          {districts.map(item=>
            <MenuItem value={item}>{item}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
             </div>


             <div className='ms-5 me-5 d-flex justify-content-center align-items-center mt-5'>
        <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={8}
      useFlexGap flexWrap="wrap"
      >
        {district || search || district && search?
        
        APworkers?.length>0?
           bothitems?.map(item=>
            <Item>
            <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" height={'150px'} src={`${BASE_URL}/uploads/${item.photo}`} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          {item.worktype}
        </Card.Text>
        <Button onClick={()=>{handleshow(item)}} variant="primary">See more</Button>
      </Card.Body>
              </Card>
    </Item>)
    
    :
    <h1>No workers</h1>:
    APworkers?.length>0?
    APworkers?.map(item=>
     <Item>
     <Card style={{ width: '18rem' }}>
<Card.Img variant="top" height={'150px'} src={`${BASE_URL}/uploads/${item.photo}`} />
<Card.Body>
 <Card.Title>{item.name}</Card.Title>
 <Card.Text>
   {item.worktype}
 </Card.Text>
 <Button onClick={()=>{handleshow(item)}} variant="primary">See more</Button>
</Card.Body>
       </Card>
</Item>)
:
<h1>No workers</h1>

    }    
           
     </Stack>
             </div>


             <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalitem.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex flex-column justify-content-center align-items-center' >
       <div className='d-flex'>
           <img height={'300px'} width={'250px'} src={`${BASE_URL}/uploads/${modalitem.photo}`} alt="" />
          <div className='mt-2 p-3'>
          <h6><span className='text-danger'>Worktype</span> : {modalitem.worktype}</h6>
          <h6><span className='text-danger'>Description</span> : {modalitem.description}</h6>
          <h6><span className='text-danger'>District</span> : {modalitem.district}</h6>
          <h6><span className='text-danger'>Email</span> : {modalitem.email}</h6>
          <h6><span className='text-danger'>Mobile No.</span> : {modalitem.mobileno}</h6>
          <h6><span className='text-danger'>Certificate</span> : <Link target='_blank' to={`${BASE_URL}/uploads/${modalitem.certificate}`}>Click here</Link> </h6>
          </div>
       </div>
        <div className='d-flex justify-content-center align-items-center flex-column mt-2'>
          <h3 style={{textDecorationLine:'underline'}}>Book a Service</h3>

        <div className='mb-2'>
          <label htmlFor="date">Pick a date</label>
         <input style={{width:'350px'}}  onChange={(e)=>{setbooking({...booking,date:e.target.value})}} type="date" id='date' className='form-control' />
        </div>
        <div className='mb-2'>
          <TextField style={{width:'350px'}} onChange={(e)=>{setbooking({...booking,service:e.target.value})}}  label="Your service description" variant="outlined" />
        </div>
        <div className='mb-2'>
          <TextField style={{width:'350px'}}  onChange={(e)=>{setbooking({...booking,location:e.target.value})}}   label="Your Place" variant="outlined" />
        </div>
        <div className='mb-2'>
          <TextField style={{width:'350px'}}  onChange={(e)=>{setbooking({...booking,locationURL:e.target.value})}}  label="Location URL" variant="outlined" />
        </div>

        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={(e)=>{handleBooking(e,modalitem._id,modalitem.name)}}  className='btn-success'>Book a Service</Button>
        </Modal.Footer>
      </Modal>


     
          </div>
          <ToastContainer
        position="top-center"
        theme="colored"
        autoClose={2000}
      />

    </>
  )
}

export default Userpage