import React, { useState, useEffect } from "react";
import qrcode from "./../../assets/QRcode.jpg";
import app from "./../../assets/app_store.svg";
import play from "./../../assets/play_store.svg";
import { FaInstagram, FaWhatsapp, FaFacebook, FaYoutube, FaXTwitter } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import { Link } from 'react-router-dom';

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

const Footer = () => {
  const [isQRActive, setIsQRActive] = useState(false);
  const [isSocialQROpen, setIsSocialQROpen] = useState(false);
  const toggleQR = () => setIsQRActive(!isQRActive);
  const closeQR = () => setIsQRActive(false);
  const openSocialQR = () => setIsSocialQROpen(true);
  const closeSocialQR = () => setIsSocialQROpen(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isQRActive) {
        closeQR();
      }
    };
    
    if (isQRActive) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isQRActive]);

  const socialLinks = [
    { icon: <FaFacebook />, link: "/social", name: "Facebook" },
    { icon: <FaWhatsapp />, link: "/social", name: "WhatsApp" },
    { icon: <FaYoutube />, link: "/social", name: "YouTube" },
    { icon: <FaInstagram />, link: "/social", name: "Instagram" },
    { icon: <FaXTwitter />, link: "/social", name: "X (Twitter)" },
  ];

  const sections = [
    {
      title: 'COMPANY',
      links: [
        { name: 'Blog', to: '/blog' },
        { name: 'Careers', to: '/careers' },
        { name: 'Contact Us', to: '/contact' },
      ],
    },
    {
      title: 'SUPPORT',
      links: [
        { name: 'Help Center', to: '/help' },
        { name: 'FAQs', to: '/faq' },
      ],
    },
    {
      title: 'FEATURES',
      links: [
        { name: 'Features Overview', to: '/features' },
      ],
    },
    {
      title: 'COMMUNITY & SOCIAL',
      links: [
        { name: 'Community', to: '/community' },
        { name: 'Social Media', to: '/social' },
        { name: 'Newsletter Signup', to: '/newsletter' },
      ],
    },
    {
      title: 'LEGAL',
      links: [
        { name: 'Privacy Policy', to: '/privacypolicy' },
        { name: 'Terms of Service', to: '/terms' },
        { name: 'Disclaimer', to: '/disclaimer' },
        { name: 'Cookie Policy', to: '/cookie-policy' },
        { name: 'Copyright Notice', to: '/copyright' },
      ],
    },
  ];

  return (
    <footer className="relative text-orange-100 dark:text-gray-200 overflow-hidden">
      {/* Gradient Background - preserved exact colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-950 via-orange-900 to-orange-950 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
      
      {/* Depth overlay - preserved exact colors */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      
      {/* Enhanced top border with glow - preserved exact colors */}
      <div className="relative">
        <div className="h-1 bg-gradient-to-r from-transparent via-orange-500/50 dark:via-orange-400/40 to-transparent shadow-lg"></div>
      </div>

      {/* Main content - improved spacing and responsive grid */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* Mobile App & Social Section - enhanced layout and spacing */}
          <div className="flex flex-col items-center lg:items-start space-y-8">
            {/* Section heading - improved typography */}
            <h2 className="font-extrabold text-orange-100 dark:text-orange-300 text-xl sm:text-2xl tracking-wider jost drop-shadow-lg text-center lg:text-left">
              DOWNLOAD SARALSEVA APP
            </h2>

            {/* QR and Store badges - better alignment and spacing */}
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
              {/* QR Code - enhanced shadow and hover effect */}
              <div className="relative group">
                <img
                  src={qrcode}
                  alt="QR Code for Mobile App"
                  className={`object-cover rounded-xl border-2 border-amber-500 p-1.5 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 ${isQRActive ? "w-28 h-28 invisible" : "w-28 h-28 sm:w-32 sm:h-32"}`}
                  onClick={toggleQR}
                  data-tooltip-id="qr-tooltip"
                  data-tooltip-content="Click to enlarge QR code"
                />
                <Tooltip id="qr-tooltip" place="top" style={tooltipStyle} />
              </div>

              {/* Store badges - improved spacing and hover effects */}
              <div className="flex flex-col gap-3">
                <a 
                  href="https://apps.apple.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-300 rounded-lg"
                >
                  <img src={app} alt="App Store" className="w-40 sm:w-44 h-auto" />
                </a>
                <a 
                  href="https://play.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-300 rounded-lg"
                >
                  <img src={play} alt="Play Store" className="w-40 sm:w-44 h-auto" />
                </a>
              </div>
            </div>

            {/* Social Links - enhanced spacing and effects */}
            <div className="w-full">
              <div className="flex justify-center lg:justify-start gap-5 sm:gap-6">
                {socialLinks.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-amber-400 dark:hover:text-orange-400 transition-all duration-300 text-2xl sm:text-3xl hover:scale-125 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-orange-300 rounded-full p-2"
                      data-tooltip-id={`social-${idx}`}
                      data-tooltip-content={`Follow us on ${item.name}`}
                      aria-label={item.name}
                    >
                      {item.icon}
                    </a>
                    <Tooltip id={`social-${idx}`} place="top" style={tooltipStyle} />
                  </React.Fragment>
                ))}
              </div>
              
              {/* Social QR Button */}
              <div className="mt-6 flex justify-center lg:justify-start">
                <button 
                  onClick={openSocialQR} 
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300"
                >
                  Social QR Code
                </button>
              </div>
            </div>
          </div>

          {/* Links Grid - improved responsive layout and spacing */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10">
            {sections.map((section, idx) => (
              <div key={idx} className="text-center sm:text-left">
                {/* Section headings - enhanced typography */}
                <h2 className="font-extrabold text-orange-100 dark:text-orange-300 text-sm sm:text-base mb-4 tracking-wider jost drop-shadow-lg">
                  {section.title}
                </h2>
                
                {/* Links with better spacing and hover effects */}
                {section.links && (
                  <nav className="flex flex-col gap-2.5">
                    {section.links.map((link, i) => (
                      <Link 
                        key={i}
                        to={link.to} 
                        className="hover:text-amber-400 dark:hover:text-orange-400 transition-all duration-300 hover:translate-x-1 inline-block text-sm leading-relaxed focus:outline-none focus:text-amber-400"
                      >
                        {link.name}
                      </Link>
                    ))}
                    
                  </nav>
                )}
              </div>
            ))}
          </div>
        </div>

        
      </div>

      {/* QR Code Popup - enhanced animation and styling */}
      {isQRActive && (
        <>
          {/* Backdrop with improved blur */}
          <div 
            className="fixed inset-0 bg-black/75 z-[9998] backdrop-blur-md transition-all duration-300 ease-out"
            onClick={closeQR}
          />
          
          {/* Popup with smoother animation */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] animate-in fade-in zoom-in-95 duration-300 ease-out">
            <div className="relative">
              {/* Close button - refined styling */}
              <button
                onClick={closeQR}
                className="absolute -top-5 -right-5 bg-orange-500 hover:bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110 hover:rotate-90 focus:outline-none focus:ring-4 focus:ring-orange-300 z-10"
                aria-label="Close QR code"
              >
                <span className="text-3xl font-light leading-none">&times;</span>
              </button>
              
              {/* QR Image - enhanced presentation */}
              <img
                src={qrcode}
                alt="QR Code for Mobile App"
                className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover rounded-2xl border-4 border-amber-500 p-3 shadow-2xl bg-white"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Instructions - better styling */}
              <p className="text-center mt-6 text-white text-sm sm:text-base bg-black/70 py-3 px-6 rounded-xl backdrop-blur-sm shadow-lg">
                Scan to download the app
                <br />
                <span className="text-xs opacity-80">Press ESC or click outside to close</span>
              </p>
            </div>
          </div>
        </>
      )}

      {/* Social QR Modal */}
      {isSocialQROpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/75 z-[9998] backdrop-blur-md transition-all duration-300 ease-out" 
            onClick={closeSocialQR} 
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] animate-in fade-in zoom-in-95 duration-300 ease-out">
            <div className="relative bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl">
              <button 
                className="absolute -top-4 -right-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 hover:rotate-90 focus:outline-none focus:ring-4 focus:ring-orange-300" 
                onClick={closeSocialQR}
                aria-label="Close Social QR code"
              >
                <span className="text-3xl font-light leading-none">&times;</span>
              </button>
              <img src={qrcode} alt="Social QR large" className="w-80 h-80 object-cover rounded-xl border-4 border-amber-500 p-2" />
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 text-center font-medium">Scan to open our social hub</p>
            </div>
          </div>
        </>
      )}

      {/* Footer Bottom - enhanced glass effect and spacing, preserved exact colors */}
      <div className="relative bg-gradient-to-r from-orange-900/80 via-orange-800/80 to-orange-900/80 dark:from-gray-800/80 dark:via-gray-700/80 dark:to-gray-800/80 backdrop-blur-sm border-t border-orange-700/30 dark:border-gray-600/30 shadow-2xl">
        <div className="container mx-auto py-5 sm:py-6 px-6 sm:px-8 lg:px-12 relative z-10">
          <p className="text-orange-100 dark:text-gray-200 text-center text-sm sm:text-base font-medium drop-shadow tracking-wide">
            Copyright SaralSeva © {new Date().getFullYear()}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;