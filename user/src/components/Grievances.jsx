import React from "react";
import Slider from "./Slider-6";
import image1 from "./../assets/baner-cpgrams_1.jpg";
import image2 from "./../assets/baner-cpgrams_3.jpg";
import image3 from "./../assets/baner-cpgrams_4.jpg";
import image4 from "./../assets/baner-cpgrams_5.jpg";
import image5 from "./../assets/baner-cpgrams_6.jpg";
import image6 from "./../assets/baner-cpgrams_7.jpg";
import { Info, ListChecks, FileSignature, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Grievances = () => {
  return (
    <div className="bg-orange-50/30 dark:bg-gray-900/30 transition-colors duration-300">
      <Slider
        image1={image1}
        image2={image2}
        image3={image3}
        image4={image4}
        image5={image5}
        image6={image6}
      />

      <h1 className="py-3 text-center font-semibold text-orange-900 dark:text-orange-400 bg-amber-200 dark:bg-orange-800/50 border-y border-amber-300 dark:border-orange-700">
        Important: Any Grievance sent by email will not be attended to. Please lodge your grievance on this portal.
      </h1>

      <div className="px-[5vw] py-12 container mx-auto">
        <h2 className="text-4xl font-extrabold text-orange-900 dark:text-orange-400 jost">About CPGRAMS</h2>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Centralised Public Grievance Redress and Monitoring System (CPGRAMS) is an online platform available to citizens 24x7 to lodge their grievances to public authorities on any subject related to service delivery. It is a single portal connected to all the Ministries/Departments of Government of India and States.
        </p>
        <p className="mt-3 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          The status of any grievance can be tracked with the unique registration ID. CPGRAMS also provides an appeal facility if citizens are not satisfied with the resolution.
        </p>

        <div className="mt-12 p-6 bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 rounded-r-lg transition-colors duration-300">
            <p className="flex items-center gap-3 text-xl font-bold text-red-800 dark:text-red-300">
              <Info className="w-6 h-6" />
              Issues Not Taken Up for Redressal:
            </p>
            <ul className="mt-4 space-y-2 list-disc list-inside text-red-900 dark:text-red-400">
                <li>RTI Matters</li>
                <li>Court related / Sub-judice matters</li>
                <li>Religious matters</li>
                <li>Suggestions</li>
                <li>Grievances of Government employees concerning their service matters.</li>
            </ul>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-8 py-16 md:flex-row bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="w-full max-w-sm p-8 bg-orange-50 dark:bg-gray-700 text-center rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
            <FileSignature className="w-20 h-20 mx-auto text-orange-600 dark:text-orange-400"/>
            <h3 className="mt-4 text-2xl font-bold text-stone-800 dark:text-gray-200">Lodge a Grievance</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Submit a new grievance through our simplified form.</p>
            <Link to='/grievances/grievances_registration_form'>
              <Button className="mt-6 font-bold text-white uppercase bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg shadow-md px-7 py-5">Register Now</Button>
            </Link>
        </div>
        <div className="w-full max-w-sm p-8 bg-orange-50 dark:bg-gray-700 text-center rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
            <ListChecks className="w-20 h-20 mx-auto text-orange-600 dark:text-orange-400"/>
            <h3 className="mt-4 text-2xl font-bold text-stone-800 dark:text-gray-200">Check Status</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Track the progress of your submitted grievances.</p>
            <Link to='/status'>
              <Button className="mt-6 font-bold text-white uppercase bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg shadow-md px-7 py-5">View Status</Button>
            </Link>
        </div>
        <div className="w-full max-w-sm p-8 bg-orange-50 dark:bg-gray-700 text-center rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
            <Users className="w-20 h-20 mx-auto text-orange-600 dark:text-orange-400"/>
            <h3 className="mt-4 text-2xl font-bold text-stone-800 dark:text-gray-200">Contact Us</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Get in touch with the appropriate authorities.</p>
            <Link to='/contact'>
              <Button className="mt-6 font-bold text-white uppercase bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg shadow-md px-7 py-5">Contact Us</Button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Grievances;
