import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import image1 from "./../../../assets/home_slider1.jpg";
import image2 from "./../../../assets/home_slider2.jpg";
import image3 from "./../../../assets/home_slider3.jpg";
import image4 from "./../../../assets/home_slider4.jpg";
import image5 from "./../../../assets/home_slider5.jpg";
import announcement_icon from "./../../../assets/announcement.svg";
import { Link } from "react-router-dom";
import apply from "./../../../assets/apply.svg";
import search from "./../../../assets/search.svg";
import check from "./../../../assets/check.svg";
import axios from "axios";

// Wave background SVG component
const WaveBackground = () => (
  <div className="absolute top-0 left-0 w-full h-full opacity-10 z-0">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#FF9933"
        fillOpacity="1"
        d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,224C960,245,1056,235,1152,208C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
  </div>
);

const Home = () => {
  const [announcements, setAnnouncements] = useState([]);

  const getAnnouncements = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/announcement/get_announcement`
      );
      setAnnouncements(res.data.announcement || []);
    } catch (error) {
      console.error("Failed to fetch announcements:", error);
    }
  };

  useEffect(() => {
    getAnnouncements();
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative min-h-screen">
      {/* Image Slider */}
      <Slider
        image1={image1}
        image2={image2}
        image3={image3}
        image4={image4}
        image5={image5}
      />

      {/* Announcements Ticker */}
      <div className="flex items-center bg-gradient-to-r from-violet-900 via-purple-900 to-indigo-900 text-white overflow-hidden shadow-modern">
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 z-10">
          <h2 className="text-sm font-bold tracking-wider whitespace-nowrap md:text-md flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            LATEST UPDATES
          </h2>
        </div>
        <div className="relative flex-1 h-full flex items-center">
          <div className="animate-ticker flex flex-row items-center gap-20 py-4 whitespace-nowrap">
            {announcements.length > 0 ? (
              [...announcements, ...announcements].map((item, index) => (
                <div key={index} className="flex flex-row items-center gap-3 group">
                  <img src={announcement_icon} alt="" className="w-6 h-6 group-hover:animate-bounce" />
                  <p className="group-hover:text-violet-200 transition-colors duration-300">{item.announcement_details}</p>
                </div>
              ))
            ) : (
              <p className="px-4 text-violet-200">No recent announcements.</p>
            )}
          </div>
        </div>
      </div>

      {/* Scheme Cards */}
<div className="container mx-auto px-4 py-20 text-center">
  <div className="space-y-6 mb-16">
    <h2 className="text-5xl lg:text-6xl font-black text-gradient jost">
      Gateway to Citizen-Centric Services
    </h2>
    <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
      Explore, Discover, and Apply for Schemes that Empower You. 
      <span className="text-gradient-secondary font-semibold"> Digital India</span> at your fingertips.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {[
      { 
        title: "योजनाओं की जानकारी", 
        subtitle: "Information of Schemes", 
        link: "/schemes",
        gradient: "from-blue-500 to-cyan-500",
        icon: "📋"
      },
      { 
        title: "योजनाओं के लाभार्थी", 
        subtitle: "Beneficiaries of Schemes", 
        link: "/schemes",
        gradient: "from-green-500 to-emerald-500",
        icon: "👥"
      },
      { 
        title: "योजनाओं की पात्रता", 
        subtitle: "Scheme Eligibility", 
        link: "/scheme_eligibity",
        gradient: "from-purple-500 to-violet-500",
        icon: "✅"
      },
      { 
        title: "योजनाओं की पहुँच", 
        subtitle: "Scheme Penetration", 
        link: "/dashboard",
        gradient: "from-orange-500 to-red-500",
        icon: "📊"
      },
    ].map((card, index) => (
      <Link to={card.link} key={index} className="group">
        <div className="relative p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transform hover:-translate-y-3 transition-all duration-500 cursor-pointer h-full flex flex-col justify-center items-center overflow-hidden">
          {/* Background gradient effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
          
          {/* Icon */}
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {card.icon}
          </div>
          
          {/* Content */}
          <div className="relative z-10 text-center">
            <p className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-gradient transition-all duration-300">
              {card.title}
            </p>
            <p className="mt-3 text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
              {card.subtitle}
            </p>
          </div>
          
          {/* Hover effect border */}
          <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-${card.gradient.split(' ')[1]} group-hover:to-${card.gradient.split(' ')[3]} transition-all duration-500`}></div>
        </div>
      </Link>
    ))}
  </div>
</div>

      {/* How It Works Section */}
      <div className="py-24 bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-indigo-500/5"></div>
        
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full animate-pulse"></div>
            <p className="text-sm font-semibold text-gradient">HOW IT WORKS</p>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-gradient jost mb-6">
            Government Schemes, Simplified in 3 Steps
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience the future of government services with our streamlined process
          </p>
        </div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-20 px-4">
          {[ 
            { 
              icon: check, 
              title: "Enter Details", 
              description: "Start by providing your basic details to help us understand your needs and eligibility criteria.", 
              gradient: "from-emerald-500 to-teal-500",
              bg: "from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20",
              step: "01"
            },
            { 
              icon: search, 
              title: "Find Your Schemes", 
              description: "Our intelligent AI engine finds and presents the most relevant government schemes tailored for you.", 
              gradient: "from-blue-500 to-cyan-500",
              bg: "from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20",
              step: "02"
            },
            { 
              icon: apply, 
              title: "Select & Apply", 
              description: "Review the matched schemes and apply directly through our simplified, user-friendly portal.", 
              gradient: "from-purple-500 to-violet-500",
              bg: "from-purple-100 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20",
              step: "03"
            },
          ].map((step, index) => (
            <div 
              key={index} 
              className="group relative"
            >
              {/* Step number */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full flex items-center justify-center font-black text-lg z-20 group-hover:scale-110 transition-transform duration-300">
                {step.step}
              </div>
              
              <div className="relative p-8 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 hover:-translate-y-2 h-full">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.bg} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Icon container */}
                <div className={`relative inline-flex p-6 rounded-2xl bg-gradient-to-br ${step.bg} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <img src={step.icon} alt={step.title} className="w-12 h-12" />
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-gradient transition-all duration-300 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>
                
                {/* Connecting line for desktop */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-violet-300 to-purple-300 transform -translate-y-1/2"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;
