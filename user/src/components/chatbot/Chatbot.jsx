// frontend/src/components/Chatbot/Chatbot.jsx
import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, SendHorizonal, HelpCircle } from "lucide-react";
import "./Chatbot.css";

const FAQ = [
  // 1. General help
  {
    triggers: ["help", "assist", "support", "what can you do"],
    response:
      "Hello! I am SevaMittra. I can guide you on applying for services, tracking requests, managing your account, and navigating the platform professionally.",
  },
  // 2. Account/Login
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
  // 3. Service Application
{
  triggers: ["How to apply for a service?","grievance", "lodge grievance", "submit grievance", "apply for service", "service application"],
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

  <a href="/grievances/grievances_registration_form" target="_blank" style="
    display: inline-block;
    margin-top: 8px;
    padding: 8px 14px;
    background-color: #F97316;
    color: white;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 500;
  ">Register Now</a>
</div>
`,
},
  // 4. Request Tracking
  {
  triggers: ["How to track my request?","status", "check status", "application status", "track request", "grievance status", "scheme status"],
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

  <a href="/status" target="_blank" style="
    display: inline-block;
    margin-top: 8px;
    padding: 8px 14px;
    background-color: #F97316;
    color: white;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 500;
  ">Check Status</a>
</div>
`,
},
  // 5. How Government Schemes Work
  {
    triggers: [
      "how government schemes work",
      "scheme steps",
      "work",
      "how it works",
      "government schemes process",
    ],
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
    <button style="
      padding: 6px 12px;
      border-radius: 6px;
      background-color: #F97316;
      color: white;
      border: none;
      cursor: pointer;
      margin-top: 5px;
    ">
      View My Applied Schemes
    </button>
  </a>
</div>
`
},
  // 6. Scheme Information / Beneficiaries
  {
    triggers: ["scheme", "beneficiary", "scheme detail", "yojna"],
    response:
      "To view scheme information or beneficiaries, please visit the <strong>Schemes page</strong> from the navigation bar. You will find all the details organized there.",
  },
  // 7. Scheme Eligibility
  {
    triggers: ["eligibility", "scheme eligibility", "yojna ki patrata"],
    response:
      "For checking <strong>scheme eligibility</strong>, go to the <strong>Home page</strong> and select the card labeled 'Scheme Eligibility / Yojnao Ki Patrata'. It will guide you on whether you are eligible for the scheme.",
  },
  // 8. Scheme Penetration / Coverage
  {
    triggers: ["penetration", "coverage", "yojna ki pohch"],
    response:
      "To see scheme penetration or coverage details, please go to the <strong>Dashboard</strong> from the navigation menu. It provides the latest statistics and insights for each scheme.",
  },
  // 10. About SaralSeva / Mission
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

// 11. Application Statistics
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
// Privacy Policy
{
  triggers: ["privacy policy", "privacy", "data privacy"],
  response: `
<div>
  <p><strong>Privacy Policy:</strong></p>
  <p>To read our privacy policy, click the button below:</p>
  <a href="/privacypolicy">
    <button style="
      padding: 6px 12px;
      border-radius: 6px;
      background-color: #F97316;
      color: white;
      border: none;
      cursor: pointer;
      margin-top: 5px;
    ">
      View Privacy Policy
    </button>
  </a>
</div>
`
},

// Linking Policy
{
  triggers: ["linking policy", "link policy", "account linking"],
  response: `
<div>
  <p><strong>Linking Policy:</strong></p>
  <p>To read about our linking policy, click the button below:</p>
  <a href="/linkingpolicy">
    <button style="
      padding: 6px 12px;
      border-radius: 6px;
      background-color: #F97316;
      color: white;
      border: none;
      cursor: pointer;
      margin-top: 5px;
    ">
      View Linking Policy
    </button>
  </a>
</div>
`
},

// FAQs
{
  triggers: ["faq", "frequently asked questions", "questions"],
  response: `
<div>
  <p><strong>FAQs:</strong></p>
  <p>For frequently asked questions, click the button below:</p>
  <a href="/faq">
    <button style="
      padding: 6px 12px;
      border-radius: 6px;
      background-color: #F97316;
      color: white;
      border: none;
      cursor: pointer;
      margin-top: 5px;
    ">
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

  <a href="/contact" target="_blank" style="
    display: inline-block;
    margin-top: 8px;
    padding: 8px 14px;
    background-color: #F97316;
    color: white;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 500;
  ">Contact Us</a>
</div>
`,
},
{
  triggers: [], // No triggers; default fallback
  response: `
<div>
  <p>I'm sorry, I did not understand your query.</p>
  <p>You can select from the <strong class="help-menu-link" style="cursor:pointer; text-decoration:underline;">Help Menu</strong> for quick guidance or try rephrasing your question.
  </p>
</div>
`
}
];

const QUICK_QUESTIONS = [
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

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showQuick, setShowQuick] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I am SevaMittra. How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const chatBodyRef = useRef(null);

  // Disable page scroll when chatbot is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages]);

  // Handle clicks on inline links inside bot responses (event delegation)
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
    return fallback?.response || "I’m sorry, I did not understand your query.";
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
          <button onClick={toggleChat} className="chatbot-close-btn">
            <X className="w-5 h-5" />
          </button>
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
            placeholder="Type your query..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={toggleQuick} className="chatbot-quick-btn">
            <HelpCircle className="w-5 h-5" title="Quick Questions / FAQs" />
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
