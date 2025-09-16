import React from "react";
import map from "./../assets/map.gif";
import swatchh from './../assets/SHS-English.jpg';

const StatCard = ({ title, value, color, icon }) => {
    const colorVariants = {
        blue: 'from-blue-500 to-cyan-500',
        green: 'from-emerald-500 to-teal-500',
        red: 'from-red-500 to-pink-500',
        purple: 'from-violet-500 to-purple-500',
    }
    return (
        <div className={`relative p-8 bg-gradient-to-br ${colorVariants[color]} text-white rounded-3xl shadow-modern transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 group overflow-hidden`}>
            {/* Background pattern */}
            <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Icon */}
            <div className="relative z-10 text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            
            {/* Content */}
            <div className="relative z-10">
                <h2 className="text-lg font-semibold opacity-90 mb-2">{title}</h2>
                <p className="text-4xl lg:text-5xl font-black">{value}</p>
            </div>
            
            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
        </div>
    )
}

const Dashboard = () => {
  return (
    <div className="p-4 lg:p-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen transition-colors duration-300">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-black text-gradient jost mb-4">Digital India Dashboard</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real-time insights into government scheme applications and citizen engagement
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map Section */}
            <div className="group">
              <div className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-modern flex flex-col items-center justify-center transition-all duration-500 hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="text-center mb-6">
                  <h2 className="text-4xl font-black text-gradient jost mb-2">National Presence</h2>
                  <p className="text-gray-600 dark:text-gray-300">Digital services across India</p>
                </div>
                <div className="relative overflow-hidden rounded-2xl">
                  <img src={map} alt="Map of India" className="w-full rounded-2xl group-hover:scale-105 transition-transform duration-500"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-500/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>

            {/* Stats and Initiatives */}
            <div className="space-y-8">
              {/* Swachh Bharat Initiative */}
              <div className="group">
                <div className="relative overflow-hidden rounded-3xl shadow-modern">
                  <img src={swatchh} alt="Swachh Bharat" className="w-full group-hover:scale-105 transition-transform duration-500"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold">Swachh Bharat Mission</h3>
                    <p className="text-sm opacity-90">Clean India Initiative</p>
                  </div>
                </div>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatCard 
                  title="Total Applications" 
                  value="10,000+" 
                  color="purple"
                  icon="📊"
                />
                <StatCard 
                  title="Applications Approved" 
                  value="5,780" 
                  color="green"
                  icon="✅"
                />
                <StatCard 
                  title="Applications Rejected" 
                  value="1,050" 
                  color="red"
                  icon="❌"
                />
                <StatCard 
                  title="Pending Review" 
                  value="3,170" 
                  color="blue"
                  icon="⏳"
                />
              </div>
            </div>
        </div>
    </div>
  );
};

export default Dashboard;
