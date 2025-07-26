import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { AdminContext } from './context/adminContext'

const InfoRow = ({ label, value }) => (
    <div className="py-3 grid grid-cols-3 gap-4">
        <p className="text-md font-medium text-gray-500">{label}</p>
        <p className="text-lg font-semibold text-stone-800 col-span-2">{value || 'N/A'}</p>
    </div>
);

const SingleGrievance = () => {
    const { singleGrievance, getSingleGrievance } = useContext(AdminContext);
    const { id } = useParams();
    useEffect(() => {
      getSingleGrievance(id);
    }, [id, getSingleGrievance]);

  return (
    <div className='space-y-6'>
      <div className="p-4 text-2xl font-bold text-center text-white bg-orange-800 rounded-lg shadow-md">
        Grievance No - {singleGrievance?.grievance_registered_number}
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className='text-2xl font-bold text-orange-900 border-b pb-2 mb-4 jost'>Grievance Details</h2>
        <div className="divide-y divide-gray-200">
            <InfoRow label="Name" value={singleGrievance?.name} />
            <InfoRow label="DOB" value={moment(singleGrievance?.DOB).format("DD-MM-YYYY")} />
            <InfoRow label="Gender" value={singleGrievance?.gender} />
            <InfoRow label="Email" value={singleGrievance?.email} />
            <InfoRow label="Mobile" value={singleGrievance?.mobile} />
            <InfoRow label="Address" value={`${singleGrievance?.address}, ${singleGrievance?.district}, ${singleGrievance?.state}`} />
            <InfoRow label="Grievance Type" value={singleGrievance?.grievance_type} />
            <InfoRow label="Category" value={singleGrievance?.grievance_category} />
            <InfoRow label="Description" value={singleGrievance?.description} />
            <InfoRow label="Applied On" value={moment(singleGrievance?.createdAt).format("DD-MM-YYYY")} />
            <InfoRow label="Status" value={singleGrievance?.status} />
        </div>
      </div>
    </div>
  )
}

export default SingleGrievance;