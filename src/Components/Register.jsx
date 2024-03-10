import React, { useContext, useState } from 'react'
import img from '../Images/loginimage.png'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserpswdChangeApi, loginAPI, registerAPI } from '../Services/allApi';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { isAuthToken } from '../Context/ContextShare';
import Modal from 'react-bootstrap/Modal';


function Register({ register }) {
  const navigate = useNavigate()
  const { isloggedOut, SetisloggedOut } = useContext(isAuthToken)


  const [user, setuser] = useState({
    uname: '',
    email: '',
    mobile: '',
    pswd: ''
  })

  const clear = () => {
    setuser({
      uname: '',
      email: '',
      mobile: '',
      pswd: ''
    })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    const { uname, email, mobile, pswd } = user
    if (!uname || !email || !pswd || !mobile) {
      toast.info('please fill the full form')
    }
    else {
      const result = await registerAPI(user)
      if (result.status >= 200 && result.status < 300) {
        toast.success(`${result.data.username} is Successfully Registered`)
        setuser({
          uname: "",
          email: "",
          mobile: "",
          pswd: ""
        })
        navigate('/login')
      }
      else {
        toast.error(result.response.data)
      }
    }
  }


  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, pswd } = user
    if (!email || !pswd) {
      toast.info('please fill the full form')
    }
    else {
      const result = await loginAPI(user)
      if (result.status === 200) {
        toast.success('Login Successful')
        sessionStorage.setItem('existinguser', JSON.stringify(result.data.existuser))
        sessionStorage.setItem('token', result.data.token)

        setuser({
          email: "",
          pswd: ""
        })
        navigate('/userpage')
        window.location.reload()
        SetisloggedOut(true)
      }
      else {
        toast.error(result.response.data)
        console.log(result.response.data)
      }
    }
  }




  const registerForm = register ? true : false
  var heightt = ""
  registerForm ? heightt = '73vh' : heightt = '64vh'

  const home = () => {
    navigate('/')
    window.location.reload()
  }

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const pswdChange = async(e) =>{
    e.preventDefault()
    const { uname, email, pswd } = user
    if (!uname || !email || !pswd) {
      toast.info('please fill the full form')
    }
    else {
      const result = await UserpswdChangeApi(user)
      if (result.status >= 200 && result.status < 300) {
        toast.success(`Password Successfully Changed`)
        setuser({
          uname: "",
          email: "",
          mobile: "",
          pswd: ""
        })
        navigate('/login')
      }
      else {
        toast.error(result.response.data)
      }
    }
  }

  return (
    <>
      <div className='container-fluid p-5 d-flex flex-column justify-content-center align-items-center w-100' style={{ background: 'linear-gradient(to bottom, #1d2671,#c33764)', height: '100vh' }}>
        <div className='glass row w-75 mt-3' style={{ height: heightt, borderRadius: '50px' }}>
          <div className="col-6 d-flex justify-content-center align-items-center">
            <img src={img} height={'650px'} alt="" />
          </div>
          <div className="col-6 p-2" >
            <div style={{ backgroundColor: 'white', borderRadius: '50px' }} className='d-flex mt-1 flex-column justify-content-center align-items-center'>
              <h1 className="fw-bolder mt-4" style={{ color: "#408EC6", fontSize: '70px' }}>CITY <span style={{ color: " #7A2048" }}>360</span></h1>

              {registerForm ?
                <h2 className='text-center mt-4 text-success'>USER REGISTER</h2> : <h2 className='text-center mt-5 text-success'>USER LOGIN</h2>}

              <div className='d-flex flex-column justify-content-center align-items-center'>
                <form className='mt-4'>

                  {registerForm &&
                    <div className='mb-3'>
                      <TextField value={user.uname} onChange={(e) => { setuser({ ...user, uname: e.target.value }) }} className='w-100' label="Username" variant="outlined" />
                    </div>
                  }

                  <div className='mb-3'>
                    <TextField value={user.email} onChange={(e) => { setuser({ ...user, email: e.target.value }) }} className='w-100' label="Email" variant="outlined" />
                  </div>

                  {registerForm &&
                    <div className='mb-3'>
                      <TextField value={user.mobile} onChange={(e) => { setuser({ ...user, mobile: e.target.value }) }} type='number' className='w-100' label="Mobile No." variant="outlined" />
                    </div>
                  }

                  <FormControl className='w-100' variant="outlined" onChange={(e) => { setuser({ ...user, pswd: e.target.value }) }} >
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      value={user.pswd}
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
                    {registerForm ?
                      <Button type='submit' onClick={handleRegister} className='bg-success' style={{ width: '200px', height: '50px' }} variant="contained">Register</Button> :
                      <Button type='submit' onClick={handleLogin} className='bg-success' style={{ width: '200px', height: '50px' }} variant="contained">Login</Button>
                    }
                    <Button onClick={clear} style={{ width: '200px', height: '50px' }} variant="outlined">Reset</Button>
                  </Stack>

                  <div className='mt-3'>
                    {!registerForm &&
                      <Link onClick={handleShow} className="medium text-muted" style={{ textDecoration: "none" }}>Forgot password?</Link>}
                    {registerForm ?
                      <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Already have an account? <a style={{ color: '#393f81' }}>Please <Link to={'/login'}>Login</Link></a></p>
                      : <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>New User? <a style={{ color: '#393f81' }}>Please <Link to={'/register'}>Register</Link></a></p>
                    }
                  </div>


                </form>
              </div>
            </div>
          </div>
        </div>
        <h6 className='text-light mt-5'>Back to <Link onClick={home} className='text-light' style={{ textDecoration: 'none', textDecorationLine: 'underline' }}>Home</Link></h6>
      </div>

      <ToastContainer
        position="top-center"
        theme="colored"
        autoClose={2000}
      />

      <Modal show={show} onHide={handleClose} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>Change your Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='mb-3'>
            <TextField  onChange={(e) => { setuser({ ...user, uname: e.target.value }) }} className='w-100' label="Username" variant="outlined" />
          </div>
          <div className='mb-3'>
            <TextField  onChange={(e) => { setuser({ ...user, email: e.target.value }) }} className='w-100' label="Email" variant="outlined" />
          </div>

          <FormControl className='w-100' variant="outlined" onChange={(e) => { setuser({ ...user, pswd: e.target.value }) }} >
            <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
            <OutlinedInput
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
              label=" New Password"
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={pswdChange}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Register