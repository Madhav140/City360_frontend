import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Button, FilledInput } from '@mui/material';
import icon from '../Images/Personicon.png'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import bg from '../Images/bgregister.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { workeregisterAPI, workerloginAPI } from '../Services/allApi';
import { isAuthToken } from '../Context/ContextShare';




function WorkRegister({ workerLogin }) {

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginform = workerLogin ? true : false
  const [preview,setpreview] = useState("")

  const home = ()=>{
    navigate('/')
    window.location.reload()
   }

  const worktype = [{ value: "Electrician" }, { value: "Plumber" }, { value: "Carpenter" }, { value: "Tile/Apoxy" }, { value: "Gardener" }, { value: "HVAC" }, { value: "Locksmith" }, { value: "Masons" }, { value: "PC/Laptop Services" }, { value: "Aluminium Fabrication" }, { value: "Welder" }, { value: "HouseCleaning Services" }, { value: "Painter" }, { value: "Appliances Repair" }, { value: "Home Nurse" }, { value: "CCTV Repair" }];
  const districts = ["Alappuzha", "Ernakulam", "Palakkad", "Trivandrum", "Idukki", "Kannur", "Kasargod", "Kozhikode", "Pathanamthitta", "Kollam", "Wayanad", "Thrissur", "Malappuram", "Kottayam"]
 
     const [worker,setworker] = useState({
      name:'',
      mobile:'',
      email:'',
      work:'',
      desc:'',
      dist:'',
      pswd:'',
      photo:'',
      cert:''
     })
     console.log(worker);

     useEffect(()=>{
      if(worker.photo){
        setpreview(URL.createObjectURL(worker.photo))
      }
     },[worker.photo])
 
      const handleRegister = async()=>{
        const {name,mobile,email,work,desc,dist,pswd,photo,cert} = worker
        if(!name || !mobile || !email || !work || !desc || !dist || !pswd || !photo || !cert){
          toast.info('Please fill the full form')
        }
        else{
          const reqBody = new FormData()
          reqBody.append("name",name)
          reqBody.append("mobileno",mobile)
          reqBody.append("email",email)
          reqBody.append("worktype",work)
          reqBody.append("description",desc)
          reqBody.append("district",dist)
          reqBody.append("password",pswd)
          reqBody.append("photo",photo)
          reqBody.append("certificate",cert)

          const reqheader = {
            "Content-Type":"multipart/form-data",
          }

          const result =  await workeregisterAPI(reqBody,reqheader)
          if(result.status>=200&&result.status<300){
           toast.success(`${result.data.name} is Successfully Registered`)

           setworker({
            name:'',
            mobile:'',
            email:'',
            work:'',
            desc:'',
            dist:'',
            pswd:'',
            photo:'',
            cert:''
           })
           setTimeout(()=>{navigate('/workerLogin')},7000)
           navigate('/workerLogin')
           }
          else{
              toast.error(result.response.data) 
          }
        }
      }

      const {isloggedOut,SetisloggedOut} = useContext(isAuthToken)

      const handleLogin = async(e)=>{
        e.preventDefault()
        const{email,pswd} = worker
        if(!email || !pswd){
          toast.info('please fill the full form')
        }
        else{
         const result =  await workerloginAPI(worker)
         console.log(result);
        if(result.status===200){
          //alert
          toast.success('Login Successful')
         
          //store
          sessionStorage.setItem('existingworker',JSON.stringify(result.data.existworker))
          sessionStorage.setItem('token',result.data.token)

          //empty state
         setworker({
            email:"",
            pswd:""
          })
          //navigate
         navigate('/workerpage')
         window.location.reload()
         SetisloggedOut(true)
        }
        else{
          toast.error(result.response.data)
        }

        }
   }

   const clear = ()=>{
    setworker({
      name:'',
      mobile:'',
      email:'',
      work:'',
      desc:'',
      dist:'',
      pswd:'',
      photo:'',
      cert:''
     })
     setpreview("")
   }

  return (
    <>
      <div className='container-fluid p-5 d-flex flex-column justify-content-center align-items-center w-100' style={{ backgroundImage: `url(${bg})`, height: '100vh' }}>

        {!loginform ?
          <div className='w-50 bg-light' style={{ height: '72vh', borderRadius: '50px' }}>
            <h2 className='text-center text-dark mt-3'>Worker Profile Registration</h2>
            <div className='d-flex justify-content-center mt-3'>
              <label htmlFor="profile" className='text-center'>
                <input id='profile' type="file" style={{ display: 'none' }} onChange={(e)=>{setworker({...worker,photo:e.target.files[0]})}} />
                <img width={'180px'} height={'180px'} style={{borderRadius:'50px'}} src={preview?preview:icon} alt="no image" />
              </label>
            </div>

            <div className='row mt-1'>

              <div className="col-6 d-flex flex-column justify-content-center align-items-center mt-5">
                <div className='mb-3'>
                  <TextField value={worker.name} style={{ width: '300px' }} label="Name" variant="filled" onChange={(e)=>{setworker({...worker,name:e.target.value})}} />
                </div>
                <div className='mb-3'>
                  <TextField value={worker.email} style={{ width: '300px' }} label="Email" variant="filled" onChange={(e)=>{setworker({...worker,email:e.target.value})}}/>
                </div>

                <div className='mb-3'>
                  <TextField
                    style={{ width: '300px' }}
                    select
                    label="Select your work"
                    variant="filled"
                    onChange={(e)=>{setworker({...worker,work:e.target.value})}}
                    value={worker.work}
                  >
                    {worktype.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className='mb-3'>
                  <TextField value={worker.desc} style={{ width: '300px' }} label="Job Description" variant="filled" onChange={(e)=>{setworker({...worker,desc:e.target.value})}}/>
                </div>
              </div>

              <div className="col-6 d-flex flex-column justify-content-center align-items-center mt-5">
                <div className='mb-3'>
                  <TextField value={worker.mobile} style={{ width: '300px' }} label="Mobile No." type='number' variant="filled" onChange={(e)=>{setworker({...worker,mobile:e.target.value})}}/>
                </div>
                <div className='mb-3'>
                  <TextField
                    style={{ width: '300px' }}
                    select
                    label="Select your District"
                    variant="filled"
                    onChange={(e)=>{setworker({...worker,dist:e.target.value})}}
                    value={worker.dist}
                  >
                    {districts.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>

                <div className='mb-3'>
                  <FormControl  style={{ width: '300px' }} variant="filled" onChange={(e)=>{setworker({...worker,pswd:e.target.value})}}>
                    <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                    <FilledInput
                    value={worker.pswd}
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
                <div className='mb-3'>
                  <label htmlFor="cert" >
                    <input id='cert' type="file" style={{ display: 'none' }} onChange={(e)=>{setworker({...worker,cert:e.target.files[0]})}}/>
                    <button onClick={() => document.getElementById('cert').click()} className='btn btn-outline-success'>Upload your Work Certificates</button>
                  </label>
                </div>
                <p>{worker.cert.name}</p>
              </div>
            </div>

            <Stack className='mt-3 mb-2 d-flex  justify-content-center' direction="row" spacing={2}>
              <Button onClick={handleRegister} type='submit' className='bg-success' style={{ width: '200px', height: '50px' }} variant="contained">Register</Button>
              <Button onClick={clear} style={{ width: '200px', height: '50px' }} variant="outlined">Reset</Button>
            </Stack>
            <div><p className="mb-5 pb-lg-2 text-center" style={{ color: '#393f81' }}>Already a User? <a style={{ color: '#393f81' }}>Please <Link to={'/workerLogin'}>Login</Link></a></p></div>
          </div> :
          <div style={{ backgroundColor: 'white', borderRadius: '50px',width:'35rem'}} className='d-flex mt-1 flex-column justify-content-center align-items-center'>
            <h1 className="fw-bolder mt-4" style={{ color: "#408EC6", fontSize: '70px' }}>CITY <span style={{ color: " #7A2048" }}>360</span></h1>


            <h2 className='text-center mt-4 text-success'>Worker Login</h2>

            <div className='d-flex flex-column justify-content-center align-items-center'>
              <form className='mt-4'>


                <div className='mb-3'>
                  <TextField value={worker.email} onChange={(e)=>{setworker({...worker,email:e.target.value})}} className='w-100' label="Email" variant="filled" />
                </div>

                <FormControl className='w-100' variant="outlined" onChange={(e)=>{setworker({...worker,pswd:e.target.value})}} >
                  <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                  <FilledInput      
                    id="filled-adornment-password"
                    value={worker.pswd}
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
       <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>New User? <a style={{ color: '#393f81' }}>Please <Link to={'/worker/register'}>Register</Link></a></p>
                  
                </div>


              </form>
            </div>
          </div>
        }
      
      <h6 className='text-dark fw-bolder mt-5 bg-light rounded p-1'>Back to <Link onClick={home} className='text-dark fw-bolder bg-light rounded p-1' style={{textDecoration:'none',textDecorationLine:'underline'}}>Home</Link></h6>

      </div>
      <ToastContainer
          position="top-center"
          theme="colored"
          autoClose={2000}
        />

    </>
  )
}

export default WorkRegister