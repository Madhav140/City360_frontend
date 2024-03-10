import React, { createContext, useState } from 'react'

export const isAuthToken = createContext()
export const Booked = createContext()



function ContextShare({children}) {
  
    const [isloggedOut,SetisloggedOut] = useState(true)
    const [isBooked,setisBooked] = useState(false)
  return (
    <>
      <isAuthToken.Provider value={{isloggedOut,SetisloggedOut}}>
       <Booked.Provider value={{isBooked,setisBooked}}> 
       {children}
       </Booked.Provider>
      </isAuthToken.Provider>
    </>
  )
}

export default ContextShare