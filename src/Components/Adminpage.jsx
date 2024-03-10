import React, { useContext, useEffect, useState } from 'react'
import { adminapprovalAPI, adminloginAPI, adminworkersAPI, allusersAPI, allworkersAPI, approvedworkersAPI, deleteworkersAPI } from '../Services/allApi'
import img from '../Images/loginimage.png'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "react-bootstrap/Card";
import { BASE_URL } from '../Services/baseUrl';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'
import { isAuthToken } from '../Context/ContextShare';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Table from 'react-bootstrap/Table';



function Adminpage({ adminLogin }) {
  const navigate = useNavigate()
  const [workers, setworkers] = useState([])
  const [APworkers, setAPworkers] = useState([])
  const [isapproved,setisapproved] = useState(false)
  const {isloggedOut,SetisloggedOut} = useContext(isAuthToken)
  const [approve,setapprove] = useState(false)
  const [allWorkers,setallWorkers] = useState([])
  const [allUsers,setallUsers] = useState(0)


  const login = adminLogin ? true : false
  const user = JSON.parse(sessionStorage?.getItem('admin'))

  const [admin, setadmin] = useState({
    email: '',
    pswd: ''
  })

  const clear = () => {
    setadmin({
      email: '',
      pswd: ''
    })
  }

 
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    autoplay:false,
    autoplaySpeed: 1300 
  }


  const home = () => {
    navigate('/')
    window.location.reload()
  }

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, pswd } = admin
    if (!email || !pswd) {
      toast.info('please fill the full form')
    }
    else {
      const result = await adminloginAPI(admin)
      if (result.status === 200) {
        toast.success('Logged as Admin')
        sessionStorage.setItem('admin', JSON.stringify(result.data.admin))
        sessionStorage.setItem('token', result.data.token)
        setadmin({
          email: "",
          pswd: ""
        })
        navigate('/adminpage')
        window.location.reload()
        SetisloggedOut(true)
      }
      else {
        toast.error(result.response.data)
      }
    }
  }


  const getworkers = async () => {
    const token = sessionStorage.getItem("token")
    const reqheader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await adminworkersAPI(reqheader)
    setworkers(result.data)
  }

  const approvedworkers = async () => {
    const token = sessionStorage.getItem("token")
    const reqheader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await approvedworkersAPI(reqheader)
    setAPworkers(result.data)
  }

  useEffect(() => {
    getworkers()
    approvedworkers()
  }, [approve])

  const[modalitem,setmodalitem]=useState({})
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleshow = (item) =>{
    setisapproved(false)
     handleShow()
     setmodalitem(item)
  }

  const handleApprove = async(id,name)=>{
    const token = sessionStorage.getItem("token")
    const reqheader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
   const result = await adminapprovalAPI(id,reqheader)
   if(result.status>=200&&result.status<300){
    Swal.fire({
      title: 'Approved!',
      text: `${name} is succesfully registered`,
      icon: 'success'   
    })
    setapprove(true)
   }
   else{
    Swal.fire({
      title: 'Error!',
      text: `${result.response.data}`,
      icon: 'error'   
    })
   }
  }

   const approvedShow = (item)=>{
   setisapproved(true)
    handleShow()
    setmodalitem(item)
   }


   const handleDelete = async(id,name)=>{
    const token = sessionStorage.getItem("token")
    const reqheader = {
     "Content-Type":"application/json",
     "Authorization":`Bearer ${token}`
   }

   const result = await deleteworkersAPI(id,reqheader)
   console.log(result);
   if(result.status>=200&&result.status<300){
    Swal.fire({
      title: 'Deleted!!',
      text: `${name} is succesfully removed`,
      icon: 'info'   
    })
    approvedworkers()
    geteveryWorkers()
    handleClose()
   }
   else{
    Swal.fire({
      title: 'Error!',
      text: `${result.response.data}`,
      icon: 'error'   
    })
   }
}

const handleLogout = ()=>{
  sessionStorage.removeItem("token")
  sessionStorage.removeItem("admin")
  SetisloggedOut(false)
  navigate('/')
}

const geteveryWorkers = async()=>{
  const token = sessionStorage.getItem("token")
    const reqheader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await allworkersAPI(reqheader)
    setallWorkers(result.data)
    
}

const geteveryUsers = async()=>{
  const token = sessionStorage.getItem("token")
    const reqheader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await allusersAPI(reqheader
      )
    setallUsers(result.data?.length)
}
useEffect(()=>{
  geteveryWorkers()
  geteveryUsers()
},[])

