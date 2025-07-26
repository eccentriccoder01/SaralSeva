import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { Button } from './ui/button'
import { AdminContext } from './context/adminContext'

const SingleGrievance = () => {
    const {singleGrievance , getSingleGrievance} = useContext(AdminContext)
    const {id} = useParams()
    useEffect(()=>{
      getSingleGrievance(id)
    },[id])
  return (
    <div>
        <h1 className="p-2 text-2xl text-center text-white bg-green-900 rounded-sm">
        Registration No -{singleGrievance?.
grievance_registered_number}
      </h1>
      <fieldset className="border border-green-900 px-[2vw] rounded-md lg:px-[10vw] lg:mt-10 mt-5 ">
        <legend>
            Form Details
        </legend>
        <p className="text-md">
            Name:
            <span className="text-xl font-normal">
              {singleGrievance?.name}
            </span>
          </p>
          <p className="mt-1 text-md">
            DOB:
            <span className="text-xl font-normal">
              {/* {moment(singleGrievance?.DOB).format("DD-MM-YYYY")} */}
            </span>
          </p>
          <p className="mt-1 text-md">
            Gender: 
            <span className="text-xl font-normal">
                {singleGrievance?.gender}
            </span>
          </p>
          <p className="mt-1 text-md">
            Email: 
            <span className="text-xl font-normal">
              {singleGrievance?.email}
            </span>
          </p>
          <p className="mt-1 text-md">
            Mobile:
            <span className="text-xl font-normal">
              {singleGrievance?.mobile}
            </span>
          </p>
          <p className="mt-1 text-md">
            Address:
            <span className="text-xl font-normal">
              {singleGrievance?.address}
            </span>
          </p>
          <p className="mt-1 text-md">
            Country: 
            <span className="text-xl font-normal">
              {singleGrievance?.country}
            </span>
          </p>
          <p className="mt-1 text-md">
            State: 
            <span className="text-xl font-normal">
              {singleGrievance?.state}
            </span>
          </p>
          <p className="mt-1 text-md">
            District: 
            <span className="text-xl font-normal">
              {singleGrievance?.district}
            </span>
          </p>
          <p className="mt-1 text-md">
            Grievance Type: 
            <span className="text-xl font-normal">
              {singleGrievance?.grievance_type}
            </span>
          </p>
          <p className="mt-1 text-md">
            Grievance Category: 
            <span className="text-xl font-normal">
              {singleGrievance?.grievance_category}
            </span>
          </p>
          <p className="mt-1 text-md">
            Document: 
            <span className="text-xl font-normal">
              {singleGrievance?.grievance_category}
            </span>
          </p>
          <p className="mt-1 text-md">
            Description: 
            <span className="text-xl font-normal">
              {singleGrievance?.description}
            </span>
          </p>
          <p className="mt-1 text-md">
            Applied On: 
            <span className="text-xl font-normal">
              {moment(singleGrievance?.createdAt).format("DD-MM_YYYY")}
            </span>
          </p>
          <p className="mt-1 text-md">
            Status:
            <span className="text-xl font-normal">
              {singleGrievance?.status}
            </span>
          </p>
         
      </fieldset>
    </div>
  )
}

export default SingleGrievance
