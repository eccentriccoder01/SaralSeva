import React, { useEffect, useState, useMemo } from "react";
import Slider from "./Slider";
import image1 from "./../../../assets/home_slider1.jpg";
import image2 from "./../../../assets/home_slider2.jpg";
import image3 from "./../../../assets/home_slider3.jpg";
import image4 from "./../../../assets/home_slider4.jpg";
import image5 from "./../../../assets/home_slider5.jpg";
import announcement_icon from "./../../../assets/announcement.svg";
import { Link } from "react-router-dom";
import apply from "./../../../assets/apply.svg";
import search from "./../../../assets/search.svg";
import check from "./../../../assets/check.svg";
import axios from "axios";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

// Global tooltip style
const tooltipStyles = {
  backgroundColor: '#FF9933',
  color: '#1F2937',
  padding: '8px 12px',
  borderRadius: '12px',
  fontSize: '14px',
  fontWeight: 500,
  textAlign: 'center',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  whiteSpace: 'pre-line',
  maxWidth: '220px', 
  zIndex: 9999,
};

// Wave background SVG component
const WaveBackground = () => (
  <div className="absolute top-0 left-0 w-full h-full opacity-10 z-0">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#FF9933"
        fillOpacity="1"
        d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,224C960,245,1056,235,1152,208C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
  </div>
);

