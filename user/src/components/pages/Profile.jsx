import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Button } from "../ui/button";
import { Edit, Key, ArrowLeft, Mail, Phone, MapPin, Globe, User, Shield, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        alert('Please select an image file (JPEG, PNG, etc.)');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('Please select an image smaller than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header with Stats */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white hover:bg-orange-600 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                <p className="text-gray-600">Manage your personal information</p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">Active</div>
                <div className="text-sm text-gray-500">Status</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">Today</div>
                <div className="text-sm text-gray-500">Last Login</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Profile Overview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              {/* Profile Image */}
              <div className="relative mx-auto w-32 h-32 mb-6">
                <div className="w-full h-full rounded-2xl border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-br from-orange-400 to-amber-500">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <User size={48} className="opacity-90" />
                    </div>
                  )}
                </div>
                
                {/* Upload Button */}
                <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-xl flex items-center justify-center cursor-pointer shadow-xl border-2 border-orange-500 hover:bg-orange-500 hover:scale-110 transition-all duration-300">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <Edit size={16} className="text-orange-500 hover:text-white transition-colors" />
                </label>
              </div>

              {/* User Info */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h2>
                <p className="text-gray-600 mb-4">{user.email}</p>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                  <Shield size={14} />
                  Verified Account
                </div>
              </div>

              {/* Member Since */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                    <Calendar size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Member since</div>
                    <div className="text-lg font-bold text-gray-900">October 2025</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details & Actions */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Personal Information */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                  Personal Info
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 rounded-2xl bg-gray-50 hover:bg-orange-50 transition-colors duration-300">
                    <div>
                      <div className="text-sm text-gray-600 font-medium">Full Name</div>
                      <div className="text-lg font-semibold text-gray-900">{user.name}</div>
                    </div>
                    <User size={20} className="text-orange-500" />
                  </div>

                  <div className="flex justify-between items-center p-4 rounded-2xl bg-gray-50 hover:bg-orange-50 transition-colors duration-300">
                    <div>
                      <div className="text-sm text-gray-600 font-medium">Gender</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : "Not specified"}
                      </div>
                    </div>
                    <span className="text-orange-500 text-xl">⚧</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                    <Mail size={20} className="text-white" />
                  </div>
                  Contact Info
                </h3>
                
                <div className="space-y-4">
                  <a 
                    href={`mailto:${user.email}`}
                    className="flex justify-between items-center p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300 group"
                  >
                    <div>
                      <div className="text-sm text-gray-600 font-medium">Email Address</div>
                      <div className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {user.email}
                      </div>
                    </div>
                    <Mail size={20} className="text-blue-500 group-hover:scale-110 transition-transform" />
                  </a>

                  <a 
                    href={`tel:${user.mobile}`}
                    className="flex justify-between items-center p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300 group"
                  >
                    <div>
                      <div className="text-sm text-gray-600 font-medium">Mobile Number</div>
                      <div className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {user.mobile || "Not provided"}
                      </div>
                    </div>
                    <Phone size={20} className="text-blue-500 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Location Information */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                    <MapPin size={20} className="text-white" />
                  </div>
                  Location
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 rounded-2xl bg-gray-50 hover:bg-green-50 transition-colors duration-300">
                    <div>
                      <div className="text-sm text-gray-600 font-medium">Country</div>
                      <div className="text-lg font-semibold text-gray-900">{user.country || "Not specified"}</div>
                    </div>
                    <Globe size={20} className="text-green-500" />
                  </div>

                  <div className="flex justify-between items-center p-4 rounded-2xl bg-gray-50 hover:bg-green-50 transition-colors duration-300">
                    <div>
                      <div className="text-sm text-gray-600 font-medium">State/Region</div>
                      <div className="text-lg font-semibold text-gray-900">{user.state || "Not specified"}</div>
                    </div>
                    <MapPin size={20} className="text-green-500" />
                  </div>
                </div>
              </div>

              {/* Actions Panel */}
              <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl shadow-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
                
                <div className="space-y-4">
                  <Button
                    className="w-full gap-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-4 rounded-2xl border border-white/30 transition-all duration-300 hover:scale-105"
                    onClick={() => navigate("/profile/edit")}
                  >
                    <Edit size={20} />
                    Edit Profile
                  </Button>
                  
                  {/* <Button
                    className="w-full gap-3 bg-white text-orange-600 hover:bg-gray-100 font-semibold py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
                    onClick={() => navigate("/change-password")}
                  >
                    <Key size={20} />
                    Change Password
                  </Button> */}
                </div>

                {/* Security Status */}
                <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield size={16} className="text-green-400" />
                    <div className="text-sm font-semibold">Security Status</div>
                  </div>
                  <div className="text-xs opacity-90">Your account is secure and up to date</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;