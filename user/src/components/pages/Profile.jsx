import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';

const tooltipStyle = {
  backgroundColor: '#FF9933', // orange theme
  color: '#1F2937', // dark text
  padding: '8px 12px',
  borderRadius: '12px',
  fontSize: '14px',
  fontWeight: 500,
  textAlign: 'center',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  maxWidth: '220px',
  whiteSpace: 'pre-line',
  zIndex: 9999,
};

const ProfileInfoRow = ({ label, value, tooltip, isLink }) => (
  <div
    className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 px-3 hover:bg-orange-50/40 dark:hover:bg-gray-800/40 rounded-lg transition-colors"
    data-tooltip-id={`${label}-tooltip`}
    data-tooltip-content={tooltip}
  >
    <dt className="text-md font-medium text-gray-600 dark:text-gray-400">{label}</dt>
    <dd className="mt-1 text-md text-stone-900 dark:text-stone-200 sm:mt-0 sm:col-span-2 font-semibold">
      {isLink && value ? (
        <a
          href={isLink === "email" ? `mailto:${value}` : `tel:${value}`}
          className="text-amber-600 hover:underline"
        >
          {value}
        </a>
      ) : (
        value || "N/A"
      )}
    </dd>
    <Tooltip id={`${label}-tooltip`} place="top" style={tooltipStyle} />
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
            <ProfileInfoRow label="Full Name" value={user.name} tooltip="This is your registered name." />
            <ProfileInfoRow label="Gender" value={user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : "N/A"} tooltip="Your selected gender." />
            <ProfileInfoRow label="Email Address" value={user.email} tooltip="Click to send an email." isLink="email" />
            <ProfileInfoRow label="Mobile Number" value={user.mobile} tooltip="Click to call this number." isLink="phone" />
            <ProfileInfoRow label="Country" value={user.country} tooltip="Your registered country." />
            <ProfileInfoRow label="State" value={user.state} tooltip="Your registered state." />
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Profile;
