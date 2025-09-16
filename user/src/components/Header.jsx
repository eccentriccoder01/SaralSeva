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


        <div className='space-y-1'>
          <Link className="navbar-brand group" to="/">
            <span className="flex items-center text-4xl lg:text-6xl font-black text-gradient tracking-tight jost h-12 transition-all duration-500 group-hover:scale-105">
              <img
                  src={S}
                  alt="S"

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
