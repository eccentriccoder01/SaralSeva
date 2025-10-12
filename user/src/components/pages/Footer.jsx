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
  const toggleQR = () => setIsQRActive(!isQRActive);
  const closeQR = () => setIsQRActive(false);

  // Handle ESC key to close popup
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isQRActive) {
        closeQR();
      }
    };
    
    if (isQRActive) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when popup is open
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

  return (
    <footer className="bg-orange-950 dark:bg-gray-900 text-orange-200 dark:text-gray-300">
      <hr className="border-t-4 border-orange-900 dark:border-gray-800 mb-4" />
  <div className="container mx-auto px-3 py-8">
        <div className="flex flex-wrap md:text-left text-center order-first">

          {/* Links Sections - revamped with more categories */}
          <div className="lg:w-full md:w-full w-full px-1 flex flex-wrap lg:flex-nowrap lg:justify-between justify-center gap-12">
            {[
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
                inline: false,
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
                inline: false,
              },
            ].map((section, idx) => (
              <div key={idx} className={`lg:flex-shrink-0 lg:w-auto md:w-1/2 w-1/2 px-1 mb-2 md:mb-0`}>
                <h2 className="font-extrabold text-white dark:text-orange-400 text-sm mb-1 tracking-widest jost">
                  {section.title}
                </h2>
                {section.links && (
                  <nav className={`list-none mb-2 ${section.inline ? 'flex flex-row items-center gap-3 justify-start whitespace-nowrap' : 'flex flex-col gap-1'} ${section.nowrap ? 'overflow-x-auto' : ''}`}>
                    {section.links.map((link, i) => (
                      <li key={i} className={`${section.inline ? 'inline-flex' : ''} ${section.nowrap ? 'whitespace-nowrap' : ''}`}>
                        <Link to={link.to} className="hover:text-amber-400 dark:hover:text-orange-400 transition-colors text-sm">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </nav>
                )}
              </div>
            ))}
          </div>
        </div>

          {/* Centered Download & Social Block (moved below columns) */}
          <div className="w-full mt-6 flex flex-col items-center text-center px-2">
            <h2 className="font-extrabold text-white dark:text-orange-400 text-sm mb-1 tracking-widest jost">
              DOWNLOAD SARALSEVA APP
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <img
                src={qrcode}
                alt="QR Code for Mobile App"
                className={`object-cover rounded-lg border-2 border-amber-500 p-1 cursor-pointer transition-all duration-300 ${isQRActive ? "w-20 h-20 invisible" : "w-20 h-20"}`}
                onClick={toggleQR}
                data-tooltip-id="qr-tooltip"
                data-tooltip-content="Click to enlarge QR code"
              />
              <Tooltip id="qr-tooltip" place="top" style={tooltipStyle} />

              {/* App Store / Play Store Links */}
              <div className="flex flex-row gap-2 items-center">
                <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                  <img src={app} alt="App Store" className="w-24 cursor-pointer hover:opacity-80 transition-opacity" />
                </a>
                <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
                  <img src={play} alt="Play Store" className="w-24 cursor-pointer hover:opacity-80 transition-opacity" />
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-4">
              <span className="inline-flex justify-center w-full gap-2 text-xl">
                {socialLinks.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-amber-400 dark:hover:text-orange-400 transition-colors"
                      data-tooltip-id={`social-${idx}`}
                      data-tooltip-content={`Follow us on ${item.name}`}
                    >
                      {item.icon}
                    </a>
                    <Tooltip id={`social-${idx}`} place="top" style={tooltipStyle} />
                  </React.Fragment>
                ))}
              </span>
            </div>
          </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-orange-900 dark:bg-gray-800">
        <div className="container mx-auto py-4 px-5">
          <p className="text-orange-200 dark:text-gray-300 text-center text-sm">
            Copyright SaralSeva © {new Date().getFullYear()}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
