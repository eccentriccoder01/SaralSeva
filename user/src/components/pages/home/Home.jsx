import React, { useEffect, useState } from "react";
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
  backgroundColor: '#FF9933', // orange theme
  color: '#1F2937', // dark text
  padding: '8px 12px',
  borderRadius: '12px',
  fontSize: '14px',
  fontWeight: 500,
  textAlign: 'center',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  whiteSpace: 'pre-line', // allow line breaks
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

  return (

      {/* Image Slider */}
      <Slider
        image1={image1}
        image2={image2}
        image3={image3}
        image4={image4}
        image5={image5}
      />

      {/* Announcements Ticker */}
      <div className="flex items-center bg-gradient-to-r from-violet-900 via-purple-900 to-indigo-900 text-white overflow-hidden shadow-modern">
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 z-10">
          <h2 className="text-sm font-bold tracking-wider whitespace-nowrap md:text-md flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            LATEST UPDATES
          </h2>
        </div>
        <div className="relative flex-1 h-full flex items-center">
          <div className="animate-ticker flex flex-row items-center gap-20 py-4 whitespace-nowrap">
            {announcements.length > 0 ? (
              [...announcements, ...announcements].map((item, index) => (

                </div>
              ))
            ) : (
              <p className="px-4 text-violet-200">No recent announcements.</p>
            )}
          </div>
        </div>
      </div>

      {/* Scheme Cards */}

        </div>
      </div>

      {/* How It Works Section */}

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;
