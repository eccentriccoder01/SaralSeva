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
    <div className='px-[5vw] py-4 w-full flex justify-between items-center bg-orange-50/50 dark:bg-gray-900/50 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-500'>
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

      <div className='flex items-center gap-4 md:gap-6'>
        <img 
          src={swachh} 
          alt="Swachh Bharat" 
          data-tooltip-id="tooltip-swachh"
          data-tooltip-content="Swachh Bharat Logo - Clean India Mission"
          className='w-16 lg:w-24 md:w-20 transition-transform duration-300 hover:scale-105'
        />
        <img 
          src={amrit} 
          alt="Azadi Ka Amrit Mahotsav" 
          data-tooltip-id="tooltip-amrit"
          data-tooltip-content="Azadi Ka Amrit Mahotsav - Celebration of 75 Years of Independence"
          className='w-20 lg:w-32 md:w-28 transition-transform duration-300 hover:scale-105'
        />
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
