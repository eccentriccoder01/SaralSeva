// frontend/src/components/Chatbot/Chatbot.jsx
import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, SendHorizonal, HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./Chatbot.css";

const FAQ_EN = [
  {
    triggers: ["help", "assist", "support", "what can you do"],
    response:
      "Hello! I am SevaMittra. I can guide you on applying for services, tracking requests, managing your account, and navigating the platform professionally.",
  },
  {
    triggers: ["login", "account", "register", "signin", "signup"],
    response:
      "Use 'Login/Register' to access your account. You may also sign in using Google for convenience.",
  },
  {
    triggers: ["update profile", "edit profile", "profile settings", "change profile"],
    response: `
<div>
  <p><strong>Update Your Profile:</strong></p>
  <p>To update your profile, follow these steps:</p>
  <ol>
    <li>Click on the <strong>User Icon</strong> in the navigation bar.</li>
    <li>From the dropdown menu, select <strong>Profile</strong>.</li>
    <li>Click on <strong>Edit Profile</strong> to make changes to your personal information.</li>
  </ol>
</div>
`
  },
  {
    triggers: ["How to apply for a service?", "grievance", "lodge grievance", "submit grievance", "apply for service", "service application"],
    response: `
<div>
  <p><strong>Lodge a Grievance / Apply for a Service:</strong></p>
  <p>To submit a new grievance or service request, you must be <strong>logged in or registered</strong>. Please sign in before proceeding.</p>
  <p>Once logged in, go to the <strong>Grievances / Services page</strong> and fill out the form:</p>
  <p><strong>Grievance Registration Form:</strong></p>
  <ul>
    <li><strong>Personal Details:</strong> Full Name, Email, Mobile (10-digit), Date of Birth, Gender</li>
    <li><strong>Location & Grievance Details:</strong> Country (India), State/UT, District, Grievance Category & Type, Full Address, Description of Grievance</li>
    <li><strong>Upload Supporting Document:</strong> PDF only</li>
  </ul>
  <p>After submitting, you can:</p>
  <ul>
    <li><strong>Check Status:</strong> Track the progress of your submitted grievances.</li>
    <li><strong>Contact Authorities:</strong> Reach out to the relevant authorities if needed.</li>
  </ul>
  <a href="/grievances/grievances_registration_form" target="_blank" style="display: inline-block; margin-top: 8px; padding: 8px 14px; background-color: #F97316; color: white; border-radius: 6px; text-decoration: none; font-weight: 500;">Register Now</a>
</div>
`,
  },
  {
    triggers: ["How to track my request?", "status", "check status", "application status", "track request", "grievance status", "scheme status"],
    response: `
<div>
  <p><strong>Check Application / Grievance Status:</strong></p>
  <p>Enter your registration number on the <strong>Status page</strong> to track the progress of your application or grievance.</p>
  <p>You can check:</p>
  <ul>
    <li><strong>Scheme Status</strong></li>
    <li><strong>Grievance Status</strong></li>
  </ul>
  <p>Enter your scheme or grievance number to view updates.</p>
  <a href="/status" target="_blank" style="display: inline-block; margin-top: 8px; padding: 8px 14px; background-color: #F97316; color: white; border-radius: 6px; text-decoration: none; font-weight: 500;">Check Status</a>
</div>
`,
  },
  {
    triggers: ["how government schemes work", "scheme steps", "work", "how it works", "government schemes process"],
    response: `
<div>
  <p>Government Schemes, Simplified in 3 Steps:</p>
  <p><strong>1. Enter Details</strong> - Start by providing your basic details.</p>
  <p><strong>2. Find Your Schemes</strong> - Shows the most relevant schemes.</p>
  <p><strong>3. Select & Apply</strong> - Apply directly through our simplified portal.</p>
  <p>For more details or to get started, please visit the <strong>Home page</strong>.</p>
</div>
`,
  },
  {
    triggers: ["my applied schemes", "applied schemes", "schemes applied"],
    response: `
<div>
  <p><strong>My Applied Schemes:</strong></p>
  <p>You can view all the schemes you have applied for by clicking the button below.</p>
  <a href="/schemeApplied">
    <button style="padding: 6px 12px; border-radius: 6px; background-color: #F97316; color: white; border: none; cursor: pointer; margin-top: 5px;">
      View My Applied Schemes
    </button>
  </a>
</div>
`
  },
  {
    triggers: ["scheme", "beneficiary", "scheme detail", "yojna"],
    response:
      "To view scheme information or beneficiaries, please visit the <strong>Schemes page</strong> from the navigation bar. You will find all the details organized there.",
  },
  {
    triggers: ["eligibility", "scheme eligibility", "yojna ki patrata"],
    response:
      "For checking <strong>scheme eligibility</strong>, go to the <strong>Home page</strong> and select the card labeled 'Scheme Eligibility / Yojnao Ki Patrata'. It will guide you on whether you are eligible for the scheme.",
  },
  {
    triggers: ["penetration", "coverage", "yojna ki pohch"],
    response:
      "To see scheme penetration or coverage details, please go to the <strong>Dashboard</strong> from the navigation menu. It provides the latest statistics and insights for each scheme.",
  },
  {
    triggers: ["about saralseva", "mission", "objective", "what is saralseva", "about portal"],
    response: `
<div>
  <p><strong>Our Mission:</strong></p>
  <p>To strengthen e-Governance in Panchayati Raj Institutions (PRIs) across the country, the Ministry of Panchayati Raj (MoPR) has launched SaralSeva, a user-friendly web-based portal. SaralSeva aims to bring in better transparency in decentralised planning, progress reporting, and work-based accounting.</p>
  <p>This application has been monumental in bringing together a tech-based, integrated system for the 2.7 Lakh PRIs across India, fostering a new era of digital governance from the ground up.</p>
  <p><strong>About SaralSeva:</strong> Our Objective is to provide an easy-to-use, transparent system for citizens and PRIs to manage applications and services digitally.</p>
</div>
`,
  },
  {
    triggers: ["applications", "stats", "statistics", "total applications", "application status"],
    response: `
<div>
  <p><strong>Application Statistics:</strong></p>
  <ul>
    <li>Total Applications: 10,000+</li>
    <li>Applications Approved: 5,780</li>
    <li>Applications Rejected: 1,050</li>
    <li>Pending Review: 3,170</li>
  </ul>
</div>
`,
  },
  {
    triggers: ["privacy policy", "privacy", "data privacy"],
    response: `
<div>
  <p><strong>Privacy Policy:</strong></p>
  <p>To read our privacy policy, click the button below:</p>
  <a href="/privacypolicy">
    <button style="padding: 6px 12px; border-radius: 6px; background-color: #F97316; color: white; border: none; cursor: pointer; margin-top: 5px;">
      View Privacy Policy
    </button>
  </a>
</div>
`
  },
  {
    triggers: ["linking policy", "link policy", "account linking"],
    response: `
<div>
  <p><strong>Linking Policy:</strong></p>
  <p>To read about our linking policy, click the button below:</p>
  <a href="/linkingpolicy">
    <button style="padding: 6px 12px; border-radius: 6px; background-color: #F97316; color: white; border: none; cursor: pointer; margin-top: 5px;">
      View Linking Policy
    </button>
  </a>
</div>
`
  },
  {
    triggers: ["faq", "frequently asked questions", "questions"],
    response: `
<div>
  <p><strong>FAQs:</strong></p>
  <p>For frequently asked questions, click the button below:</p>
  <a href="/faq">
    <button style="padding: 6px 12px; border-radius: 6px; background-color: #F97316; color: white; border: none; cursor: pointer; margin-top: 5px;">
      View FAQs
    </button>
  </a>
</div>
`
  },
  {
    triggers: ["contact", "contact us", "support", "reach us", "get in touch"],
    response: `
<div>
  <p><strong>Contact Us:</strong></p>
  <p>You can reach out to the appropriate authorities via the following channels:</p>
  <p><strong>By Email & Phone:</strong><br/>
  Email: <a href="mailto:info@dgs.gov.in">info@dgs.gov.in</a><br/>
  Phone: 9876543210</p>
  <p><strong>Our Address:</strong><br/>
  National Portal Secretariat<br/>
  CGO Complex, Lodhi Road,<br/>
  New Delhi - 110 003, India.</p>
  <a href="/contact" target="_blank" style="display: inline-block; margin-top: 8px; padding: 8px 14px; background-color: #F97316; color: white; border-radius: 6px; text-decoration: none; font-weight: 500;">Contact Us</a>
</div>
`,
  },
  {
    triggers: [],
    response: `
<div>
  <p>I'm sorry, I did not understand your query.</p>
  <p>You can select from the <strong class="help-menu-link" style="cursor:pointer; text-decoration:underline;">Help Menu</strong> for quick guidance or try rephrasing your question.</p>
</div>
`
  }
];

