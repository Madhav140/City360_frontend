import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { allusersbookedAPI, deleteReviewAPI, userReviewAPI } from '../Services/allApi';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'
import { Booked } from '../Context/ContextShare';



function Usercanvas({user}) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[bookedworker,setbookedworker] = useState([])
  const [review,setreview] = useState({
    id:'',
    feedback:''
  })

  const {isBooked,setisBooked} = useContext(Booked)

  const [modalshow, setmodalShow] = useState(false);
  const handlemodalClose = () => setmodalShow(false);
  const handlemodalShow = () => setmodalShow(true);

  const userbookedworkers = async () => {
    const token = sessionStorage.getItem("token")
    const reqheader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await allusersbookedAPI(reqheader)
    setbookedworker(result.data)
  }

  useEffect(()=>{
    userbookedworkers()
  },[isBooked])

   
   const userworkers = bookedworker.filter((item)=> item.bookedworkers.find(item=>item.userid==user._id && item.status == null))
   const statusworkers = bookedworker.filter((item)=> item.bookedworkers.find(item=>item.userid==user._id && item.status != null))

    const handlereviewmodal = (_id) =>{
      setreview({...review,id:_id})
      handlemodalShow()
    }

    const handlereview = async()=>{
    const {id,feedback} = review
    if(!feedback){
      toast.info('please give a review')
    }
      else{
    const token = sessionStorage.getItem("token")
    const reqheader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await userReviewAPI(review,reqheader)
    if(result.status>=200&&result.status<300){
      Swal.fire({
        title: 'Nice!!',
        text: `Your feedback is appreciated`,
        icon: 'success'   
      })
         handlemodalClose()
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


    const handledelete = async(id,name)=>{
      console.log(id);
      const token = sessionStorage.getItem("token")
    const reqheader = {
     "Content-Type":"application/json",
     "Authorization":`Bearer ${token}`
   }

   const result = await deleteReviewAPI(id,reqheader)
   if(result.status>=200&&result.status<300){
    Swal.fire({
      title: 'Deleted!!',
      text: `${name} history removed`,
      icon: 'info'   
    })
    userbookedworkers()
   }
   else{
    Swal.fire({
      title: 'Error!',
      text: `${result.response.data}`,
      icon: 'error'   
    })
   }
    }
    
  return (
    <>
 <Button variant="primary" onClick={handleShow} className="me-2">
        Booked Items
      </Button>
      <Offcanvas show={show} onHide={handleClose} style={{width:'70%'}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='fs-1 text-secondary ms-5'>Booked services</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Worker Name</th>
          <th>Service</th>
          <th>Mobile</th>
          <th>Email</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {userworkers?
        userworkers.map((item,index)=>
        <tr>
          <td>{index+1}</td>
          <td>{item.name}</td>
          <td>{item.bookedworkers.find(d=>d.userid==user._id).service}</td>
          <td>{item.mobileno}</td>
          <td>{item.email}</td>
          <td>Pending</td>
        </tr>):
        <h2 className='text-center text-danger'>No Booked Workers</h2>
        }
      </tbody>
    </Table>


    <h1 className='fs-1 text-secondary ms-5 mt-5'>History</h1>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Worker Name</th>
          <th>Service</th>
          <th>Mobile</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {statusworkers?
        statusworkers.map((item,index)=>
        <tr>
          <td>{index+1}</td>
          <td>{item.name}</td>
          <td>{item.bookedworkers.find(d=>d.userid==user._id).service
          }</td>
          <td>{item.mobileno}</td>
          <td>{item.email}</td>
          <td>{item.bookedworkers.find(d=>d.userid==user._id).status==true?<span className='text-success'>Accepted</span>:<span className='text-danger'>Denied</span>
          }</td>
          <td>{item.bookedworkers.find(d=>d.userid==user._id).status==true&&<button onClick={()=>{handlereviewmodal(item.bookedworkers.map(d=>d._id))}} className='btn btn-success'>Review</button>} 
           <i onClick={()=>{handledelete(item.bookedworkers.map(d=>d._id),item.name)}} style={{color:'red'}} class="fa-solid fa-trash ms-2 fa-xl"></i></td>

        </tr>):
        <h2 className='text-center text-danger'>No status of workers</h2>
        }
      </tbody>
    </Table>

        </Offcanvas.Body>
      </Offcanvas>

      <Modal show={modalshow} onHide={handlemodalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='mb-2'>
      <TextField style={{width:'350px'}} onChange={(e)=>{setreview({...review,feedback:e.target.value})}}  label="Type your Feedback" variant="outlined" />
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlemodalClose}>
            Close
          </Button>
          <Button onClick={handlereview} variant="primary">
            Post
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer
        position="top-center"
        theme="colored"
        autoClose={2000}
      />

    </>
  )
}

export default Usercanvas