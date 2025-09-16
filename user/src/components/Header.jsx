import React from 'react';
import { Link } from "react-router-dom";
import logo from './../assets/emblem.svg';
import amrit from './../assets/logo-amrit2.png';
import swachh from './../assets/swachh2.png';
import S from './../../../S.png';

const Header = () => {
  return (
    <div className='px-[5vw] py-6 w-full flex justify-between items-center bg-gradient-to-r from-white/90 via-blue-50/80 to-indigo-50/90 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/90 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 shadow-sm'>
      <div className='flex items-center gap-6'>
        <div className='relative'>
          <img 
            src={logo}
            alt="Ashoka Emblem"
            className='w-16 h-16 lg:h-24 lg:w-24 drop-shadow-xl dark:invert dark:brightness-300 animate-pulse-slow cursor-pointer hover:scale-110 transition-transform duration-300'
            onClick={() => window.open('https://www.india.gov.in/', '_blank')}
            title="Visit Government of India Portal"
          />
          <div className='absolute -inset-2 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 rounded-full blur-lg animate-pulse'></div>
        </div>

        <div className='space-y-1'>
          <Link className="navbar-brand group" to="/">
            <span className="flex items-center text-4xl lg:text-6xl font-black text-gradient tracking-tight jost h-12 transition-all duration-500 group-hover:scale-105">
              <img
                  src={S}
                  alt="S"
                  className='animate-bounce-slow'
                  style={{
                      height: '4rem',
                      marginRight: '-8px',
                      transform: 'translateY(-2px)' 
                  }}
              />
              aralSeva
            </span>
          </Link>
          <p className='hidden md:block text-gray-600 dark:text-gray-300 lg:text-lg font-medium transition-colors duration-500'>
            <span className='text-gradient-secondary font-semibold'>Digital India</span> • Simplified Government Services
          </p>
        </div>
      </div>
      
      <div className='flex items-center gap-6'>
        <div className='hidden lg:flex items-center gap-4'>
          <div className='text-right'>
            <p className='text-sm font-semibold text-gray-700 dark:text-gray-300'>Government Initiatives</p>
            <p className='text-xs text-gray-500 dark:text-gray-400'>Digital Transformation</p>
          </div>
        </div>
        
        <div className='flex items-center gap-4'>
          <div className='relative group'>
            <img 
              src={swachh} 
              alt="Swachh Bharat" 
              className='w-16 lg:w-20 md:w-18 transition-all duration-300 hover:scale-110 group-hover:drop-shadow-lg'
            />
            <div className='absolute -inset-1 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          </div>
          <div className='relative group'>
            <img 
              src={amrit} 
              alt="Azadi Ka Amrit Mahotsav" 
              className='w-20 lg:w-24 md:w-22 transition-all duration-300 hover:scale-110 group-hover:drop-shadow-lg'
            />
            <div className='absolute -inset-1 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
