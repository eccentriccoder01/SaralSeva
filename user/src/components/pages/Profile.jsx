import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileInfoRow = ({ label, value }) => (
  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
    <dt className="text-md font-medium text-gray-500 dark:text-gray-400">{label}</dt>
    <dd className="mt-1 text-md text-stone-800 dark:text-stone-200 sm:mt-0 sm:col-span-2 font-semibold">{value || "N/A"}</dd>
  </div>
);

const Profile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-xl text-gray-500 dark:text-gray-400">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="px-[5vw] py-12 bg-orange-50/30 dark:bg-gray-900/30">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-black/40 overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-orange-900 dark:text-amber-400 jost">My Profile</h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">Your personal details and information.</p>
          </div>
          <Button
            className="gap-2 bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-orange-900 dark:text-gray-900 font-bold shadow-md hover:shadow-lg transition-all"
            onClick={() => navigate("/profile/edit")}
          >
            <Edit size={18} /> Edit Profile
          </Button>
        </div>
        <div className="px-6 sm:px-8 py-4">
          <dl className="divide-y divide-gray-200 dark:divide-gray-700">
            <ProfileInfoRow label="Full Name" value={user.name} />
            <ProfileInfoRow label="Gender" value={user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : "N/A"} />
            <ProfileInfoRow label="Email Address" value={user.email} />
            <ProfileInfoRow label="Mobile Number" value={user.mobile} />
            <ProfileInfoRow label="Country" value={user.country} />
            <ProfileInfoRow label="State" value={user.state} />
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Profile;