const worktype = [{ value: "Electrician",no:elec }, { value: "Plumber" }, { value: "Carpenter" }, { value: "Tile/Apoxy" }, { value: "Gardener" }, { value: "HVAC" }, { value: "Locksmith" }, { value: "Masons" }, { value: "PC/Laptop Services" }, { value: "Aluminium Fabrication" }, { value: "Welder" }, { value: "HouseCleaning Services" }, { value: "Painter" }, { value: "Appliances Repair" }, { value: "Home Nurse" }, { value: "CCTV Repair" }];

  var elec = allWorkers?.filter(item=>item.worktype === "Electrician")?.length
  var plum = allWorkers?.filter(item=>item.worktype === "Plumber")?.length
  var car = allWorkers?.filter(item=>item.worktype === "Carpenter")?.length
  var tile = allWorkers?.filter(item=>item.worktype === "Tile/Apoxy")?.length
  var gar = allWorkers?.filter(item=>item.worktype === "Gardener")?.length
  var pc = allWorkers?.filter(item=>item.worktype === "PC/Laptop Services")?.length
  var hvac = allWorkers?.filter(item=>item.worktype === "HVAC")?.length
  var lock = allWorkers?.filter(item=>item.worktype === "Locksmith")?.length
  var mas = allWorkers?.filter(item=>item.worktype === "Masons")?.length
  var alu = allWorkers?.filter(item=>item.worktype === "Aluminium Fabrication")?.length
  var wel = allWorkers?.filter(item=>item.worktype === "Welder")?.length
  var house = allWorkers?.filter(item=>item.worktype === "HouseCleaning Services")?.length
  var paint = allWorkers?.filter(item=>item.worktype === "Painter")?.length
  var app = allWorkers?.filter(item=>item.worktype === "Appliances Repair")?.length
  var nurse = allWorkers?.filter(item=>item.worktype === "Home Nurse")?.length
  var cctv = allWorkers?.filter(item=>item.worktype === "CCTV Repair")?.length

const workNumber = [{ value: "Electrician",no:elec }, { value: "Plumber",no:plum }, { value: "Carpenter",no:car }, { value: "Tile/Apoxy",no:tile }, { value: "Gardener",no:gar }, { value: "HVAC",no:hvac }, { value: "Locksmith",no:lock }, { value: "Masons",no:mas }, { value: "PC/Laptop Services",no:pc }, { value: "Aluminium Fabrication",no:alu }, { value: "Welder",no:wel }, { value: "HouseCleaning Services",no:house }, { value: "Painter",no:paint }, { value: "Appliances Repair",no:app }, { value: "Home Nurse",no:nurse }, { value: "CCTV Repair",no:cctv }];


const data = [
  { value: allWorkers?.length, label: 'Workers' },
  { value: allUsers, label: 'Users' }, 
];

