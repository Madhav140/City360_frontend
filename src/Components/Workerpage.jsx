import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Button, FilledInput } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { BASE_URL } from '../Services/baseUrl';
import { UpdateworkerApi, allworkerbookedAPI, workerapprovalAPI } from '../Services/allApi';
import Swal from 'sweetalert2'
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthToken } from '../Context/ContextShare';


function Workerpage() {

  const[bookedworker,setbookedworker] = useState([])
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [preview, setpreview] = useState("")
  const [truestatus,settruestatus] = useState({
    tstatus:"true"
  })
  const [falsestatus,setfalsestatus] = useState({
    fstatus:"false"
  })
  const worker = JSON.parse(sessionStorage?.getItem("existingworker"))

   const navigate = useNavigate()


  const [editWorker, seteditWorker] = useState({
    name: worker.name,
    mobile: worker.mobileno,
    email: worker.email,
    desc: worker.description,
    dist: worker.district,
    pswd: worker.password,
    photo: '',
  })

  useEffect(() => {
    if (editWorker.photo) {
      setpreview(URL.createObjectURL(editWorker.photo))
    }
  }, [editWorker.photo])

  const reset = () => {
    seteditWorker({
      name: worker.name,
      mobile: worker.mobileno,
      email: worker.email,
      desc: worker.description,
      dist: worker.district,
      pswd: worker.password,
      photo: '',
    })
    setpreview(null)
  }

  const districts = ["Alappuzha", "Ernakulam", "Palakkad", "Trivandrum", "Idukki", "Kannur", "Kasargod", "Kozhikode", "Pathanamthitta", "Kollam", "Wayanad", "Thrissur", "Malappuram", "Kottayam"]

  const handleUpdate = async () => {
    const { name, mobile, email, desc, dist, pswd, photo } = editWorker

    const reqBody = new FormData()
    reqBody.append("name",name)
          reqBody.append("mobileno",mobile)
          reqBody.append("email",email)
          reqBody.append("worktype",worker.worktype)
          reqBody.append("description",desc)
          reqBody.append("district",dist)
          reqBody.append("password",pswd)
          preview ? reqBody.append("photo", photo) : reqBody.append("photo",worker.photo)
          reqBody.append("certificate",worker.certificate)
          reqBody.append("status",worker.status)

    const token = sessionStorage.getItem("token")
    if (preview) {
      const reqheader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      const result = await UpdateworkerApi(worker._id,reqBody,reqheader)
      if (result.status === 200) {
        Swal.fire({
          title: 'Updated!!',
          text: 'Your Profile is Updated',
          icon: 'success'   
        })
        sessionStorage.setItem('existingworker',JSON.stringify(result.data))

      }
      else {
        Swal.fire({
          title: 'Error',
          text: result.response.data,
          icon: 'error'   
        })
      }

    }
    else {
      const reqheader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await UpdateworkerApi(worker._id,reqBody,reqheader)
      if (result.status === 200) {
        Swal.fire({
          title: 'Updated!!',
          text: 'Your Profile is Updated',
          icon: 'success'   
        })
        sessionStorage.setItem('existingworker',JSON.stringify(result.data))

      }
      else {
        Swal.fire({
          title: 'Error',
          text: result.response.data,
          icon: 'error'   
        })
      }
    }
  }


  const userbookedworkers = async () => {
    const token = sessionStorage.getItem("token")
    const reqheader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await allworkerbookedAPI(reqheader)
    setbookedworker(result.data)
  }

  useEffect(()=>{
    userbookedworkers()
  },[])

  const userworkers = bookedworker?.filter((item)=> item.bookedusers.find(item=>item.workerid == worker._id && item.status == null))
  const userreviews = bookedworker?.filter((item)=> item.bookedusers.find(item=>item.workerid == worker._id && item.review != ""))

   const handletrue = async(id,date)=>{
        const token = sessionStorage.getItem("token")
        const reqheader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await workerapprovalAPI(id,truestatus,reqheader)
        if (result.status === 200) {
          Swal.fire({
            title: 'Approved',
            text: `Your scheduled date is ${date}`,
            icon: 'success'   
          })  
        }
        else {
          Swal.fire({
            title: 'Error',
            text: result.response.data,
            icon: 'error'   
          })
        }
   }

   const handlefalse = async(id)=>{
  
    const token = sessionStorage.getItem("token")
    const reqheader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await workerapprovalAPI(id,falsestatus,reqheader)
    if (result.status === 200) {
      Swal.fire({
        title: 'Declined',
        text: `Request is declined`,
        icon: 'info'   
      })  
     
    }
    else {
      Swal.fire({
        title: 'Error',
        text: result.response.data,
        icon: 'error'   
      })
    }
}

const {isloggedOut,SetisloggedOut} = useContext(isAuthToken)

const handlelogout = ()=>{
  sessionStorage.removeItem("token")
  sessionStorage.removeItem("existingworker")
  SetisloggedOut(false)
  navigate('/')
   }



  return (
    <>
     <h1 className='text-center mb-0 mt-3'>Welcome <span className='text-success'>{worker.name}</span></h1>
     <button onClick={handlelogout} style={{float:'right'}} className='btn btn-outline-danger me-5'>Logout</button>
      <div style={{ height: '100%' }} className='d-flex justify-content-center align-items-center mt-0'>
     
      <div className='w-50 bg-light d-flex flex-column p-5 me-5' style={{ height: '80vh', borderRadius: '50px' }}>
      <h2 className='text-center text-dark'>Job Alerts</h2>
     <div className='mt-2 d-flex flex-column' style={{overflowY:'auto',height: '60vh'}}>

       { userworkers?.length>0?
       userworkers?.map(item=>
       <Card style={{ width: '32rem' }} className='mb-2 rounded'>
        <Card.Body className='p-3'>
            <div className='d-flex flex-column'>
              <h6 className='mt-2'>User name : {item.username}</h6>
              <h6 className='mt-2'>Mobile No : {item.mobileno}</h6>
              <h6 className='mt-2'>Date Scheduled : {item.bookedusers.find(item=>item.workerid==worker._id).date}</h6>
              <h6 className='mt-2'>Service Requested : {item.bookedusers.find(item=>item.workerid==worker._id).service}</h6>
              <h6 className='mt-2'>Location : {item.bookedusers.find(item=>item.workerid==worker._id).location}</h6>
              <h6 className='mt-2'>Location URL : <Link target='_blank' to={item.bookedusers.find(item=>item.workerid==worker._id).locationURL}> Google maps </Link> </h6>
            </div>        
        <button onClick={()=>handlefalse(item.bookedusers.find(item=>item.workerid==worker._id)._id)} className='btn btn-outline-danger me-2'>Decline</button>
        <button onClick={()=>handletrue(item.bookedusers.find(item=>item.workerid==worker._id)._id,item.bookedusers.find(item=>item.workerid==worker._id).date)} className='btn btn-outline-success'>Accept</button>

        </Card.Body>
      </Card>):
      <h3 className='text-center text-danger'>No Job requests</h3>
      }

     </div>
    </div>



        <div className='w-25 bg-light d-flex flex-column justify-content-center align-items-center' style={{ height: '87vh', borderRadius: '50px' }}>
          <h2 className='text-center text-dark mt-3'>Worker Profile</h2>
          <div className='d-flex justify-content-center mt-3'>
            <label htmlFor="profile" className='text-center'>
              <input id='profile' type="file" style={{ display: 'none' }} onChange={(e) => { seteditWorker({ ...editWorker, photo: e.target.files[0] }) }} />
              <img width={'150px'} height={'200px'} style={{ borderRadius: '50px' }} src={preview ? preview : `${BASE_URL}/uploads/${worker.photo}`} alt="no image" />
            </label>
          </div>

          <div className='d-flex flex-column mt-1'>


            <div className='mb-3'>
              <TextField style={{ width: '300px' }} value={editWorker.name} onChange={(e) => { seteditWorker({ ...editWorker, name: e.target.value }) }} label="Name" variant="filled" />
            </div>
            <div className='mb-3'>
              <TextField style={{ width: '300px' }} value={editWorker.email} onChange={(e) => { seteditWorker({ ...editWorker, email: e.target.value }) }} label="Email" variant="filled" />
            </div>


            <div className='mb-3'>
              <TextField style={{ width: '300px' }} value={editWorker.desc} onChange={(e) => { seteditWorker({ ...editWorker, desc: e.target.value }) }} label="Job Description" variant="filled" />
            </div>


            <div className='mb-3'>
              <TextField style={{ width: '300px' }} value={editWorker.mobile} onChange={(e) => { seteditWorker({ ...editWorker, mobile: e.target.value }) }} label="Mobile No." type='number' variant="filled" />
            </div>
            <div className='mb-3'>
              <TextField
                style={{ width: '300px' }}
                select
                label="Select your District"
                variant="filled"
                value={editWorker.dist} onChange={(e) => { seteditWorker({ ...editWorker, dist: e.target.value }) }}
              >
                {districts.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div className='mb-3'>
              <FormControl style={{ width: '300px' }} variant="filled" onChange={(e) => { seteditWorker({ ...editWorker, pswd: e.target.value }) }}>
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                <FilledInput
                  value={editWorker.pswd}
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
            </div>


          </div>

          <Stack className='mt-3 mb-2 d-flex  justify-content-center' direction="row" spacing={2}>
            <Button onClick={handleUpdate} type='submit' className='bg-outline-warning' style={{ width: '200px', height: '50px' }} variant="contained">Update</Button>
            <Button onClick={reset} style={{ width: '200px', height: '50px' }} variant="outlined">Reset</Button>
          </Stack>
        </div>

      </div>

     <div className='d-flex justify-content-center align-items-center'>
        <div className='mt-3 w-50 mb-3 ms-5' style={{height:'40vh',backgroundColor:'beige',borderRadius:'50px'}}>
           <h2 className='text-center mt-2'>Reviews</h2>
         
           <div className='d-flex mt-4' style={{overflowY:'auto'}}>

           { userreviews?.length>0?
           userreviews?.map(item=>
          <div className='d-flex'><h3 className='ms-5'>{item.username} :</h3> <h4 className='mt-1 ms-2'>{item.bookedusers.find(item=>item.workerid==worker._id).review}</h4></div>
          ):
        <h3>No reviews</h3>
        }

           </div>

        </div>
     </div>

    </>
  )
}

export default Workerpage