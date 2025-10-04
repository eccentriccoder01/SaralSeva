import axios from "axios";
import { createContext, useEffect, useState } from "react";



const SchemeContext = createContext();

const SchemeProvider = ({children}) =>{

    const [scheme , setScheme] = useState([])
    
    const getScheme = async () =>{
        try {
            await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/schemes/list_scheme`)
            .then((res) => {
                setScheme(res.data)
            })
        } catch (error) {
            // Error handling without console.log in production
        }
    }

    useEffect(()=>{
        getScheme()
    },[])


   return(
      <SchemeContext.Provider value={{scheme}}>
        {children}
      </SchemeContext.Provider>
   )
}

export {SchemeContext, SchemeProvider}