const size = {
  width: 400,
  height: 200,
};

  return (
    <>
      {login ?
        <div className='container-fluid p-5 d-flex flex-column justify-content-center align-items-center w-100' style={{ background: 'linear-gradient(to bottom, #1d2671,#c33764)', height: '100vh' }}>
          <div className='glass row w-75 mt-3' style={{ height: '64vh', borderRadius: '50px' }}>
            <div className="col-6 d-flex justify-content-center align-items-center">
              <img src={img} height={'650px'} alt="" />
            </div>
            <div className="col-6 p-5" >
              <div style={{ backgroundColor: 'white', borderRadius: '50px', height: '53vh' }} className='d-flex  w-100 flex-column justify-content-center align-items-center'>
                <h1 className="fw-bolder mt-3" style={{ color: "#408EC6", fontSize: '70px' }}>CITY <span style={{ color: " #7A2048" }}>360</span></h1>


                <h2 className='text-center mt-4 text-success'>Admin Login</h2>

                <div className='d-flex flex-column justify-content-center align-items-center'>
                  <form className='mt-4'>
                    <div className='mb-3'>
                      <TextField value={admin.email} onChange={(e) => { setadmin({ ...admin, email: e.target.value }) }} className='w-100' label="Email" variant="outlined" />
                    </div>


                    <FormControl className='w-100' variant="outlined" onChange={(e) => { setadmin({ ...admin, pswd: e.target.value }) }} >
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput
                        value={admin.pswd}
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>

                    <Stack className='mt-5' direction="row" spacing={2}>
                      <Button type='submit' onClick={handleLogin} className='bg-success' style={{ width: '200px', height: '50px' }} variant="contained">Login</Button>
                      <Button onClick={clear} style={{ width: '200px', height: '50px' }} variant="outlined">Reset</Button>
                    </Stack>

                    <div className='mt-3'>
                      <a className="medium text-muted" style={{ textDecoration: "none" }}>Forgot password?</a>
                    </div>


                  </form>
                </div>
              </div>
            </div>
          </div>
          <h6 className='text-light mt-4'>Back to <Link onClick={home} className='text-light' style={{ textDecoration: 'none', textDecorationLine: 'underline' }}>Home</Link></h6>
        </div> :
        <div style={{ height: '150vh' }} className='d-flex flex-column justify-content-center align-items-center'>
          <button style={{marginLeft:'150vh'}} onClick={handleLogout} className='btn btn-outline-danger'>Logout</button>
          <h1 className='mb-5'>Welcome {user.Adminname}</h1>
          <div className='d-flex justify-content-between w-50'>
          <div>
            <h2 className='text-success text-center mt-2 mb-2'>Worker to Users Ratio Chart</h2>
            <PieChart
        series={[
          {
            arcLabel: (item) => `${item.label} (${item.value})`,
            arcLabelMinAngle: 45,
            data,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontWeight: 'bold',
          },
        }}
        {...size}
      />
          </div>
          <div className='w-50' style={{height:'30vh',overflowY:'auto'}}>
          <Table striped bordered hover>
      <thead>
        <tr>
          <th>Workers</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        { workNumber?.map(item=>
        <tr>
          <td>{item.value}</td>
          <td>{item.no}</td>
        </tr>)}
      </tbody>
    </Table>
          </div>
          </div>
          <div className='d-flex flex-column ms-5 me-5 mt-5' style={{ border: '2px solid red',height:'45vh',width:'85%'}}>
            <h3 className='text-center mt-2'>Job <span className='text-success'>Requests</span></h3>

            <div className='mt-2'>

              {workers?.length>0?
              <Slider {...settings}>
              {workers?.map((item)=>(
                <Card className='mb-2' style={{ width: '15rem' }}>
                <Card.Img variant="top" height={'200px'} src={`${BASE_URL}/uploads/${item.photo}`} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                   {item.worktype}
                  </Card.Text>
                  <Button className='btn-primary bg-outline-warning' onClick={()=>{handleshow(item)}}>View Details</Button>
                </Card.Body>
              </Card>))}
              </Slider>:
              <p>No workers to display</p>
              }

            </div>
          </div>

          <div className='d-flex flex-column ms-5 me-5 mt-5' style={{ border: '2px solid green',height:'45vh',width:'85%'}}>
            <h3 className='text-center mt-2'>Approved <span className='text-success'>Workers</span></h3>

            <div className='mt-2'>

              {APworkers?.length>0?
              <Slider {...settings}>
              {APworkers?.map((item)=>(
                <Card className='mb-2' style={{ width: '15rem' }}>
                <Card.Img variant="top" height={'200px'} src={`${BASE_URL}/uploads/${item.photo}`} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                   {item.worktype}
                  </Card.Text>
                  <Button className='btn-primary bg-outline-warning' onClick={()=>{approvedShow(item)}}>View Details</Button>
                </Card.Body>
              </Card>))}
              </Slider>:
              <p>No workers to display</p>
              }

            </div>
          </div>

         {/* modal */}
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
        <Modal.Body className='d-flex flex-column justify-content-center align-items-center'>
         <img height={'300px'} src={`${BASE_URL}/uploads/${modalitem.photo}`} alt="" />
        <div className='mt-2 p-3'>
        <h6><span className='text-danger'>Worktype</span> : {modalitem.worktype}</h6>
        <h6><span className='text-danger'>Description</span> : {modalitem.description}</h6>
        <h6><span className='text-danger'>District</span> : {modalitem.district}</h6>
        <h6><span className='text-danger'>Email</span> : {modalitem.email}</h6>
        <h6><span className='text-danger'>Mobile No.</span> : {modalitem.mobileno}</h6>
        <h6><span className='text-danger'>Certificate</span> : <Link target='_blank' to={`${BASE_URL}/uploads/${modalitem.certificate}`}>Click here</Link> </h6>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         { isapproved?
          <Button className='btn-success' onClick={()=>{handleDelete(modalitem._id,modalitem.name)}}>Delete</Button>:
         <Button className='btn-success' onClick={()=>{handleApprove(modalitem._id,modalitem.name)}}>Approve</Button>}
        </Modal.Footer>
      </Modal>
         {/* modal end */}

        </div>   
      }
      <ToastContainer
        position="top-center"
        theme="colored"
        autoClose={2000}
      />

    </>
  )
}

export default Adminpage