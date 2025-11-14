import React, { useState, useEffect } from 'react';
import { Link2, ExternalLink, Shield, AlertTriangle, CheckCircle, XCircle, Globe, Users, Sun, Moon } from 'lucide-react';
// external tooltip lib removed to avoid duplicate orange boxes

const tooltipStyle = {
  backgroundColor: "#FF9933",
  color: "#1F2937",
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

const LinkingPolicy = () => {
  // ✅ FIX: Initialize dark mode from localStorage immediately
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  // ✅ FIX: Apply theme immediately on mount (before first render)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []); // Run only once on mount

  // Update theme when darkMode state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const linkingTypes = [
    {
      type: "Outbound Links",
      icon: <ExternalLink className="w-6 h-6" />,
      description: "Links from SaralSeva to external websites",
      color: "bg-blue-500"
    },
    {
      type: "Inbound Links", 
  icon: <Link2 className="w-6 h-6" />,
      description: "Links from external websites to SaralSeva",
      color: "bg-green-500"
    },
    {
      type: "Deep Links",
  icon: <Globe className="w-6 h-6" />,
      description: "Direct links to specific pages within SaralSeva",
      color: "bg-orange-500"
    },
    {
      type: "API Integration",
  icon: <Users className="w-6 h-6" />,
      description: "Technical integration with government systems",
      color: "bg-purple-500"
    }
  ];

  const approvedDomains = [
    { category: "Government Portals", domains: ["gov.in", "nic.in", "digitalindia.gov.in", "mygov.in"] },
    { category: "Banking & Financial", domains: ["rbi.org.in", "npci.org.in", "uidai.gov.in"] },
    { category: "State Governments", domains: ["gujarat.gov.in", "rajasthan.gov.in", "up.gov.in"] },
    { category: "Central Schemes", domains: ["pmkisan.gov.in", "nrega.nic.in", "pfms.nic.in"] }
  ];

  const prohibitedContent = [
    "Commercial advertisements or promotional content",
    "Political campaign materials or partisan content", 
    "Adult content, gambling, or illegal activities",
    "Malware, phishing, or security threats",
    "Content that contradicts government policies",
    "Unverified news or misinformation",
    "Private commercial services competing with government schemes",
    "Content promoting discrimination or hate speech"
  ];

  return (
   <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center mb-6">
            <Link2 className="w-12 h-12 mr-4" />
            <div>
              <h2 className="text-4xl font-bold mb-2">Linking Policy</h2>
            </div>
          </div>
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-lg opacity-95 leading-relaxed">
              Governing digital connections to ensure secure, reliable, and citizen-focused access 
              to government services while maintaining the integrity of our platform.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Theme Toggle Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 shadow-lg"
          >
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Introduction */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 transition-colors duration-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Linking Framework</h2>
          <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
            <p className="mb-4">
              As a government platform dedicated to transparent and accessible digital governance, 
              SaralSeva maintains strict guidelines for linking to and from external websites. 
              This policy ensures that all digital connections align with our mission of serving 
              citizens while maintaining security, reliability, and trust.
            </p>
            <p className="mb-4">
              Our linking policy is designed to facilitate seamless access to legitimate government 
              services while protecting users from security threats and ensuring compliance with 
              government digital standards.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 p-4 rounded">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Policy Scope:</strong> This policy applies to all hyperlinks, redirects, 
                API integrations, and digital connections associated with the SaralSeva platform.
              </p>
            </div>
          </div>
        </div>

        {/* Types of Linking */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 transition-colors duration-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Types of Linking</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {linkingTypes.map((item, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-xl p-6 transition-colors duration-500">
                <div className="flex items-center mb-4">
                  <div className={`${item.color} text-white p-2 rounded-lg mr-3`}>
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.type}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Outbound Linking Policy */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8 transition-colors duration-500">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
            <div className="flex items-center">
              <ExternalLink className="w-6 h-6 mr-3" />
              <h2 className="text-2xl font-bold">Outbound Linking Policy</h2>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Permitted External Links
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Official government websites and portals (.gov.in domains)
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Central and state government scheme websites
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Banking portals for direct benefit transfers
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Document verification and authentication services
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Educational resources from recognized institutions
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Help documentation and user guides
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <XCircle className="w-5 h-5 text-red-500 mr-2" />
                  Prohibited External Links
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  {prohibitedContent.slice(0, 6).map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-gray-50 dark:bg-gray-700 rounded-lg p-6 transition-colors duration-500">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Link Disclaimer</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                All external links are provided for user convenience and informational purposes. 
                SaralSeva does not endorse, control, or assume responsibility for the content, 
                privacy policies, or practices of external websites. Users access external sites 
                at their own risk and are advised to review the terms and privacy policies of 
                those sites.
              </p>
            </div>
          </div>
        </div>

        {/* Approved Government Domains */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 transition-colors duration-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Pre-Approved Government Domains</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {approvedDomains.map((category, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 transition-colors duration-500">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{category.category}</h3>
                <div className="space-y-2">
                  {category.domains.map((domain, domainIndex) => (
                    <span key={domainIndex} className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full mr-2 mb-2">
                      *.{domain}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inbound Linking Policy */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8 transition-colors duration-500">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
            <div className="flex items-center">
              <Link2 className="w-6 h-6 mr-3" />
              <h2 className="text-2xl font-bold">Inbound Linking Policy</h2>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Permitted Inbound Links</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    Government websites and official portals
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    Educational institutions and research organizations
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    Non-profit organizations working in public service
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    News organizations for factual reporting
                  </li>
                </ul>

                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Link Requirements</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                  <li>• Links must be contextually relevant</li>
                  <li>• Must not misrepresent SaralSeva's purpose</li>
                  <li>• Should not bypass authentication mechanisms</li>
                  <li>• Must comply with government linking standards</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Linking Restrictions</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    Commercial websites without prior approval
                  </li>
                  <li className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    Framing SaralSeva within another website
                  </li>
                  <li className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    Deep linking to secure or authentication pages
                  </li>
                  <li className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    Links that could compromise user security
                  </li>
                </ul>

                <div className="bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700 rounded-lg p-4 mt-6 transition-colors duration-500">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Approval Required</h4>
                  <p className="text-orange-700 dark:text-orange-300 text-sm">
                    Commercial entities, media organizations, and third-party services must 
                    obtain written permission before linking to SaralSeva.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security and Monitoring */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8 transition-colors duration-500">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
            <div className="flex items-center">
              <Shield className="w-6 h-6 mr-3" />
              <h2 className="text-2xl font-bold">Security and Monitoring</h2>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid lg:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Link Verification</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                  <li>• SSL/TLS certificate validation</li>
                  <li>• Malware and phishing detection</li>
                  <li>• Content appropriateness review</li>
                  <li>• Regular security assessments</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Monitoring Systems</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                  <li>• 24/7 link availability monitoring</li>
                  <li>• Suspicious activity detection</li>
                  <li>• User feedback analysis</li>
                  <li>• Compliance audit trails</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Response Protocols</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                  <li>• Immediate removal of harmful links</li>
                  <li>• User notification systems</li>
                  <li>• Incident reporting procedures</li>
                  <li>• Regular policy updates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact and Compliance */}
        <div className="bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-2xl p-8 mt-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Link Approval Requests</h3>
              <div className="space-y-2 text-blue-100">
                <p>Email: links@saralseva.gov.in</p>
                <p>Subject: Link Approval Request - [Your Organization]</p>
                <p>Processing Time: 7-14 business days</p>
                <p>Required Documents: Organization certificate, purpose statement</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Report Problematic Links</h3>
              <div className="space-y-2 text-blue-100">
                <p>Security Issues: security@saralseva.gov.in</p>
                <p>Content Concerns: content@saralseva.gov.in</p>
                <p>Emergency Hotline: 1800-XXX-XXXX</p>
                <p>Response Time: Within 24 hours for security issues</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-blue-400">
            <div className="flex flex-wrap justify-center items-center space-x-4 text-sm">
              <span>🔗 Transparent Linking</span>
              <span>•</span>
              <span>🛡️ Secure Connections</span>
              <span>•</span>
              <span>🇮🇳 Digital India Standards</span>
              <span>•</span>
              <span>👥 Citizen Protection</span>
            </div>
          </div>
        </div>

        {/* Policy Updates */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mt-8 text-center transition-colors duration-500">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Policy Updates and Compliance</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
            This Linking Policy is regularly reviewed and updated to ensure compliance with 
            evolving government guidelines, security standards, and digital governance best practices. 
            All stakeholders will be notified of significant policy changes.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Last Updated: August 2025 | Next Review: February 2026 | Version: 2.1
          </p>
        </div>

        {/* external tooltips removed */}
      </div>
    </div>
  );
};

export default LinkingPolicy;