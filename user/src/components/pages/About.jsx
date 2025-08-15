import React from 'react';
import about from './../../assets/aboutus.png';
import banner from './../../assets/header-banner2.jpg';

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
            <h2 className='text-4xl font-bold text-orange-900 dark:text-orange-400 jost'>Our Mission</h2>
            <p className='leading-relaxed max-w-prose'>
              To strengthen e-Governance in Panchayati Raj Institutions (PRIs) across the country, the Ministry of Panchayati Raj (MoPR) has launched SaralSeva, a user-friendly web-based portal. SaralSeva aims to bring in better transparency in decentralised planning, progress reporting, and work-based accounting.
            </p>
            <p className='leading-relaxed max-w-prose'>
              This application has been monumental in bringing together a tech-based, integrated system for the 2.7 Lakh PRIs across India, fostering a new era of digital governance from the ground up.
            </p>
          </div>
          <div>
            <img
              src={about}
              alt="About SaralSeva"
              className='w-full h-auto rounded-2xl shadow-xl dark:shadow-black/50 hover:scale-105 transition-transform duration-300'
            />
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className='text-4xl font-bold text-orange-900 dark:text-orange-400 jost'>Our Objective</h2>
          <p className='max-w-4xl mx-auto mt-4 leading-relaxed'>
            Based on inputs from various stakeholders, a technical and functional refresh of the SaralSeva application is imperative. The intended objective is to enhance the application with the latest technical advancements and suitable emerging technology integrations. On the functional front, the design of new Key Performance Indicators (KPIs) and Process Reengineering will be our primary focus to better serve the nation.
          </p>
        </div>
      </div>
    </main>
  );
}

export default About;