const FAQ_HI = [
  {
    triggers: ["help", "assist", "support", "सहायता", "मदद", "what can you do"],
    response:
      "नमस्ते! मैं सेवामित्र हूं। मैं आपको सेवाओं के लिए आवेदन करने, अनुरोध ट्रैक करने, अपने खाते को प्रबंधित करने और प्लेटफ़ॉर्म पर नेविगेट करने में मार्गदर्शन कर सकता हूं।",
  },
  {
    triggers: ["login", "account", "register", "signin", "signup", "लॉगिन", "रजिस्टर", "खाता"],
    response:
      "अपने खाते तक पहुंचने के लिए 'लॉगिन/रजिस्टर' का उपयोग करें। आप सुविधा के लिए Google का उपयोग करके भी साइन इन कर सकते हैं।",
  },
  {
    triggers: ["update profile", "edit profile", "profile settings", "change profile", "प्रोफाइल अपडेट", "प्रोफाइल संपादित"],
    response: `
<div>
  <p><strong>अपनी प्रोफ़ाइल अपडेट करें:</strong></p>
  <p>अपनी प्रोफ़ाइल अपडेट करने के लिए, इन चरणों का पालन करें:</p>
  <ol>
    <li>नेविगेशन बार में <strong>User Icon</strong> पर क्लिक करें।</li>
    <li>ड्रॉपडाउन मेनू से <strong>Profile</strong> चुनें।</li>
    <li>अपनी व्यक्तिगत जानकारी में बदलाव करने के लिए <strong>Edit Profile</strong> पर क्लिक करें।</li>
  </ol>
</div>
`
  },
  {
    triggers: ["How to apply for a service?", "grievance", "lodge grievance", "submit grievance", "apply for service", "service application", "शिकायत", "सेवा के लिए आवेदन"],
    response: `
<div>
  <p><strong>शिकायत दर्ज करें / सेवा के लिए आवेदन करें:</strong></p>
  <p>नई शिकायत या सेवा अनुरोध सबमिट करने के लिए, आपको <strong>लॉग इन या पंजीकृत</strong> होना चाहिए। कृपया आगे बढ़ने से पहले साइन इन करें।</p>
  <p>लॉग इन करने के बाद, <strong>शिकायत / सेवा पेज</strong> पर जाएं और फॉर्म भरें:</p>
  <p><strong>शिकायत पंजीकरण फॉर्म:</strong></p>
  <ul>
    <li><strong>व्यक्तिगत विवरण:</strong> पूरा नाम, ईमेल, मोबाइल (10-अंक), जन्म तिथि, लिंग</li>
    <li><strong>स्थान और शिकायत विवरण:</strong> देश (भारत), राज्य/केंद्र शासित प्रदेश, जिला, शिकायत श्रेणी और प्रकार, पूरा पता, शिकायत का विवरण</li>
    <li><strong>सहायक दस्तावेज़ अपलोड करें:</strong> केवल PDF</li>
  </ul>
  <p>सबमिट करने के बाद, आप:</p>
  <ul>
    <li><strong>स्थिति जांचें:</strong> अपनी सबमिट की गई शिकायतों की प्रगति ट्रैक करें।</li>
    <li><strong>अधिकारियों से संपर्क करें:</strong> आवश्यकता होने पर संबंधित अधिकारियों से संपर्क करें।</li>
  </ul>
  <a href="/grievances/grievances_registration_form" target="_blank" style="display: inline-block; margin-top: 8px; padding: 8px 14px; background-color: #F97316; color: white; border-radius: 6px; text-decoration: none; font-weight: 500;">अभी पंजीकरण करें</a>
</div>
`,
  },
  {
    triggers: ["How to track my request?", "status", "check status", "application status", "track request", "grievance status", "scheme status", "स्थिति जांचें", "आवेदन की स्थिति"],
    response: `
<div>
  <p><strong>आवेदन / शिकायत स्थिति जांचें:</strong></p>
  <p>अपने आवेदन या शिकायत की प्रगति ट्रैक करने के लिए <strong>स्थिति पेज</strong> पर अपना पंजीकरण नंबर दर्ज करें।</p>
  <p>आप जांच सकते हैं:</p>
  <ul>
    <li><strong>योजना की स्थिति</strong></li>
    <li><strong>शिकायत की स्थिति</strong></li>
  </ul>
  <p>अपडेट देखने के लिए अपनी योजना या शिकायत संख्या दर्ज करें।</p>
  <a href="/status" target="_blank" style="display: inline-block; margin-top: 8px; padding: 8px 14px; background-color: #F97316; color: white; border-radius: 6px; text-decoration: none; font-weight: 500;">स्थिति जांचें</a>
</div>
`,
  },
  {
    triggers: ["how government schemes work", "scheme steps", "work", "how it works", "government schemes process", "योजनाएं कैसे काम करती हैं", "सरकारी योजनाएं"],
    response: `
<div>
  <p>सरकारी योजनाएं, 3 चरणों में सरलीकृत:</p>
  <p><strong>1. विवरण दर्ज करें</strong> - अपनी बुनियादी जानकारी प्रदान करके शुरू करें।</p>
  <p><strong>2. अपनी योजनाएं खोजें</strong> - आपके लिए सबसे प्रासंगिक योजनाएं दिखाता है।</p>
  <p><strong>3. चुनें और आवेदन करें</strong> - हमारे सरलीकृत पोर्टल के माध्यम से सीधे आवेदन करें।</p>
  <p>अधिक विवरण के लिए या शुरू करने के लिए, कृपया <strong>होम पेज</strong> पर जाएं।</p>
</div>
`,
  },
  {
    triggers: ["my applied schemes", "applied schemes", "schemes applied", "मेरी आवेदित योजनाएं", "आवेदित योजनाएं"],
    response: `
<div>
  <p><strong>मेरी आवेदित योजनाएं:</strong></p>
  <p>आप नीचे दिए गए बटन पर क्लिक करके अपनी सभी आवेदित योजनाओं को देख सकते हैं।</p>
  <a href="/schemeApplied">
    <button style="padding: 6px 12px; border-radius: 6px; background-color: #F97316; color: white; border: none; cursor: pointer; margin-top: 5px;">
      मेरी आवेदित योजनाएं देखें
    </button>
  </a>
</div>
`
  },
  {
    triggers: ["scheme", "beneficiary", "scheme detail", "yojna", "योजना", "लाभार्थी"],
    response:
      "योजना की जानकारी या लाभार्थियों को देखने के लिए, कृपया नेविगेशन बार से <strong>योजनाएं पेज</strong> पर जाएं। आपको वहां सभी विवरण व्यवस्थित मिलेंगे।",
  },
  {
    triggers: ["eligibility", "scheme eligibility", "yojna ki patrata", "पात्रता", "योजना की पात्रता"],
    response:
      "<strong>योजना पात्रता</strong> की जांच के लिए, <strong>होम पेज</strong> पर जाएं और 'योजना पात्रता / Scheme Eligibility' लेबल वाले कार्ड को चुनें। यह आपको मार्गदर्शन देगा कि आप योजना के लिए पात्र हैं या नहीं।",
  },
  {
    triggers: ["penetration", "coverage", "yojna ki pohch", "योजना की पहुंच", "कवरेज"],
    response:
      "योजना की पहुंच या कवरेज विवरण देखने के लिए, कृपया नेविगेशन मेनू से <strong>डैशबोर्ड</strong> पर जाएं। यह प्रत्येक योजना के लिए नवीनतम आंकड़े और अंतर्दृष्टि प्रदान करता है।",
  },
  {
    triggers: ["about saralseva", "mission", "objective", "what is saralseva", "about portal", "सरलसेवा के बारे में", "उद्देश्य"],
    response: `
<div>
  <p><strong>हमारा मिशन:</strong></p>
  <p>देश भर में पंचायती राज संस्थानों (PRIs) में ई-गवर्नेंस को मजबूत करने के लिए, पंचायती राज मंत्रालय (MoPR) ने SaralSeva लॉन्च किया है, एक उपयोगकर्ता-अनुकूल वेब-आधारित पोर्टल। SaralSeva का उद्देश्य विकेंद्रीकृत योजना, प्रगति रिपोर्टिंग और कार्य-आधारित लेखांकन में बेहतर पारदर्शिता लाना है।</p>
  <p>यह एप्लिकेशन पूरे भारत में 2.7 लाख PRIs के लिए एक तकनीक-आधारित, एकीकृत प्रणाली लाने में स्मारकीय रहा है, जो जमीनी स्तर से डिजिटल शासन के एक नए युग को बढ़ावा देता है।</p>
  <p><strong>SaralSeva के बारे में:</strong> हमारा उद्देश्य नागरिकों और PRIs के लिए आवेदनों और सेवाओं को डिजिटल रूप से प्रबंधित करने के लिए एक उपयोग में आसान, पारदर्शी प्रणाली प्रदान करना है।</p>
</div>
`,
  },
  {
    triggers: ["applications", "stats", "statistics", "total applications", "application status", "आवेदन", "सांख्यिकी"],
    response: `
<div>
  <p><strong>आवेदन सांख्यिकी:</strong></p>
  <ul>
    <li>कुल आवेदन: 10,000+</li>
    <li>स्वीकृत आवेदन: 5,780</li>
    <li>अस्वीकृत आवेदन: 1,050</li>
    <li>समीक्षाधीन: 3,170</li>
  </ul>
</div>
`,
  },
  {
    triggers: ["privacy policy", "privacy", "data privacy", "गोपनीयता नीति", "गोपनीयता"],
    response: `
<div>
  <p><strong>गोपनीयता नीति:</strong></p>
  <p>हमारी गोपनीयता नीति पढ़ने के लिए, नीचे दिए गए बटन पर क्लिक करें:</p>
  <a href="/privacypolicy">
    <button style="padding: 6px 12px; border-radius: 6px; background-color: #F97316; color: white; border: none; cursor: pointer; margin-top: 5px;">
      गोपनीयता नीति देखें
    </button>
  </a>
</div>
`
  },
  {
    triggers: ["linking policy", "link policy", "account linking", "लिंकिंग नीति"],
    response: `
<div>
  <p><strong>लिंकिंग नीति:</strong></p>
  <p>हमारी लिंकिंग नीति के बारे में पढ़ने के लिए, नीचे दिए गए बटन पर क्लिक करें:</p>
  <a href="/linkingpolicy">
    <button style="padding: 6px 12px; border-radius: 6px; background-color: #F97316; color: white; border: none; cursor: pointer; margin-top: 5px;">
      लिंकिंग नीति देखें
    </button>
  </a>
</div>
`
  },
  {
    triggers: ["faq", "frequently asked questions", "questions", "सवाल", "प्रश्न"],
    response: `
<div>
  <p><strong>FAQs:</strong></p>
  <p>अक्सर पूछे जाने वाले प्रश्नों के लिए, नीचे दिए गए बटन पर क्लिक करें:</p>
  <a href="/faq">
    <button style="padding: 6px 12px; border-radius: 6px; background-color: #F97316; color: white; border: none; cursor: pointer; margin-top: 5px;">
      FAQs देखें
    </button>
  </a>
</div>
`
  },
  {
    triggers: ["contact", "contact us", "support", "reach us", "get in touch", "संपर्क करें", "संपर्क"],
    response: `
<div>
  <p><strong>हमसे संपर्क करें:</strong></p>
  <p>आप निम्नलिखित माध्यमों से संबंधित अधिकारियों से संपर्क कर सकते हैं:</p>
  <p><strong>ईमेल और फोन द्वारा:</strong><br/>
  ईमेल: <a href="mailto:info@dgs.gov.in">info@dgs.gov.in</a><br/>
  फोन: 9876543210</p>
  <p><strong>हमारा पता:</strong><br/>
  राष्ट्रीय पोर्टल सचिवालय<br/>
  CGO कॉम्प्लेक्स, लोधी रोड,<br/>
  नई दिल्ली - 110 003, भारत।</p>
  <a href="/contact" target="_blank" style="display: inline-block; margin-top: 8px; padding: 8px 14px; background-color: #F97316; color: white; border-radius: 6px; text-decoration: none; font-weight: 500;">हमसे संपर्क करें</a>
</div>
`,
  },
  {
    triggers: [],
    response: `
<div>
  <p>क्षमा करें, मैं आपकी क्वेरी नहीं समझ पाया।</p>
  <p>आप त्वरित मार्गदर्शन के लिए <strong class="help-menu-link" style="cursor:pointer; text-decoration:underline;">Help Menu</strong> से चुन सकते हैं या अपने प्रश्न को दोबारा लिखने का प्रयास कर सकते हैं।</p>
</div>
`
  }
];

