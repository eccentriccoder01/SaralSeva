import React, { useState } from "react";

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

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#fdfaf6] dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Header */}
      <header className="bg-[#7b3f00] text-white py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">FAQs - SaralSeva</h1>
        </div>
      </header>

      {/* Main FAQ Section */}
      <main className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center text-[#7b3f00] dark:text-orange-400 mb-8 transition-colors duration-300">
          Frequently Asked Questions
        </h2>

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

      {/* Footer */}
      <footer className="bg-[#7b3f00] text-white py-6 mt-10">
        <div className="container mx-auto px-4 text-center text-sm">
          &copy; {new Date().getFullYear()} SaralSeva. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
