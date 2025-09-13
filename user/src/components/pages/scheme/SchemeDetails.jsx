import axios from "axios";
import { ExternalLink } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import facebook from "./../../../assets/facebook.png";
import youtube from "./../../../assets/youtube.png";
import x from "./../../../assets/x.png";
import instagram from "./../../../assets/instagram.png";
import { Link, Element } from "react-scroll";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

// Tooltip style (same as Footer)
const tooltipStyle = {
  backgroundColor: "#FF9933", // orange theme
  color: "#1F2937", // dark text
  padding: "8px 12px",
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: 500,
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  maxWidth: "220px",
  whiteSpace: "pre-line",
  zIndex: 9999,
};

const SchemeDetails = () => {
  const [scheme, setScheme] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getScheme = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/schemes/single_scheme/${id}`
        );
        setScheme(res.data.scheme);
      } catch (error) {
        console.error("Failed to fetch scheme details:", error);
      }
    };
    getScheme();
  }, [id]);

  const handleClick = () => {
    if (scheme.scheme_brochure) {
      window.open(scheme.scheme_brochure, "_blank");
    }
  };

  const navLinkClasses =
    "block cursor-pointer px-4 py-3 text-md font-medium text-stone-700 rounded-lg hover:bg-amber-100 transition-colors duration-200 dark:text-gray-200 dark:hover:bg-orange-700/30";
  const activeNavLinkClasses = "bg-orange-600 text-white shadow-md";

  return (
    <div className="px-[5vw] flex justify-between gap-10 py-12 bg-orange-50/30 dark:bg-gray-900/30">
      {/* Sidebar navigation */}
      <aside className="w-1/5 sticky top-24 self-start hidden lg:block bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg dark:shadow-black/40">
        <nav className="flex flex-col gap-2">
          <Link
            to="details"
            smooth={true}
            duration={500}
            spy={true}
            activeClass={activeNavLinkClasses}
            offset={-100}
            className={navLinkClasses}
          >
            Details
          </Link>
          <Link
            to="benefits"
            smooth={true}
            duration={500}
            spy={true}
            activeClass={activeNavLinkClasses}
            offset={-100}
            className={navLinkClasses}
          >
            Benefits
          </Link>
          <Link
            to="eligibility"
            smooth={true}
            duration={500}
            spy={true}
            activeClass={activeNavLinkClasses}
            offset={-100}
            className={navLinkClasses}
          >
            Eligibility
          </Link>
          <Link
            to="application"
            smooth={true}
            duration={500}
            spy={true}
            activeClass={activeNavLinkClasses}
            offset={-100}
            className={navLinkClasses}
          >
            Application Process
          </Link>
          <Link
            to="document"
            smooth={true}
            duration={500}
            spy={true}
            activeClass={activeNavLinkClasses}
            offset={-100}
            className={navLinkClasses}
          >
            Documents Required
          </Link>
          <Link
            to="sources"
            smooth={true}
            duration={500}
            spy={true}
            activeClass={activeNavLinkClasses}
            offset={-100}
            className={navLinkClasses}
          >
            Sources & References
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="w-full lg:w-3/5 bg-white dark:bg-gray-800 dark:text-gray-200 p-8 sm:p-10 rounded-2xl shadow-2xl dark:shadow-black/40">
        <h1 className="text-4xl font-extrabold text-orange-900 dark:text-amber-400 jost">
          {scheme.scheme_name}
        </h1>
        <p className="mt-2 text-lg font-semibold text-gray-500 dark:text-gray-300 uppercase">
          {scheme.scheme_dept}
        </p>

        <Element name="details" className="mt-12">
          <h2 className="text-3xl font-bold text-orange-800 dark:text-amber-400 jost border-b-2 border-amber-300 pb-2">
            Details
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Scheme Code:{" "}
            <span className="font-semibold text-stone-800 dark:text-gray-200">
              {scheme.scheme_code}
            </span>
          </p>
          <p className="mt-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {scheme.scheme_details}
          </p>
        </Element>

        <Element name="benefits" className="mt-12">
          <h2 className="text-3xl font-bold text-orange-800 dark:text-amber-400 jost border-b-2 border-amber-300 pb-2">
            Benefits
          </h2>
          <ul className="mt-4 space-y-3 list-disc list-inside text-lg text-gray-700 dark:text-gray-300">
            {scheme.scheme_benefits?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Element>

        <Element name="eligibility" className="mt-12">
          <h2 className="text-3xl font-bold text-orange-800 dark:text-amber-400 jost border-b-2 border-amber-300 pb-2">
            Eligibility
          </h2>
          <ul className="mt-4 space-y-3 list-disc list-inside text-lg text-gray-700 dark:text-gray-300">
            {scheme.scheme_eligibility?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Element>

        <Element name="application" className="mt-12">
          <h2 className="text-3xl font-bold text-orange-800 dark:text-amber-400 jost border-b-2 border-amber-300 pb-2">
            Application Process
          </h2>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            1. Registration on SaralSeva Portal:{" "}
            <RouterLink
              to="/register"
              className="font-semibold text-orange-700 dark:text-amber-300 hover:underline"
            >
              Register
            </RouterLink>
          </p>
          <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">
            2. Already have an account?{" "}
            <RouterLink
              to="/login"
              className="font-semibold text-orange-700 dark:text-amber-300 hover:underline"
            >
              Login
            </RouterLink>
          </p>
          <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">
            3. Fill in the required details in the scheme application form.
          </p>
        </Element>

        <Element name="document" className="mt-12">
          <h2 className="text-3xl font-bold text-orange-800 dark:text-amber-400 jost border-b-2 border-amber-300 pb-2">
            Documents Required
          </h2>
          <ul className="mt-4 space-y-3 list-disc list-inside text-lg text-gray-700 dark:text-gray-300">
            {scheme.scheme_documents_required?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Element>

        <Element name="sources" className="mt-12">
          <h2 className="text-3xl font-bold text-orange-800 dark:text-amber-400 jost border-b-2 border-amber-300 pb-2">
            Sources and References
          </h2>
          <button
            onClick={handleClick}
            className="flex items-center gap-2 mt-4 text-lg font-semibold text-orange-700 dark:text-amber-300 transition-transform hover:scale-105"
          >
            View Guidelines{" "}
            <ExternalLink className="hover:text-amber-600 dark:hover:text-orange-400" />
          </button>
        </Element>
      </main>

      {/* Right sidebar */}
      <aside className="w-1/5 sticky top-24 self-start hidden lg:block">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg dark:shadow-black/40">
          <h3 className="bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-amber-300 font-bold p-3 rounded-t-lg">
            News and Updates
          </h3>
          <p className="p-3 text-gray-500 dark:text-gray-300">
            No new updates available.
          </p>
          <h3 className="bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-amber-300 font-bold p-3 mt-4 rounded-t-lg">
            Share This Scheme
          </h3>
          <div className="flex items-center justify-center gap-4 py-4">
            <a
              href="#"
              className="transition duration-300 hover:-translate-y-1"
              data-tooltip-id="share-fb"
              data-tooltip-content="Share on Facebook"
            >
              <img src={facebook} alt="Facebook" />
            </a>
            <Tooltip id="share-fb" place="top" style={tooltipStyle} />

            <a
              href="#"
              className="transition duration-300 hover:-translate-y-1"
              data-tooltip-id="share-insta"
              data-tooltip-content="Share on Instagram"
            >
              <img src={instagram} alt="Instagram" />
            </a>
            <Tooltip id="share-insta" place="top" style={tooltipStyle} />

            <a
              href="#"
              className="transition duration-300 hover:-translate-y-1"
              data-tooltip-id="share-x"
              data-tooltip-content="Share on X (Twitter)"
            >
              <img src={x} alt="X / Twitter" />
            </a>
            <Tooltip id="share-x" place="top" style={tooltipStyle} />

            <a
              href="#"
              className="transition duration-300 hover:-translate-y-1"
              data-tooltip-id="share-yt"
              data-tooltip-content="Share on YouTube"
            >
              <img src={youtube} alt="YouTube" />
            </a>
            <Tooltip id="share-yt" place="top" style={tooltipStyle} />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SchemeDetails;