const QUICK_QUESTIONS_EN = [
  "How to login or register?",
  "How to update profile?",
  "How to apply for a service?",
  "How to track my request?",
  "How to view my applied schemes?",
  "How to view scheme information?",
  "How to check scheme eligibility?",
  "How to see scheme penetration?",
  "How government schemes work",
  "What is SaralSeva",
  "What are the current application statistics?",
  "View Privacy Policy",
  "Read Linking Policy",
  "View FAQs",
  "Contact Us",
];

const QUICK_QUESTIONS_HI = [
  "लॉगिन या रजिस्टर कैसे करें?",
  "प्रोफाइल कैसे अपडेट करें?",
  "सेवा के लिए आवेदन कैसे करें?",
  "अपने अनुरोध को कैसे ट्रैक करें?",
  "मेरी आवेदित योजनाएं कैसे देखें?",
  "योजना की जानकारी कैसे देखें?",
  "योजना पात्रता कैसे जांचें?",
  "योजना की पहुंच कैसे देखें?",
  "सरकारी योजनाएं कैसे काम करती हैं",
  "सरलसेवा क्या है",
  "वर्तमान आवेदन सांख्यिकी क्या हैं?",
  "गोपनीयता नीति देखें",
  "लिंकिंग नीति पढ़ें",
  "FAQs देखें",
  "हमसे संपर्क करें",
];

