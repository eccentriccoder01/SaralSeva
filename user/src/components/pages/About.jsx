import React from 'react';
import about from './../../assets/aboutus.png';
import banner from './../../assets/header-banner2.jpg';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const tooltipStyle = {
  backgroundColor: '#FF9933',
  color: '#1F2937',
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

const About = () => {
  return (
    <main className='bg-orange-50/30 dark:bg-gray-900'>
      {/* Banner */}
      <div
        className="relative flex items-center justify-center h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black/50 dark:bg-black/60"></div>
        <h1 className="relative text-5xl font-extrabold text-white jost tracking-wider drop-shadow-lg">
          About SaralSeva
        </h1>
      </div>

      <div className='container mx-auto px-[5vw] py-16 text-lg text-stone-800 dark:text-stone-200'>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 
              className='text-4xl font-bold text-orange-900 dark:text-orange-400 jost'
              data-tooltip-id="mission-tooltip"
              data-tooltip-content="SaralSeva helps PRIs enhance transparency and digital governance."
            >
              Our Mission
            </h2>
            <Tooltip
              id="mission-tooltip"
              place="top"
              style={tooltipStyle}
              multiline
            />

            <p className='leading-relaxed max-w-prose'>
              To strengthen e-Governance in Panchayati Raj Institutions (<span data-tooltip-id="pri-tooltip" data-tooltip-content="PRIs: Panchayati Raj Institutions, local self-government bodies in villages.">PRIs</span>) across the country, the Ministry of Panchayati Raj (MoPR) has launched SaralSeva, a user-friendly web-based portal. SaralSeva aims to bring in better transparency in decentralised planning, progress reporting, and work-based accounting.
            </p>
            <Tooltip
              id="pri-tooltip"
              place="top"
              style={tooltipStyle}
              multiline
            />

            <p className='leading-relaxed max-w-prose'>
              This application has been monumental in bringing together a tech-based, integrated system for the 2.7 Lakh PRIs across India, fostering a new era of digital governance from the ground up.
            </p>
          </div>
          <div>
            <img
              src={about}
              alt="About SaralSeva"
              className='w-full h-auto rounded-2xl shadow-xl dark:shadow-black/50 hover:scale-105 transition-transform duration-300 border-2 border-orange-200'
              data-tooltip-id="about-img-tooltip"
              data-tooltip-content="SaralSeva provides a unified digital platform for governance."
            />
            <Tooltip
              id="about-img-tooltip"
              place="top"
              style={tooltipStyle}
              multiline
            />
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 
            className='text-4xl font-bold text-orange-900 dark:text-orange-400 jost'
            data-tooltip-id="objective-tooltip"
            data-tooltip-content="The objective is a technical and functional refresh with latest technologies."
          >
            Our Objective
          </h2>
          <Tooltip
            id="objective-tooltip"
            place="top"
            style={tooltipStyle}
            multiline
          />

          <p className='max-w-4xl mx-auto mt-4 leading-relaxed'>
            Based on inputs from various stakeholders, a technical and functional refresh of the SaralSeva application is imperative. The intended objective is to enhance the application with the latest technical advancements and suitable emerging technology integrations. On the functional front, the design of new Key Performance Indicators (KPIs) and Process Reengineering will be our primary focus to better serve the nation.
          </p>
        </div>
      </div>
    </main>
  );
}

export default About;
