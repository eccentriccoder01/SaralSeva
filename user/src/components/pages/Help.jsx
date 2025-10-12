import React, { useState, useMemo } from 'react';

const FAQS = [
  {
    id: 'f1',
    q: 'How do I register and apply for a scheme?',
    a: `Register by creating an account or using Single Sign-On where available. After login, go to the Schemes page, find a scheme, click Apply and fill the form. Upload the required documents and submit. Track your applications from Dashboard.`,
    hiQ: 'मैं कैसे पंजीकरण करूँ और योजना के लिए आवेदन करूँ?',
    hiA: `खाता बनाकर या उपलब्ध होने पर Single Sign-On का उपयोग करके पंजीकरण करें। लॉगिन के बाद Schemes पेज पर जाएँ, योजना चुनें, Apply पर क्लिक करें और फॉर्म भरें। आवश्यक दस्तावेज अपलोड करके जमा करें। अपने आवेदन Dashboard से ट्रैक करें।`,
    category: 'Account',
  },
  {
    id: 'f2',
    q: 'What documents are required?',
    a: `Document requirements vary by scheme. Common documents include identity proof, address proof, and scheme-specific certificates. Check the scheme details page for exact requirements.`,
    hiQ: 'कौन से दस्तावेज़ आवश्यक हैं?',
    hiA: `दस्तावेज़ आवश्यकताएँ योजना के अनुसार भिन्न होती हैं। सामान्यतः पहचान पत्र, पता प्रमाण, और योजना-विशिष्ट प्रमाणपत्र शामिल हैं। सटीक आवश्यकताओं के लिए योजना विवरण पृष्ठ देखें।`,
    category: 'Schemes',
  },
  {
    id: 'f3',
    q: 'How to reset my password?',
    a: `Click Forgot Password on the login page and follow the steps to reset via OTP or email link, depending on your registration method.`,
    hiQ: 'मैं अपना पासवर्ड कैसे रीसेट करूँ?',
    hiA: `लॉगिन पेज पर Forgot Password पर क्लिक करें और अपने पंजीकरण विधि के अनुसार OTP या ईमेल लिंक के माध्यम से रीसेट करने के चरणों का पालन करें।`,
    category: 'Account',
  },
  {
    id: 'f4',
    q: 'How can Gram Panchayat officials use SaralSeva?',
    a: `Panchayat staff can register as institutional users, manage village-level data, upload reports, and monitor scheme progress in the dashboard. For on-site training, contact your district coordinator.`,
    hiQ: 'ग्राम पंचायत अधिकारी SaralSeva का कैसे उपयोग कर सकते हैं?',
    hiA: `पंचायत स्टाफ संस्थागत उपयोगकर्ता के रूप में पंजीकरण कर सकते हैं, गांव-स्तरीय डेटा प्रबंधित कर सकते हैं, रिपोर्ट अपलोड कर सकते हैं और डैशबोर्ड में योजना की प्रगति मॉनिटर कर सकते हैं। ऑन-साइट प्रशिक्षण के लिए अपने जिला समन्वयक से संपर्क करें।`,
    category: 'Panchayat',
  },
  {
    id: 'f5',
    q: 'Where can I get help if my application is stuck?',
    a: `Contact support through the Contact page or use the chatbot/Help Center contact form. Share your application ID for faster resolution.`,
    hiQ: 'यदि मेरा आवेदन अटका हुआ है तो मुझे मदद कहाँ मिल सकती है?',
    hiA: `Contact पेज के माध्यम से सपोर्ट से संपर्क करें या तेज़ सहायता के लिए चेटबोट/Help Center संपर्क फॉर्म का उपयोग करें। त्वरित समाधान के लिए अपना आवेदन आईडी साझा करें।`,
    category: 'Support',
  },
];