const Chatbot = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showQuick, setShowQuick] = useState(false);
  const [language, setLanguage] = useState(i18n.language || "en");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const chatBodyRef = useRef(null);

  // Get current FAQ and Quick Questions based on language
  const FAQ = language === "en" ? FAQ_EN : FAQ_HI;
  const QUICK_QUESTIONS = language === "en" ? QUICK_QUESTIONS_EN : QUICK_QUESTIONS_HI;
  const welcomeMessage = language === "en" 
    ? "Hello! I am SevaMittra. How can I assist you today?" 
    : "नमस्ते! मैं सेवामित्र हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?";

  // Sync chatbot language with global i18n language
  useEffect(() => {
    const currentLang = i18n.language || "en";
    if (currentLang !== language) {
      setLanguage(currentLang);
      const newWelcome = currentLang === "en" 
        ? "Hello! I am SevaMittra. How can I assist you today?" 
        : "नमस्ते! मैं सेवामित्र हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?";
      setMessages([{ sender: "bot", text: newWelcome }]);
    }
  }, [i18n.language, language]);

  // Initialize welcome message on mount
  useEffect(() => {
    setMessages([{ sender: "bot", text: welcomeMessage }]);
  }, []);

  // Disable page scroll when chatbot is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages]);

  // Handle clicks on inline links inside bot responses
  useEffect(() => {
    const node = chatBodyRef.current;
    if (!node) return;

    const handleClick = (e) => {
      const target = e.target.closest('.help-menu-link');
      if (target) {
        e.preventDefault();
        setShowQuick(true);
      }
    };

    node.addEventListener('click', handleClick);
    return () => node.removeEventListener('click', handleClick);
  }, []);

  const toggleChat = () => setIsOpen(!isOpen);
  const toggleQuick = () => setShowQuick(!showQuick);
  
  const toggleLanguage = () => {
    const newLang = language === "en" ? "hi" : "en";
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
    
    const newWelcome = newLang === "en" 
      ? "Hello! I am SevaMittra. How can I assist you today?" 
      : "नमस्ते! मैं सेवामित्र हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?";
    setMessages([{ sender: "bot", text: newWelcome }]);
  };

  const findResponse = (text) => {
    const lc = text.toLowerCase().trim();

    // 1. Exact match
    for (const item of FAQ) {
      for (const trig of item.triggers) {
        if (lc === trig.toLowerCase()) return item.response;
      }
    }

    // 2. Partial match
    for (const item of FAQ) {
      for (const trig of item.triggers) {
        if (lc.includes(trig.toLowerCase())) return item.response;
      }
    }

    // 3. Fallback
    const fallback = FAQ.find((item) => item.triggers.length === 0);
    return fallback?.response || (language === "en" 
      ? "I'm sorry, I did not understand your query." 
      : "क्षमा करें, मैं आपकी क्वेरी नहीं समझ पाया।");
  };

  const sendMessage = (customText) => {
    const msgText = customText ?? input.trim();
    if (!msgText) return;

    setMessages((prev) => [...prev, { sender: "user", text: msgText }]);
    setInput("");

    setTimeout(() => {
      const botResponse = findResponse(msgText);
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    }, 800);
  };

  return (
    <div className="chatbot-container">
      <div className={`chatbot-window ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-content">
            <MessageSquare className="w-5 h-5 text-white" />
            <span className="font-bold">SevaMittra</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
           
            <button onClick={toggleChat} className="chatbot-close-btn">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="chatbot-body" ref={chatBodyRef}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chatbot-msg ${msg.sender === "user" ? "user-msg" : "bot-msg"}`}
            >
              {msg.sender === "bot" ? (
                <div dangerouslySetInnerHTML={{ __html: msg.text }} />
              ) : (
                msg.text
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input with Quick Menu */}
        <div className="chatbot-input-container">
          <input
            type="text"
            placeholder={language === "en" ? "Type your query..." : "अपनी क्वेरी टाइप करें..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={toggleQuick} className="chatbot-quick-btn">
            <HelpCircle className="w-5 h-5" title={language === "en" ? "Quick Questions / FAQs" : "त्वरित प्रश्न / FAQs"} />
          </button>
          <button onClick={() => sendMessage()} className="chatbot-send-btn">
            <SendHorizonal className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Questions Panel */}
        {showQuick && (
          <div className="quick-questions">
            {QUICK_QUESTIONS.map((q, i) => (
              <button key={i} onClick={() => sendMessage(q)} className="quick-question-btn">
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Floating Chat Toggle */}
      <button className="chatbot-toggle-btn" onClick={toggleChat}>
        {isOpen ? <X className="w-7 h-7 text-white" /> : <MessageSquare className="w-7 h-7 text-white" />}
      </button>
    </div>
  );
};

export default Chatbot;