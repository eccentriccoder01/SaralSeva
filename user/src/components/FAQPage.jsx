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
  {
    question: "How do I find the right scheme for me?",
    answer:
      "Follow these steps: 1) Enter Details – Provide your basic information such as age, occupation, and location. 2) Find Your Schemes – Our system suggests the most relevant schemes for you. 3) Select & Apply – Review the options and apply directly through the portal."
  },
  {
    question: "Can I apply for multiple schemes?",
    answer:
      "Yes, you can apply for as many schemes as you are eligible for. Make sure to check the eligibility criteria for each scheme before applying."
  },
  {
    question: "How will I know if my application is approved?",
    answer:
      "Once you apply, you can track your application status from the Dashboard. You will also receive email or SMS updates if you provided your contact details during registration."
  },
  {
    question: "What documents do I need to apply?",
    answer:
      "The documents depend on the scheme you’re applying for. Commonly required documents include: Aadhaar Card, Proof of residence, Income certificate, Caste certificate (if applicable), Bank account details."
  },
  {
    question: "Is SaralSeva available in regional languages?",
    answer:
      "Currently, the portal supports Hindi and English. Work is ongoing to include more regional languages for wider accessibility."
  },
  {
    question: "Is there a mobile app for SaralSeva?",
    answer:
      "Yes. You can download the SaralSeva mobile app from the Google Play Store and Apple App Store. QR code and links are available at the bottom of the website."
  },
  {
    question: "What should I do if I face technical issues?",
    answer:
      "If you encounter any problems, contact our support team: Email: dgs@dgs.gov.in | Phone: 9876543210. Provide details of the issue and, if possible, share screenshots for quicker assistance."
  },
  {
    question: "How is my personal data protected?",
    answer:
      "SaralSeva follows the Government of India’s data protection and privacy guidelines. Your personal information is encrypted and used only for processing your scheme applications."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#fdfaf6] min-h-screen">
      {/* Header */}
      <header className="bg-[#7b3f00] text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">FAQs - SaralSeva</h1>
        </div>
      </header>

      {/* Main FAQ Section */}
      <main className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center text-[#7b3f00] mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl border border-orange-200"
            >
              <button
                className="w-full text-left px-6 py-4 flex justify-between items-center text-[#7b3f00] font-semibold"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span
                  className={`transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-700">{faq.answer}</div>
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
