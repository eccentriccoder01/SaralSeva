import React from "react";
import map from "./../assets/map.gif";
import swatchh from './../assets/SHS-English.jpg';

const StatCard = ({ title, value, color }) => {
    const colorVariants = {
        blue: 'from-blue-500 to-blue-700',
        green: 'from-green-500 to-green-700',
        red: 'from-red-500 to-red-700',
        amber: 'from-amber-500 to-orange-600',
    }
    return (
        <div className={`p-6 bg-gradient-to-br ${colorVariants[color]} text-white rounded-2xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300`}>
            <h2 className="text-xl font-semibold opacity-80">{title}</h2>
            <p className="text-5xl lg:text-6xl font-extrabold mt-2">{value}</p>
        </div>
    )
}

const Dashboard = () => {
  return (
    <div className="p-4 lg:p-8 bg-orange-50/30 dark:bg-gray-900/30 transition-colors duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex flex-col items-center justify-center transition-colors duration-300">
                <h2 className="text-3xl font-bold text-orange-900 dark:text-orange-400 mb-4 jost">National Presence</h2>
                <img src={map} alt="Map of India" className="w-full rounded-lg"/>
            </div>
            <div className="space-y-8">
                <img src={swatchh} alt="Swachh Bharat" className="w-full rounded-2xl shadow-xl"/>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <StatCard title="Total Applications" value="10,000+" color="amber"/>
                    <StatCard title="Applications Approved" value="5,780" color="green"/>
                    <StatCard title="Applications Rejected" value="1,050" color="red"/>
                    <StatCard title="Pending Review" value="3,170" color="blue"/>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Dashboard;
