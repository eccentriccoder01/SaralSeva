import React, { useState } from "react";
import banner from "../assets/header-banner2.jpg";

const FAQS_EN = [
  {
    question: "What is SaralSeva?",
    answer:
      "SaralSeva is a Government of India initiative to help citizens explore, discover, and apply for government schemes that match their needs. It uses a simplified process to provide scheme information, eligibility details, and direct application options.",
  },
  {
    question: "Who can use SaralSeva?",
    answer:
      "Any citizen of India can use SaralSeva. The portal is designed for individuals, families, farmers, students, and small business owners who wish to find and apply for relevant government schemes.",
  },
  {
    question: "Do I need to register to use the portal?",
    answer:
      "You can browse scheme information without registering. However, to apply for a scheme or save your details for future use, you must create an account by clicking on the Register button.",
  },
  {
    question: "Is there any fee to use SaralSeva?",
    answer:
      "No. SaralSeva is a free service provided by the Government of India. You should never pay anyone for accessing the portal or applying through it.",
  },
];

const FAQS_HI = [
  {
    question: "SaralSeva क्या है?",
    answer:
      "SaralSeva एक सरकारी पहल है जो नागरिकों को उनकी जरूरतों के अनुसार सरकारी योजनाएँ खोजने, समझने और उनके लिए आवेदन करने में मदद करती है। यह योजना जानकारी, पात्रता विवरण और सीधे आवेदन विकल्प प्रदान करता है।",
  },
  {
    question: "SaralSeva कौन इस्तेमाल कर सकता है?",
    answer:
      "भारत का कोई भी नागरिक SaralSeva का उपयोग कर सकता है। यह पोर्टल व्यक्तियों, परिवारों, किसानों, छात्रों और लघु व्यवसाय मालिकों के लिए डिज़ाइन किया गया है।",
  },
  {
    question: "क्या पोर्टल का उपयोग करने के लिए पंजीकरण आवश्यक है?",
    answer:
      "आप बिना पंजीकरण के योजनाओं की जानकारी देख सकते हैं। लेकिन आवेदन करने या भविष्य के उपयोग के लिए विवरण सहेजने के लिए आपको खाता बनाना होगा।",
  },
  {
    question: "क्या SaralSeva का उपयोग करने के लिए कोई शुल्क है?",
    answer: "नहीं। SaralSeva एक मुफ्त सेवा है।",
  },
];

const faqs = [
  {
    question: "What is SaralSeva?",
    answer:
      "SaralSeva is a Government of India initiative to help citizens explore, discover, and apply for government schemes that match their needs. It uses a simplified process to provide scheme information, eligibility details, and direct application options."
  },
  {
    question: "Who can use SaralSeva?",
    answer:
      "Any citizen of India can use SaralSeva. The portal is designed for individuals, families, farmers, students, and small business owners who wish to find and apply for relevant government schemes."
  },
  {
    question: "Do I need to register to use the portal?",
    answer:
      "You can browse scheme information without registering. However, to apply for a scheme or save your details for future use, you must create an account by clicking on the Register button."
  },
  {
    question: "Is there any fee to use SaralSeva?",
    answer:
      "No. SaralSeva is a free service provided by the Government of India. You should never pay anyone for accessing the portal or applying through it."
  },
  // ... rest of FAQs
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const [lang, setLang] = useState("en");

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = lang === "hi" ? FAQS_HI : FAQS_EN;

  return (
    <div className="bg-[#fdfaf6] dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div
        className="relative flex items-center justify-center h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center">
          <h1 className="text-5xl font-extrabold text-white jost tracking-wider">{lang === 'hi' ? 'पूछे जाने वाले प्रश्न' : 'FAQs - SaralSeva'}</h1>
          <div className="absolute right-4 top-4 flex items-center gap-2">
            <label className="text-white text-sm">EN</label>
            <input type="radio" name="lang" checked={lang === 'en'} onChange={() => setLang('en')} />
            <label className="text-white text-sm">HI</label>
            <input type="radio" name="lang" checked={lang === 'hi'} onChange={() => setLang('hi')} />
          </div>
        </div>
      </div>

      {/* Main FAQ Section */}
      <main className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center text-[#7b3f00] dark:text-orange-400 mb-8 transition-colors duration-300">{lang === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}</h2>

        <div className="space-y-4 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl border border-orange-200 dark:border-gray-700 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:bg-orange-50 dark:hover:bg-gray-700 dark:hover:border-orange-400"
            >
             <button
                className="w-full text-left px-6 py-4 flex justify-between items-center text-[#7b3f00] dark:text-orange-400 font-semibold transition-all duration-300 hover:text-[#5d2f00] dark:hover:text-orange-300"
                  onClick={() => toggleFAQ(index)}
>
                    {faq.question}
                      <span
                        className={`transform transition-transform duration-300 text-[#7b3f00] dark:text-orange-400 ${
                          openIndex === index ? "rotate-180" : ""
                    }`}
                    >
                     ▼
                      </span>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Footer is rendered globally in App.jsx */}
    </div>
  );
}
