import React from "react";
import facebook from "./../../assets/facebook2.png";
import instagram from "./../../assets/instagram1.png";
import whatsapp from "./../../assets/whatsapp.png";
import youtube from "./../../assets/youtube2.png";
import twitter from "./../../assets/twitter.png";
import qrcode from "./../../assets/QRcode.jpg";
import app from "./../../assets/app_store.svg";
import play from "./../../assets/play_store.svg";

const Footer = () => {
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
              <img
                src={qrcode}
                alt="QR Code for Mobile App"
                className="w-28 h-28 object-cover rounded-lg border-2 border-amber-500 p-1"
              />
              <div className="flex flex-col gap-2">
                <img
                  src={app}
                  alt="App Store"
                  className="w-36 cursor-pointer hover:opacity-80 transition-opacity"
                />
                <img
                  src={play}
                  alt="Play Store"
                  className="w-36 cursor-pointer hover:opacity-80 transition-opacity"
                />
              </div>
            </div>
            <div className="mt-8">
              <span className="inline-flex justify-center md:justify-start w-full gap-4">
                {[facebook, whatsapp, youtube, instagram, twitter].map((icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="text-gray-400 dark:text-gray-400 hover:text-white dark:hover:text-orange-400 transition-colors"
                  >
                    <img src={icon} alt="" className="w-8" />
                  </a>
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
                  { name: "About the Portal", href: "#" },
                  { name: "FAQs", href: "#" },
                  { name: "Privacy Policy", href: "#" },
                  { name: "Linking Policy", href: "#" },
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
              <div key={idx} className="lg:w-1/3 md:w-full w-1/2 px-4 mb-10 md:mb-0">
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
              </div>
              <div className="lg:w-1/3 md:w-full w-1/2 px-4 mb-10 md:mb-0">
                  <h2 className="font-extrabold text-white text-lg mb-3 tracking-widest jost">ABOUT</h2>
                  <nav className="list-none mb-10 flex flex-col gap-2">
                      <li><a className="hover:text-amber-400 transition-colors" href="#">About the Portal</a></li>
                      <li><a className="hover:text-amber-400 transition-colors" href="#">FAQs</a></li>
                      <li><a className="hover:text-amber-400 transition-colors" href="#">Privacy Policy</a></li>
                      <li><a className="hover:text-amber-400 transition-colors" href="#">Linking Policy</a></li>
                  </nav>
              </div>
            ))}
          </div>
        </div>
      </div>
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
