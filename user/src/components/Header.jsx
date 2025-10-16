import React from 'react';
import { Link } from "react-router-dom";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import logo from './../assets/emblem.svg';
import amrit from './../assets/logo-amrit2.png';
import swachh from './../assets/swachh2.png';
import S from './../../../S.png';

const tooltipStyle = {
  backgroundColor: "#FF9933",
  color: "#1F2937",
  padding: "8px 12px",
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: 500,
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  zIndex: 9999,
};

const Header = () => {
  return (
    <div className='w-full bg-orange-50/50 dark:bg-gray-900/50 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-500 px-4 sm:px-[5vw] py-4'>

      {/* ✅ Desktop layout */}
      <div className='hidden md:flex justify-between items-center'>
        {/* Left - Emblem + Brand */}
        <div className='flex items-center gap-4'>
          <img 
            src={logo} 
            alt="Ashoka Emblem" 
            data-tooltip-id="tooltip-emblem"
            data-tooltip-content="Ashoka Emblem - National Symbol"
            className='w-14 h-14 lg:h-20 lg:w-20 drop-shadow-lg dark:invert dark:brightness-300' 
          />

          <div>
            <Link className="navbar-brand" to="/">
              <span className="flex items-center text-3xl lg:text-5xl font-extrabold text-orange-900 dark:text-orange-400 tracking-tight jost h-10 transition-colors duration-500">
                <img
                  src={S}
                  alt="S"
                  data-tooltip-id="tooltip-s"
                  data-tooltip-content="S - SaralSeva Initial"
                  style={{
                      height: '3.5rem',
                      marginRight: '-12px',
                      transform: 'translateY(-2px)' 
                  }}
                />
                aralSeva
              </span>
            </Link>
            <p className='hidden md:block text-gray-600 dark:text-gray-300 lg:text-lg mt-1 transition-colors duration-500'>
              Simplified Work Based Accounting Application for Panchayati Raj
            </p>
          </div>
        </div>

        {/* Right - Logos */}
        <div className='flex items-center gap-4 md:gap-6'>
          <div className='dark:bg-white dark:p-3 dark:rounded-xl dark:border-2 dark:border-orange-500 transition-all duration-300 dark:w-32 dark:h-24 dark:flex dark:items-center dark:justify-center lg:dark:w-36 lg:dark:h-28'>
            <img 
              src={swachh} 
              alt="Swachh Bharat" 
              data-tooltip-id="tooltip-swachh"
              data-tooltip-content="Swachh Bharat Logo - Clean India Mission"
              className='w-20 lg:w-24 transition-transform duration-300 hover:scale-105'
            />
          </div>
          <div className='dark:bg-white dark:p-3 dark:rounded-xl dark:border-2 dark:border-orange-500 transition-all duration-300 dark:w-32 dark:h-24 dark:flex dark:items-center dark:justify-center lg:dark:w-36 lg:dark:h-28'>
            <img 
              src={amrit} 
              alt="Azadi Ka Amrit Mahotsav" 
              data-tooltip-id="tooltip-amrit"
              data-tooltip-content="Azadi Ka Amrit Mahotsav - Celebration of 75 Years of Independence"
              className='w-24 lg:w-32 transition-transform duration-300 hover:scale-105'
            />
          </div>
        </div>
      </div>

      {/* ✅ Mobile layout (<768px) */}
      <div className='grid md:hidden grid-cols-2 items-center text-center gap-y-4 gap-x-4'>
        {/* Emblem */}
        <div className="flex justify-center">
          <img
            src={logo}
            alt="Ashoka Emblem"
            data-tooltip-id="tooltip-emblem"
            data-tooltip-content="Ashoka Emblem - National Symbol"
            className='w-12 sm:w-14 h-auto drop-shadow-lg dark:invert dark:brightness-300 transition-all duration-300'
          />
        </div>

        {/* Brand */}
        <div className="flex flex-col items-center justify-center text-center">
          <Link 
            to="/" 
            className="flex items-center justify-center text-2xl sm:text-3xl font-extrabold text-orange-900 dark:text-orange-400 tracking-tight transition-all duration-500"
          >
            <img
              src={S}
              alt="S"
              data-tooltip-id="tooltip-s"
              data-tooltip-content="S - SaralSeva Initial"
              className='h-10 mr-[-8px]'
            />
            aralSeva
          </Link>
          <p className='text-gray-600 dark:text-gray-300 text-sm mt-1 text-center max-w-[260px] px-2'>
            Simplified Work Based Accounting Application for Panchayati Raj
          </p>
        </div>

        {/* Swachh Bharat */}
        <div className="flex justify-center col-span-1">
          <div className='dark:bg-white dark:p-2 dark:rounded-lg dark:border-2 dark:border-orange-500 transition-all duration-300 dark:w-32 dark:h-28 dark:flex dark:items-center dark:justify-center sm:dark:w-36 sm:dark:h-32'>
            <img
              src={swachh}
              alt="Swachh Bharat"
              data-tooltip-id="tooltip-swachh"
              data-tooltip-content="Swachh Bharat Logo - Clean India Mission"
              className='w-24 sm:w-28 h-auto transition-transform duration-300 hover:scale-105'
            />
          </div>
        </div>

        {/* Amrit */}
        <div className="flex justify-center col-span-1">
          <div className='dark:bg-white dark:p-2 dark:rounded-lg dark:border-2 dark:border-orange-500 transition-all duration-300 dark:w-32 dark:h-28 dark:flex dark:items-center dark:justify-center sm:dark:w-36 sm:dark:h-32'>
            <img
              src={amrit}
              alt="Azadi Ka Amrit Mahotsav"
              data-tooltip-id="tooltip-amrit"
              data-tooltip-content="Azadi Ka Amrit Mahotsav - 75 Years of Independence"
              className='w-28 sm:w-32 h-auto transition-transform duration-300 hover:scale-105'
            />
          </div>
        </div>
      </div>

      {/* Tooltips */}
      <ReactTooltip id="tooltip-emblem" style={tooltipStyle} />
      <ReactTooltip id="tooltip-s" style={tooltipStyle} />
      <ReactTooltip id="tooltip-swachh" style={tooltipStyle} />
      <ReactTooltip id="tooltip-amrit" style={tooltipStyle} />
    </div>
  );
}

export default Header;