const Home = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [lang, setLang] = useState("en");

  const t = useMemo(
    () => ({
      en: {
        latestUpdates: "LATEST UPDATES",
        noAnnouncements: "No recent announcements.",
        latestAnnouncementTooltip: "Latest announcement",
        gatewayTitle: "Gateway to Citizen-Centric Services",
        gatewaySubtitle: "Explore, Discover, and Apply for Schemes that Empower You.",
        schemeCards: [
          { 
            title: "Information of Schemes", 
            subtitle: "योजनाओं की जानकारी",
            tooltip: "Click to view details about schemes information"
          },
          { 
            title: "Beneficiaries of Schemes", 
            subtitle: "योजनाओं के लाभार्थी",
            tooltip: "Click to view beneficiaries of schemes"
          },
          { 
            title: "Scheme Eligibility", 
            subtitle: "योजनाओं की पात्रता",
            tooltip: "Click to check scheme eligibility"
          },
          { 
            title: "Scheme Penetration", 
            subtitle: "योजनाओं की पहुँच",
            tooltip: "Click to view scheme penetration data"
          },
        ],
        howItWorks: "HOW IT WORKS",
        howItWorksTitle: "Government Schemes, Simplified in 3 Steps",
        steps: [
          { 
            title: "Enter Details", 
            description: "Start by providing your basic details.",
            tooltip: "Step 1:\nEnter Details\nStart by providing your basic details."
          },
          { 
            title: "Find Your Schemes", 
            description: "Shows the most relevant schemes.",
            tooltip: "Step 2:\nFind Your Schemes\nShows the most relevant schemes."
          },
          { 
            title: "Select & Apply", 
            description: "Apply directly through our simplified portal.",
            tooltip: "Step 3:\nSelect & Apply\nApply directly through our simplified portal."
          },
        ],
      },
      hi: {
    latestUpdates: "नवीनतम अपडेट",
    noAnnouncements: "कोई हालिया घोषणा नहीं।",
    latestAnnouncementTooltip: "नवीनतम घोषणा",
    gatewayTitle: "नागरिक-केंद्रित सेवाओं का प्रवेश द्वार",
    gatewaySubtitle: "अपने सशक्तिकरण के लिए उपलब्ध योजनाओं का अन्वेषण करें और आवेदन करें।",
    schemeCards: [
      { 
        title: "योजनाओं की जानकारी", 
        subtitle: "Information of Schemes",
        tooltip: "योजनाओं की जानकारी देखने के लिए क्लिक करें"
      },
      { 
        title: "योजनाओं के लाभार्थी", 
        subtitle: "Beneficiaries of Schemes",
        tooltip: "योजनाओं के लाभार्थियों को देखने के लिए क्लिक करें"
      },
      { 
        title: "योजनाओं की पात्रता", 
        subtitle: "Scheme Eligibility",
        tooltip: "योजना पात्रता जांचने के लिए क्लिक करें"
      },
      { 
        title: "योजनाओं की पहुँच", 
        subtitle: "Scheme Penetration",
        tooltip: "योजना पहुंच डेटा देखने के लिए क्लिक करें"
      },
    ],
    howItWorks: "यह कैसे काम करता है",
    howItWorksTitle: "सरकारी योजनाएं, 3 चरणों में सरलीकृत",
    steps: [
      { 
        title: "विवरण दर्ज करें", 
        description: "अपनी बुनियादी जानकारी प्रदान करके शुरू करें।",
        tooltip: "चरण 1:\nविवरण दर्ज करें\nअपनी बुनियादी जानकारी प्रदान करके शुरू करें।"
      },
      { 
        title: "अपनी योजनाएं खोजें", 
        description: "आपके लिए सबसे प्रासंगिक योजनाएं दिखाता है।",
        tooltip: "चरण 2:\nअपनी योजनाएं खोजें\nआपके लिए सबसे प्रासंगिक योजनाएं दिखाता है।"
      },
      { 
        title: "चुनें और आवेदन करें", 
        description: "हमारे सरलीकृत पोर्टल के माध्यम से सीधे आवेदन करें।",
        tooltip: "चरण 3:\nचुनें और आवेदन करें\nहमारे सरलीकृत पोर्टल के माध्यम से सीधे आवेदन करें।"
      },
    ],
  },

    }),
    []
  );

  const S = t[lang];

  const getAnnouncements = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/announcement/get_announcement`
      );
      setAnnouncements(res.data.announcement || []);
    } catch (error) {
      console.error("Failed to fetch announcements:", error);
    }
  };

  useEffect(() => {
    getAnnouncements();
  }, []);

  const schemeLinks = ["/schemes", "/schemes", "/scheme_eligibity", "/dashboard"];

  return (
    <div className="bg-orange-50/30 dark:bg-gray-900/50 relative transition-colors duration-300">

      {/* Language Toggle */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-3 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">EN</label>
        <input 
          type="radio" 
          name="lang" 
          checked={lang === "en"} 
          onChange={() => setLang("en")}
          className="cursor-pointer" 
        />
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">HI</label>
        <input 
          type="radio" 
          name="lang" 
          checked={lang === "hi"} 
          onChange={() => setLang("hi")}
          className="cursor-pointer" 
        />
      </div>

      {/* Image Slider */}
      <Slider
        image1={image1}
        image2={image2}
        image3={image3}
        image4={image4}
        image5={image5}
      />

      {/* Announcements Ticker */}
      <div className="flex items-center bg-orange-900 text-white overflow-hidden shadow-lg">
        <div className="bg-amber-600 px-4 py-3 z-10">
          <h2 className="text-sm font-bold tracking-wider whitespace-nowrap md:text-md">
            {S.latestUpdates}
          </h2>
        </div>
        <div className="relative flex-1 h-full flex items-center">
          <div className="animate-ticker flex flex-row items-center gap-20 py-3 whitespace-nowrap">
            {announcements.length > 0 ? (
              [...announcements, ...announcements].map((item, index) => (
                <div key={index} className="flex flex-row items-center gap-3">
                  <img 
                    src={announcement_icon} 
                    alt={S.latestAnnouncementTooltip}
                    className="w-6 h-6"
                    data-tooltip-id={`announcement-${index}`}
                    data-tooltip-content={S.latestAnnouncementTooltip}
                  />
                  <Tooltip
                    id={`announcement-${index}`}
                    place="top"
                    multiline
                    style={tooltipStyles}
                  />
                  <p>{item.announcement_details}</p>
                </div>
              ))
            ) : (
              <p className="px-4">{S.noAnnouncements}</p>
            )}
          </div>
        </div>
      </div>

      {/* Scheme Cards */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-extrabold text-orange-900 dark:text-amber-100 jost">
          {S.gatewayTitle}
        </h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          {S.gatewaySubtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {S.schemeCards.map((card, index) => (
            <Link 
              to={schemeLinks[index]} 
              key={index}
              data-tooltip-id={`scheme-card-${index}`}
              data-tooltip-content={card.tooltip}
            >
              <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 hover:shadow-2xl border-b-8 border-amber-500 dark:border-amber-600 hover:border-orange-600 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full flex flex-col justify-center items-center">
                <p className="text-2xl font-bold text-orange-800 dark:text-amber-100">{card.title}</p>
                <p className="mt-2 text-gray-500 dark:text-gray-300">{card.subtitle}</p>
              </div>
              <Tooltip
                id={`scheme-card-${index}`}
                place="top"
                multiline
                style={tooltipStyles}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-500">
        <WaveBackground />
        <div className="relative z-10 text-center">
          <p className="text-4xl font-bold text-amber-600 dark:text-amber-400 md:text-5xl lg:text-6xl tracking-widest">{S.howItWorks}</p>
          <h1 className="mt-2 text-4xl font-extrabold text-orange-900 dark:text-amber-100 jost md:text-5xl">
            {S.howItWorksTitle}
          </h1>
        </div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 mt-16 px-4">
          {S.steps.map((step, index) => {
            const colors = [
              { border: "border-amber-500", bg: "bg-amber-100 dark:bg-amber-700/20" },
              { border: "border-orange-600", bg: "bg-orange-100 dark:bg-orange-700/20" },
              { border: "border-red-800", bg: "bg-red-100 dark:bg-red-700/20" },
            ];
            const icons = [check, search, apply];
            
            return (
              <div 
                key={index} 
                className={`flex flex-col items-center p-8 text-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl dark:shadow-gray-900/50 transition-all duration-300 hover:shadow-2xl border-t-4 ${colors[index].border} dark:border-opacity-50`}
              >
                <div className={`p-4 rounded-full ${colors[index].bg}`}>
                  <img 
                    src={icons[index]} 
                    alt={step.title} 
                    className="w-12 h-12"
                    data-tooltip-id={`step-${index}`}
                    data-tooltip-content={step.tooltip}
                  />
                  <Tooltip
                    id={`step-${index}`}
                    place="top"
                    multiline
                    style={tooltipStyles}
                  />
                </div>

                <h3
                  className="mt-6 text-2xl font-bold text-orange-900 dark:text-amber-100 jost"
                  data-tooltip-id={`step-title-${index}`}
                  data-tooltip-content={step.tooltip}
                >
                  {step.title}
                </h3>
                <Tooltip
                  id={`step-title-${index}`}
                  place="top"
                  multiline
                  style={tooltipStyles}
                />

                <p className="mt-2 text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Home;