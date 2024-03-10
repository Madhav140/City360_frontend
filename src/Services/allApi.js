import { BASE_URL } from "./baseUrl"
import { commonApi } from "./commonApi"



//register api
export const registerAPI = async(user)=>{
    return await commonApi('POST',`${BASE_URL}/user/register`,user,"")
 }


 //login api
export const loginAPI = async(user)=>{
    return await commonApi('POST',`${BASE_URL}/user/login`,user,"")
 }


//workerregister api
export const workeregisterAPI = async(worker,reqheader)=>{
    return await commonApi('POST',`${BASE_URL}/worker/register`,worker,reqheader)
 }

 //workerLogin api
export const workerloginAPI = async(worker)=>{
    return await commonApi('POST',`${BASE_URL}/worker/login`,worker,"")
 }

 //adminLogin api
export const adminloginAPI = async(admin)=>{
    return await commonApi('POST',`${BASE_URL}/admin/login`,admin,"")
 }


  //adminworkers api
export const adminworkersAPI = async(reqheader)=>{
    return await commonApi('GET',`${BASE_URL}/admin/workers`,"",reqheader)
 }


 //admin aproval api
export const adminapprovalAPI = async(id,reqheader)=>{
    return await commonApi('PUT',`${BASE_URL}/admin/workApprove/${id}`,{},reqheader)
 }


  //adminworkers api
export const approvedworkersAPI = async(reqheader)=>{
    return await commonApi('GET',`${BASE_URL}/admin/approvedworkers`,"",reqheader)
 }


  //adminworkers delete api
export const deleteworkersAPI = async(id,reqheader)=>{
    return await commonApi('DELETE',`${BASE_URL}/admin/delete/${id}`,{},reqheader)
 }


 
  //allworkers api
export const allworkersAPI = async(reqheader)=>{
    return await commonApi('GET',`${BASE_URL}/admin/allWorkers`,"",reqheader)
 }


  //allusers api
export const allusersAPI = async(reqheader)=>{
    return await commonApi('GET',`${BASE_URL}/admin/allUsers`,"",reqheader)
 }


 //user booking api
export const userBookingAPI = async(id,body,reqheader)=>{
    return await commonApi('POST',`${BASE_URL}/user/booking/${id}`,body,reqheader)
 }


 
  //allusers api
export const allusersbookedAPI = async(reqheader)=>{
    return await commonApi('GET',`${BASE_URL}/user/bookedworkers`,"",reqheader)
 }


 //user booking api
export const userReviewAPI = async(body,reqheader)=>{
    return await commonApi('POST',`${BASE_URL}/user/review`,body,reqheader)
 }



  //user review delete api
export const deleteReviewAPI = async(id,reqheader)=>{
    return await commonApi('DELETE',`${BASE_URL}/user/delete/${id}`,{},reqheader)
 }


 //admin aproval api
export const UpdateworkerApi = async(id,body,reqheader)=>{
    return await commonApi('PUT',`${BASE_URL}/worker/update/${id}`,body,reqheader)
 }


   //allworkersbooked api
export const allworkerbookedAPI = async(reqheader)=>{
    return await commonApi('GET',`${BASE_URL}/worker/bookedusers`,"",reqheader)
 }


  //worker aproval api
export const workerapprovalAPI = async(id,body,reqheader)=>{
   return await commonApi('PUT',`${BASE_URL}/worker/approve/${id}`,body,reqheader)
}


 //user pswd change api
 export const UserpswdChangeApi = async(body)=>{
   return await commonApi('PUT',`${BASE_URL}/user/password`,body,"")
}