import axios from "axios";
import { ExternalLink } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import facebook from "./../../../assets/facebook.png";
import youtube from "./../../../assets/youtube.png";
import x from "./../../../assets/x.png";
import instagram from "./../../../assets/instagram.png";
import { Link, Element } from "react-scroll";

const SchemeDetails = () => {
  const [scheme, setScheme] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getScheme = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/schemes/single_scheme/${id}`);
        setScheme(res.data.scheme);
      } catch (error) {
        console.error("Failed to fetch scheme details:", error);
      }
    };
    getScheme();
  }, [id]);

  const handleClick = () => {
    if (scheme.scheme_brochure) {
      window.open(scheme.scheme_brochure, '_blank');
    }
  };

  const navLinkClasses = "block cursor-pointer px-4 py-3 text-md font-medium text-stone-700 rounded-lg hover:bg-amber-100 transition-colors duration-200";
  const activeNavLinkClasses = "bg-orange-600 text-white shadow-md";

  return (
    <div className="px-[5vw] flex justify-between gap-10 py-12 bg-orange-50/30">
      <aside className="w-1/5 sticky top-24 self-start hidden lg:block bg-white p-4 rounded-xl shadow-lg">
        <nav className="flex flex-col gap-2">
          <Link to="details" smooth={true} duration={500} spy={true} activeClass={activeNavLinkClasses} offset={-100} className={navLinkClasses}>Details</Link>
          <Link to="benefits" smooth={true} duration={500} spy={true} activeClass={activeNavLinkClasses} offset={-100} className={navLinkClasses}>Benefits</Link>
          <Link to="eligibility" smooth={true} duration={500} spy={true} activeClass={activeNavLinkClasses} offset={-100} className={navLinkClasses}>Eligibility</Link>
          <Link to="application" smooth={true} duration={500} spy={true} activeClass={activeNavLinkClasses} offset={-100} className={navLinkClasses}>Application Process</Link>
          <Link to="document" smooth={true} duration={500} spy={true} activeClass={activeNavLinkClasses} offset={-100} className={navLinkClasses}>Documents Required</Link>
          <Link to="sources" smooth={true} duration={500} spy={true} activeClass={activeNavLinkClasses} offset={-100} className={navLinkClasses}>Sources & References</Link>
        </nav>
      </aside>

      <main className="w-full lg:w-3/5 bg-white p-8 sm:p-10 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-orange-900 jost">{scheme.scheme_name}</h1>
        <p className="mt-2 text-lg font-semibold text-gray-500 uppercase">{scheme.scheme_dept}</p>

        <Element name="details" className="mt-12">
          <h2 className="text-3xl font-bold text-orange-800 jost border-b-2 border-amber-300 pb-2">Details</h2>
          <p className="mt-4 text-gray-600">Scheme Code: <span className="font-semibold text-stone-800">{scheme.scheme_code}</span></p>
          <p className="mt-4 text-lg leading-relaxed text-gray-700">{scheme.scheme_details}</p>
        </Element>

        <Element name="benefits" className="mt-12">
          <h2 className="text-3xl font-bold text-orange-800 jost border-b-2 border-amber-300 pb-2">Benefits</h2>
          <ul className="mt-4 space-y-3 list-disc list-inside text-lg text-gray-700">
            {scheme.scheme_benefits?.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </Element>

        <Element name="eligibility" className="mt-12">
          <h2 className="text-3xl font-bold text-orange-800 jost border-b-2 border-amber-300 pb-2">Eligibility</h2>
          <ul className="mt-4 space-y-3 list-disc list-inside text-lg text-gray-700">
            {scheme.scheme_eligibility?.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </Element>

        <Element name="application" className="mt-12">
          <h2 className="text-3xl font-bold text-orange-800 jost border-b-2 border-amber-300 pb-2">Application Process</h2>
          <p className="mt-4 text-lg text-gray-700">1. Registration on SaralSeva Portal: <Link to="/register" className="font-semibold text-orange-700 hover:underline">Register</Link></p>
          <p className="mt-3 text-lg text-gray-700">2. Already have an account? <Link to="/login" className="font-semibold text-orange-700 hover:underline">Login</Link></p>
          <p className="mt-3 text-lg text-gray-700">3. Fill in the required details in the scheme application form.</p>
        </Element>

        <Element name="document" className="mt-12">
          <h2 className="text-3xl font-bold text-orange-800 jost border-b-2 border-amber-300 pb-2">Documents Required</h2>
          <ul className="mt-4 space-y-3 list-disc list-inside text-lg text-gray-700">
            {scheme.scheme_documents_required?.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </Element>

        <Element name="sources" className="mt-12">
          <h2 className="text-3xl font-bold text-orange-800 jost border-b-2 border-amber-300 pb-2">Sources and References</h2>
          <button onClick={handleClick} className="flex items-center gap-2 mt-4 text-lg font-semibold text-orange-700 transition-transform hover:scale-105">
            View Guidelines <ExternalLink className="hover:text-amber-600" />
          </button>
        </Element>
      </main>

      <aside className="w-1/5 sticky top-24 self-start hidden lg:block">
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h3 className="bg-orange-100 text-orange-900 font-bold p-3 rounded-t-lg">News and Updates</h3>
          <p className="p-3 text-gray-500">No new updates available.</p>
          <h3 className="bg-orange-100 text-orange-900 font-bold p-3 mt-4 rounded-t-lg">Share This Scheme</h3>
          <div className="flex items-center justify-center gap-4 py-4">
            <a href="#" className="transition duration-300 hover:-translate-y-1"><img src={facebook} alt="Facebook" /></a>
            <a href="#" className="transition duration-300 hover:-translate-y-1"><img src={instagram} alt="Instagram" /></a>
            <a href="#" className="transition duration-300 hover:-translate-y-1"><img src={x} alt="X / Twitter" /></a>
            <a href="#" className="transition duration-300 hover:-translate-y-1"><img src={youtube} alt="YouTube" /></a>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SchemeDetails;