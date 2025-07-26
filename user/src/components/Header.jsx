import React from 'react';
import { Link } from "react-router-dom";
import logo from './../assets/emblem.svg';
import amrit from './../assets/logo-amrit2.png';
import swachh from './../assets/swachh2.png';
import S from './../../../S.png';

const Header = () => {
  return (
    <div className='px-[5vw] py-4 w-full flex justify-between items-center bg-orange-50/50 backdrop-blur-sm border-b border-gray-200'>
      <div className='flex items-center gap-4'>
        <img 
          src={logo} 
          alt="Ashoka Emblem" 
          className='w-14 h-14 lg:h-20 lg:w-20 drop-shadow-lg' 
        />
        <div>
          <Link className="navbar-brand" to="/">
              <span className="flex items-center text-3xl lg:text-5xl font-extrabold text-orange-900 tracking-tight jost h-10">
                  <img
                      src={S}
                      alt="S"
                      style={{
                          height: '3.5rem',
                          marginRight: '-12px',
                          transform: 'translateY(-2px)' 
                      }}
                  />
                  aralSeva
              </span>
          </Link>
          <p className='hidden md:block text-gray-600 lg:text-lg mt-1'>
            Simplified Work Based Accounting Application for Panchayati Raj
          </p>
        </div>
      </div>
      <div className='flex items-center gap-4 md:gap-6'>
        <img 
          src={swachh} 
          alt="Swachh Bharat" 
          className='w-16 lg:w-24 md:w-20 transition-transform duration-300 hover:scale-105'
        />
        <img 
          src={amrit} 
          alt="Azadi Ka Amrit Mahotsav" 
          className='w-20 lg:w-32 md:w-28 transition-transform duration-300 hover:scale-105'
        />
      </div>
    </div>
  );
}

export default Header;