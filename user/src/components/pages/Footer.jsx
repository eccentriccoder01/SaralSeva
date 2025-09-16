import React from "react";
import qrcode from "./../../assets/QRcode.jpg";
import app from "./../../assets/app_store.svg";
import play from "./../../assets/play_store.svg";
import { FaInstagram, FaWhatsapp, FaFacebook, FaYoutube, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 dark:bg-gray-900 text-gray-200 dark:text-gray-300 relative overflow-hidden">
      <div className="container mx-auto px-5 py-16">
        <div className="flex flex-wrap md:text-left text-center order-first">
          {/* Mobile App & Social Section */}
          <div className="lg:w-1/3 md:w-1/2 w-full px-4">
            <h2 className="font-extrabold text-gradient text-lg mb-3 tracking-widest jost">
              DOWNLOAD SARALSEVA APP
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <img
                src={qrcode}
                alt="QR Code for Mobile App"
                className="w-28 h-28 object-cover rounded-lg border-2 border-violet-500 p-1 hover:border-violet-400 transition-colors duration-300"
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
                {[
                  { icon: <FaFacebook />, link: "/" },
                  { icon: <FaWhatsapp />, link: "/" },
                  { icon: <FaYoutube />, link: "/" },
                  { icon: <FaInstagram />, link: "/" },
                  { icon: <FaXTwitter />, link: "/" },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-500 dark:hover:text-orange-400 transition-colors text-2xl"
                  >
                    {item.icon}
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
                <h2 className="font-extrabold text-gradient text-lg mb-3 tracking-widest jost">
                  {section.title}
                </h2>
                {section.links && (
                  <nav className="list-none mb-10 flex flex-col gap-2">
                    {section.links.map((link, i) => (
                      <li key={i}>
                        <a
                          href={link.href}
                          className="hover:text-violet-400 dark:hover:text-violet-400 transition-colors duration-300"
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
                        <p key={i} className="text-sm">
                          {item}
                        </p>
                      ) : item.type === "email" ? (
                        <a
                          key={i}
                          href={`mailto:${item.value}`}
                          className="font-semibold hover:text-violet-400 dark:hover:text-violet-400 transition-colors duration-300"
                        >
                          {item.value}
                        </a>
                      ) : item.type === "phone" ? (
                        <a key={i} className="font-semibold" href={`tel:${item.value}`}>
                          {item.value}
                        </a>
                      ) : (
                        <p key={i} className="font-semibold">
                          {item.value}
                        </p>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-violet-900 via-purple-900 to-indigo-900 dark:bg-gray-800">
        <div className="container mx-auto py-4 px-5">
          <p className="text-gray-200 dark:text-gray-300 text-center text-sm">
            Copyright SaralSeva © {new Date().getFullYear()}. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