export default function Help() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState({});
  const [lang, setLang] = useState('en');

  const categories = useMemo(() => ['All', ...Array.from(new Set(FAQS.map((f) => f.category)))], []);
  const [category, setCategory] = useState('All');

  const strings = useMemo(() => ({
    en: {
      title: 'Help Center',
      subtitle: 'Find answers, guides, and contact options to help you use SaralSeva.',
      searchPlaceholder: 'Search FAQs, guides...',
      categoryLabel: 'Category',
      quickLinks: 'Quick links',
      stillHelp: 'Still need help?',
      contactSupport: 'Contact Support',
      openChatbot: 'Open Chatbot',
      noResults: 'No results found. Try a different search or contact support.',
    },
    hi: {
      title: 'सहायता केंद्र',
      subtitle: 'SaralSeva का उपयोग करने में सहायता के लिए उत्तर, मार्गदर्शिकाएँ और संपर्क विकल्प खोजें।',
      searchPlaceholder: 'FAQs, मार्गदर्शिकाएँ खोजें...',
      categoryLabel: 'वर्ग',
      quickLinks: 'त्वरित लिंक',
      stillHelp: 'क्या आपको अभी भी मदद चाहिए?',
      contactSupport: 'सपोर्ट से संपर्क करें',
      openChatbot: 'चेटबोट खोलें',
      noResults: 'कोई परिणाम नहीं मिला। अलग खोज आज़माएँ या सपोर्ट से संपर्क करें।',
    },
  }), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((f) => (category === 'All' || f.category === category) && (!q || (f.q + ' ' + (f.a || '') + ' ' + (f.hiQ || '') + ' ' + (f.hiA || '')).toLowerCase().includes(q)));
  }, [query, category]);

  return (
    <div className="container mx-auto p-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{strings[lang].title}</h1>
          <p className="text-gray-600 mt-2">{strings[lang].subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm">EN</label>
          <input type="radio" name="lang" checked={lang === 'en'} onChange={() => setLang('en')} />
          <label className="text-sm">HI</label>
          <input type="radio" name="lang" checked={lang === 'hi'} onChange={() => setLang('hi')} />
        </div>
      </header>

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-2">
          <label htmlFor="search" className="sr-only">Search Help</label>
          <input id="search" className="px-3 py-2 border rounded-md w-72" placeholder={strings[lang].searchPlaceholder} value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="category" className="text-sm">{strings[lang].categoryLabel}</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="px-2 py-1 border rounded-md">
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <main>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <aside className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">{strings[lang].quickLinks}</h3>
              <ul className="text-sm space-y-2">
                <li><a href="/schemes" className="text-amber-600">{lang === 'hi' ? 'योजनाएँ खोजें' : 'Find Schemes'}</a></li>
                <li><a href="/faq" className="text-amber-600">{lang === 'hi' ? 'बार-बार पूछे जाने वाले प्रश्न' : 'FAQs'}</a></li>
                <li><a href="/contact" className="text-amber-600">{lang === 'hi' ? 'सपोर्ट से संपर्क करें' : 'Contact Support'}</a></li>
                <li><a href="/blog" className="text-amber-600">{lang === 'hi' ? 'मार्गदर्शिकाएँ और लेख' : 'Guides & Articles'}</a></li>
              </ul>
            </div>
          </aside>

          <section className="md:col-span-2">
            <div className="space-y-4">
              {results.map((f) => (
                <div key={f.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <button className="w-full text-left" onClick={() => setOpen((s) => ({ ...s, [f.id]: !s[f.id] }))} aria-expanded={!!open[f.id]}>
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{lang === 'hi' && f.hiQ ? f.hiQ : f.q}</h4>
                      <span className="text-amber-500">{open[f.id] ? '−' : '+'}</span>
                    </div>
                  </button>
                  {open[f.id] && (
                    <div className="mt-3 text-sm text-gray-700 whitespace-pre-line">{lang === 'hi' && f.hiA ? f.hiA : f.a}</div>
                  )}
                </div>
              ))}

              {results.length === 0 && (
                <div className="text-center text-gray-500">{strings[lang].noResults}</div>
              )}

              <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{strings[lang].stillHelp}</h3>
                <p className="text-sm text-gray-700 mb-3">{lang === 'hi' ? 'यदि आप उत्तर नहीं ढूंढ पा रहे हैं, तो हमारे सपोर्ट से संपर्क करें या तेज़ सहायता के लिए चेटबोट का उपयोग करें।' : 'If you can\'t find an answer, contact our support team or use the chatbot for quick assistance.'}</p>
                <div className="flex gap-2">
                  <a href="/contact" className="px-4 py-2 bg-amber-500 text-white rounded-md">{strings[lang].contactSupport}</a>
                  <a href="/chatbot" className="px-4 py-2 border rounded-md">{strings[lang].openChatbot}</a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
