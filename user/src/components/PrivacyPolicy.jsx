import React, { useState, useEffect } from 'react';
import { Shield, Lock, Eye, Users, Database, FileText, AlertTriangle, Mail, Sun, Moon } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

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


const PrivacyPolicy = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Persist theme in localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

const sections = [
  {
    id: "information-collection",
    title: "Information We Collect",
    icon: <Database
      className="w-6 h-6"
      data-tooltip-id="infoCollectTip"
      data-tooltip-content="This icon represents the types of information we collect"
    />,
    content: [
      {
        subtitle: "Personal Information",
        items: [
          "Name, address, phone number, and email address",
          "Government-issued identification numbers (Aadhaar, PAN, etc.)",
          "Bank account details for scheme benefit transfers",
          "Demographic information (age, gender, category, income details)",
          "Family composition and dependent information"
        ]
      },
      {
        subtitle: "Application Data",
        items: [
          "Scheme application details and supporting documents",
          "Grievance submissions and communication records",
          "Application status and processing history",
          "Digital signatures and authentication data"
        ]
      },
      {
        subtitle: "Technical Information",
        items: [
          "Device information and browser type",
          "IP address and location data (for security purposes)",
          "Login timestamps and session data",
          "Platform usage analytics for service improvement"
        ]
      }
    ]
  },
  {
    id: "information-use",
    title: "How We Use Your Information",
    icon: <FileText
      className="w-6 h-6"
      data-tooltip-id="infoUseTip"
      data-tooltip-content="This icon shows how your data is used by SaralSeva"
    />,
    content: [
      {
        subtitle: "Primary Purposes",
        items: [
          "Processing government scheme applications and benefit distribution",
          "Verifying eligibility and conducting background checks",
          "Tracking application progress and providing status updates",
          "Facilitating communication between citizens and government officials",
          "Resolving grievances and addressing citizen concerns"
        ]
      },
      {
        subtitle: "Secondary Purposes",
        items: [
          "Generating reports for administrative and policy planning",
          "Improving platform functionality and user experience",
          "Ensuring compliance with government regulations and audit requirements",
          "Preventing fraud and maintaining system security"
        ]
      }
    ]
  },
  {
    id: "information-sharing",
    title: "Information Sharing and Disclosure",
    icon: <Users
      className="w-6 h-6"
      data-tooltip-id="infoShareTip"
      data-tooltip-content="This icon represents with whom your data is shared"
    />,
    content: [
      {
        subtitle: "Government Agencies",
        items: [
          "Relevant central and state government departments for scheme processing",
          "Gram Panchayat officials and local administrative bodies",
          "Banking partners for direct benefit transfers",
          "Verification agencies for document and eligibility checks"
        ]
      },
      {
        subtitle: "Legal Requirements",
        items: [
          "Court orders, legal proceedings, or regulatory compliance",
          "Law enforcement agencies for investigation purposes",
          "Audit bodies for transparency and accountability measures",
          "RTI (Right to Information) requests as per applicable laws"
        ]
      }
    ]
  },
  {
    id: "data-security",
    title: "Data Security and Protection",
    icon: <Lock
      className="w-6 h-6"
      data-tooltip-id="dataSecurityTip"
      data-tooltip-content="This icon shows measures taken to protect your data"
    />,
    content: [
      {
        subtitle: "Technical Safeguards",
        items: [
          "End-to-end encryption for sensitive data transmission",
          "Secure servers with regular security updates and patches",
          "Multi-factor authentication for user accounts",
          "Regular security audits and vulnerability assessments",
          "Backup and disaster recovery systems"
        ]
      },
      {
        subtitle: "Administrative Safeguards",
        items: [
          "Role-based access control for employees and administrators",
          "Regular training on data protection and privacy practices",
          "Incident response procedures for security breaches",
          "Compliance with government data protection standards"
        ]
      }
    ]
  },
  {
    id: "user-rights",
    title: "Your Rights and Choices",
    icon: <Eye
      className="w-6 h-6"
      data-tooltip-id="userRightsTip"
      data-tooltip-content="This icon represents your rights regarding your data"
    />,
    content: [
      {
        subtitle: "Access and Transparency",
        items: [
          "Right to access your personal information stored on the platform",
          "Right to track the status and progress of your applications",
          "Right to receive copies of submitted documents and forms",
          "Right to know how your data is being processed and shared"
        ]
      },
      {
        subtitle: "Control and Correction",
        items: [
          "Right to update or correct inaccurate personal information",
          "Right to withdraw applications (subject to processing stage)",
          "Right to file grievances regarding data handling",
          "Right to opt-out of non-essential communications"
        ]
      }
    ]
  },
  {
    id: "data-retention",
    title: "Data Retention and Deletion",
    icon: <AlertTriangle
      className="w-6 h-6"
      data-tooltip-id="dataRetentionTip"
      data-tooltip-content="This icon represents how long data is kept and deleted securely"
    />,
    content: [
      {
        subtitle: "Retention Periods",
        items: [
          "Active application data: Retained until scheme completion or rejection",
          "Processed applications: Retained for 7 years as per government guidelines",
          "Grievance records: Retained for 5 years after resolution",
          "User account data: Retained as long as the account remains active"
        ]
      },
      {
        subtitle: "Secure Deletion",
        items: [
          "Data is securely deleted after retention period expires",
          "Multiple verification steps before permanent deletion",
          "Anonymization of data used for statistical purposes",
          "Compliance with government record-keeping requirements"
        ]
      }
    ]
  }
];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-12 h-12 mr-4" />
            <div>
              <h2 className="text-4xl font-bold mb-2">Privacy Policy</h2>
            </div>
          </div>
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-lg opacity-95 leading-relaxed">
              Committed to protecting your privacy while digitizing governance at the Gram Panchayat level. 
              Your trust is fundamental to building a transparent Digital India.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Theme Toggle Button */}
        {/* <div className="flex justify-end mb-6">
          <button
  onClick={() => setDarkMode(!darkMode)}
  data-tooltip-id="themeToggleTip"
  data-tooltip-content="Toggle Light/Dark Mode"
  className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 shadow-lg"
>
  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
</button>
Tooltips
<Tooltip id="themeToggleTip" style={tooltipStyle} />

        </div> */}

        {/* Introduction */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 transition-colors duration-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Commitment to Your Privacy</h2>
          <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
            <p className="mb-4">
              SaralSeva is dedicated to strengthening governance from the ground up by providing transparent, 
              accessible, and secure digital services for rural government schemes. This Privacy Policy explains 
              how we collect, use, protect, and share your personal information in accordance with applicable 
              Indian data protection laws and government guidelines.
            </p>
            <p className="mb-4">
              As a platform serving citizens, government employees, and administrators, we understand the 
              critical importance of maintaining the confidentiality and integrity of your personal information 
              while ensuring transparency in government operations.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <strong>Last Updated:</strong> August 2025 | <strong>Effective Date:</strong> August 19, 2025
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={section.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-colors duration-500">
              <div className="bg-gradient-to-r from-blue-500 to-orange-400 text-white p-6">
                <div className="flex items-center">
                  {section.icon}
                  <h2 className="text-2xl font-bold ml-3">{section.title}</h2>
                </div>
              </div>
              
              <div className="p-8">
                <div className="space-y-8">
                  {section.content.map((subsection, subIndex) => (
                    <div key={subIndex}>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                        {subsection.subtitle}
                      </h3>
                      <ul className="space-y-3">
                        {subsection.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact and Grievance */}
        <div className="bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-2xl p-8 mt-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 mr-3" />
                <h3 className="text-xl font-bold">Privacy Officer Contact</h3>
              </div>
              <div className="space-y-2 text-blue-100">
                <p>Email: privacy@saralseva.gov.in</p>
                <p>Phone: 1800-XXX-XXXX (Toll Free)</p>
                <p>Address: National Portal Secretariat CGO Complex, Lodhi Road, New Delhi - 110 003, India.</p>
                <p>Response Time: Within 30 days of receipt</p>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 mr-3" />
                <h3 className="text-xl font-bold">Data Protection Grievances</h3>
              </div>
              <div className="space-y-2 text-blue-100">
                <p>Online Grievance Portal: Available through your SaralSeva account</p>
                <p>Escalation: District Collector's Office</p>
                <p>External Authority: Data Protection Authority of India (when established)</p>
                <p>Emergency Contact: 9876543210</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mt-8 text-center transition-colors duration-500">
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            This Privacy Policy is part of SaralSeva's commitment to building a transparent, accountable, 
            and citizen-centric digital governance ecosystem. Regular updates ensure compliance with 
            evolving data protection regulations and government guidelines.
          </p>
          <div className="flex flex-wrap justify-center items-center mt-4 space-x-4 text-xs text-gray-500 dark:text-gray-400">
            <span>🇮🇳 Proudly Indian</span>
            <span>•</span>
            <span>Digital India Initiative</span>
            <span>•</span>
            <span>Transparent Governance</span>
            <span>•</span>
            <span>Citizen First</span>
          </div>
        </div>
        <Tooltip id="infoCollectTip" style={tooltipStyle} />
        <Tooltip id="infoUseTip" style={tooltipStyle} />
        <Tooltip id="infoShareTip" style={tooltipStyle} />
        <Tooltip id="dataSecurityTip" style={tooltipStyle} />
        <Tooltip id="userRightsTip" style={tooltipStyle} />
        <Tooltip id="dataRetentionTip" style={tooltipStyle} />
      </div>
    </div>
  );
};

export default PrivacyPolicy;