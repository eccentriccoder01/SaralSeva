import React, { useState } from "react";
import qrcode from "./../../assets/QRcode.jpg";
import app from "./../../assets/app_store.svg";
import play from "./../../assets/play_store.svg";
import { FaInstagram, FaWhatsapp, FaFacebook, FaYoutube, FaXTwitter } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";
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

const Footer = () => {
  const [isQRActive, setIsQRActive] = useState(false);

  const toggleQR = () => setIsQRActive(!isQRActive);

  const socialLinks = [
    { icon: <FaFacebook />, link: "/", name: "Facebook" },
    { icon: <FaWhatsapp />, link: "/", name: "WhatsApp" },
    { icon: <FaYoutube />, link: "/", name: "YouTube" },
    { icon: <FaInstagram />, link: "/", name: "Instagram" },
    { icon: <FaXTwitter />, link: "/", name: "X (Twitter)" },
  ];

  return (
    <footer className="bg-orange-950 dark:bg-gray-900 text-orange-200 dark:text-gray-300">
      <div className="container mx-auto px-5 py-16">
        <div className="flex flex-wrap md:text-left text-center order-first">

          {/* Mobile App & Social Section */}
          <div className="lg:w-1/3 md:w-1/2 w-full px-4">
            <h2 className="font-extrabold text-white dark:text-orange-400 text-lg mb-3 tracking-widest jost">
              DOWNLOAD SARALSEVA APP
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">

              {/* QR Code */}
              <img
                src={qrcode}
                alt="QR Code for Mobile App"
                className={`object-cover rounded-lg border-2 border-amber-500 p-1 cursor-pointer transition-all duration-300 ${isQRActive ? "fixed top-1/2 left-1/2 w-80 h-80 z-50 -translate-x-1/2 -translate-y-1/2 shadow-2xl bg-white" : "w-28 h-28"
                  }`}
                onClick={toggleQR}
                data-tooltip-id="qr-tooltip"
                data-tooltip-content="Scan this QR code to download the SaralSeva app"
              />
              <Tooltip id="qr-tooltip" place="top" style={tooltipStyle} />

              {/* App Store / Play Store Links */}
              <div className="flex flex-col gap-2">
                {/* App Store */}
                <a
                  href="https://apps.apple.com" // placeholder, replace with real app URL later
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={app}
                    alt="App Store"
                    className="w-36 cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </a>

                {/* Play Store */}
                <a
                  href="https://play.google.com" // placeholder, replace with real app URL later
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={play}
                    alt="Play Store"
                    className="w-36 cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <span className="inline-flex justify-center md:justify-start w-full gap-4">
                {socialLinks.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-500 dark:hover:text-orange-400 transition-colors text-2xl"
                    data-tooltip-id={`social-${idx}`}
                    data-tooltip-content={`Follow us on ${item.name}`}
                  >
                    {item.icon}
                  </a>
                ))}
                {socialLinks.map((_, idx) => (
                  <Tooltip
                    key={idx}
                    id={`social-${idx}`}
                    place="top"
                    style={tooltipStyle}
                  />
                ))}
              </span>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:w-2/3 md:w-1/2 w-full px-4 flex flex-wrap justify-end">
            {[
              {
                title: "QUICK LINKS",
                links: [
                  { name: "Home", href: "/" },
                  { name: "Schemes", href: "/schemes" },
                  { name: "Dashboard", href: "/dashboard" },
                  { name: "Contact", href: "/contact" },
                ],
              },
              {
                title: "ABOUT",
                links: [
                  { name: "About the Portal", href: "/about" },
                  { name: "FAQs", href: "/faq" },
                  { name: "Privacy Policy", href: "/privacypolicy" },
                  { name: "Linking Policy", href: "/linkingpolicy" },
                ],
              },
              {
                title: "CONTACT US",
                content: [
                  "For queries & feedback, email us at:",
                  { type: "email", value: "dgs@dgs.gov.in" },
                  "Phone:",
                  { type: "phone", value: "9876543210" },
                ],
              },
            ].map((section, idx) => (
              <div
                key={idx}
                className="lg:w-1/3 md:w-full w-1/2 px-4 mb-10 md:mb-0"
              >
                <h2 className="font-extrabold text-white dark:text-orange-400 text-lg mb-3 tracking-widest jost">
                  {section.title}
                </h2>
                {section.links && (
                  <nav className="list-none mb-10 flex flex-col gap-2">
                    {section.links.map((link, i) => (
                      <li key={i}>
                        <a
                          href={link.href}
                          className="hover:text-amber-400 dark:hover:text-orange-400 transition-colors"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </nav>
                )}
                {section.content && (
                  <div className="flex flex-col gap-1">
                    {section.content.map((item, i) =>
                      typeof item === "string" ? (
                        <p key={i} className="text-sm">{item}</p>
                      ) : item.type === "email" ? (
                        <>
                          <a
                            key={i}
                            href={`mailto:${item.value}`}
                            className="font-semibold hover:text-amber-400 dark:hover:text-orange-400 transition-colors"
                            data-tooltip-id={`email-tooltip-${i}`}
                            data-tooltip-content="Click to send an email"
                          >
                            {item.value}
                          </a>
                          <Tooltip
                            id={`email-tooltip-${i}`}
                            place="top"
                            style={tooltipStyle}
                          />
                        </>
                      ) : item.type === "phone" ? (
                        <>
                          <a
                            key={i}
                            className="font-semibold"
                            href={`tel:${item.value}`}
                            data-tooltip-id={`phone-tooltip-${i}`}
                            data-tooltip-content="Click to call"
                          >
                            {item.value}
                          </a>
                          <Tooltip
                            id={`phone-tooltip-${i}`}
                            place="top"
                            style={tooltipStyle}
                          />
                        </>
                      ) : (
                        <p key={i} className="font-semibold">{item.value}</p>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-orange-900 dark:bg-gray-800">
        <div className="container mx-auto py-4 px-5">
          <p className="text-orange-200 dark:text-gray-300 text-center text-sm">
            Copyright SaralSeva © {new Date().getFullYear()}. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
