import React, { useContext } from 'react'
import { AdminContext } from './context/adminContext'
import { Button } from './ui/button';
import { Edit } from 'lucide-react';

const ProfileInfoRow = ({ label, value }) => (
    <div className="py-3 grid grid-cols-3 gap-4">
        <dt className="text-md font-medium text-gray-500">{label}</dt>
        <dd className="text-md text-stone-800 col-span-2 font-semibold">{value || 'Not provided'}</dd>
    </div>
);

const Profile = () => {
    const { admin } = useContext(AdminContext);
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-gray-200 flex justify-between items-center">
            <div>
                <h1 className='text-3xl font-bold text-orange-900 jost'>Admin Profile</h1>
                <p className="mt-1 text-gray-500">Your administrative account details.</p>
            </div>
            <Button className='gap-2 bg-amber-500 hover:bg-amber-600 text-orange-900 font-bold shadow-md'>
                <Edit size={18}/> Edit
            </Button>
        </div>
        <div className="p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8">
            <img src={admin?.profilePic} alt="Profile" className="w-40 h-40 rounded-full object-cover border-4 border-amber-300 shadow-lg"/>
            <div className="flex-1 w-full">
                <dl className="divide-y divide-gray-200">
                    <ProfileInfoRow label="Full Name" value={admin?.name} />
                    <ProfileInfoRow label="Admin ID" value={admin?.adminId} />
                    <ProfileInfoRow label="Email" value={admin?.email} />
                    <ProfileInfoRow label="Phone" value={admin?.mobile} />
                </dl>
            </div>
        </div>
    </div>
  )
}

export default Profile;