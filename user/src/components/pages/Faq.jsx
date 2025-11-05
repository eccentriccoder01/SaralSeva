import React, { useState, useMemo } from 'react';
import banner from './../../assets/header-banner2.jpg';
import indiaFlag from './../../assets/india.svg';

const FAQ_LIST = [
  { id: 'q1', q: 'How do I register and apply for a scheme?', a: `Register by creating an account or using Single Sign-On where available. After login, go to the Schemes page, find a scheme, click Apply and fill the form. Upload the required documents and submit. Track your applications from Dashboard.`, hiQ: 'मैं कैसे पंजीकरण करूँ और योजना के लिए आवेदन करूँ?', hiA: `खाता बनाकर या उपलब्ध होने पर Single Sign-On का उपयोग करके पंजीकरण करें। लॉगिन के बाद Schemes पेज पर जाएँ, योजना चुनें, Apply पर क्लिक करें और फॉर्म भरें। आवश्यक दस्तावेज अपलोड करके जमा करें। अपने आवेदन Dashboard से ट्रैक करें।`, category: 'Account' },
  { id: 'q2', q: 'What documents are required?', a: `Document requirements vary by scheme. Common documents include identity proof, address proof, and scheme-specific certificates. Check the scheme details page for exact requirements.`, hiQ: 'कौन से दस्तावेज़ आवश्यक हैं?', hiA: `दस्तावेज़ आवश्यकताएँ योजना के अनुसार भिन्न होती हैं। सामान्यतः पहचान पत्र, पता प्रमाण, और योजना-विशिष्ट प्रमाणपत्र शामिल हैं। सटीक आवश्यकताओं के लिए योजना विवरण पृष्ठ देखें।`, category: 'Schemes' },
  { id: 'q3', q: 'How to reset my password?', a: `Click Forgot Password on the login page and follow the steps to reset via OTP or email link, depending on your registration method.`, hiQ: 'मैं अपना पासवर्ड कैसे रीसेट करूँ?', hiA: `लॉगिन पेज पर Forgot Password पर क्लिक करें और अपने पंजीकरण विधि के अनुसार OTP या ईमेल लिंक के माध्यम से रीसेट करने के चरणों का पालन करें।`, category: 'Account' },
  { id: 'q4', q: 'How can Gram Panchayat officials use SaralSeva?', a: `Panchayat staff can register as institutional users, manage village-level data, upload reports, and monitor scheme progress in the dashboard. For on-site training, contact your district coordinator.`, hiQ: 'ग्राम पंचायत अधिकारी SaralSeva का कैसे उपयोग कर सकते हैं?', hiA: `पंचायत स्टाफ संस्थागत उपयोगकर्ता के रूप में पंजीकरण कर सकते हैं, गांव-स्तरीय डेटा प्रबंधित कर सकते हैं, रिपोर्ट अपलोड कर सकते हैं और डैशबोर्ड में योजना की प्रगति मॉनिटर कर सकते हैं। ऑन-साइट प्रशिक्षण के लिए अपने जिला समन्वयक से संपर्क करें।`, category: 'Panchayat' },
  { id: 'q5', q: 'Where can I get help if my application is stuck?', a: `Contact support through the Contact page or use the chatbot/Help Center contact form. Share your application ID for faster resolution.`, hiQ: 'यदि मेरा आवेदन अटका हुआ है तो मुझे मदद कहाँ मिल सकती है?', hiA: `Contact पेज के माध्यम से सपोर्ट से संपर्क करें या तेज़ सहायता के लिए चेटबोट/Help Center संपर्क फॉर्म का उपयोग करें। त्वरित समाधान के लिए अपना आवेदन आईडी साझा करें।`, category: 'Support' },
  { id: 'q6', q: 'How do I check the status of my application?', a: `Go to Dashboard → Applications and enter your application ID or look under the Recent Applications list. Status updates and office comments (if any) will be shown there.`, hiQ: 'मैं अपने आवेदन की स्थिति कैसे जांच सकता/सकती हूँ?', hiA: `Dashboard → Applications पर जाएँ और अपना आवेदन आईडी दर्ज करें या Recent Applications सूची देखें। स्थिति अपडेट और कार्यालय टिप्पणियाँ वहीं दिखाई जाएँगी।`, category: 'Support' },
  { id: 'q7', q: 'How long does it take to process an application?', a: `Processing time depends on the scheme and the local office. Typical timelines are listed on each scheme's detail page; if it exceeds the stated time, contact support with your application ID.`, hiQ: 'एक आवेदन को प्रोसेस होने में कितना समय लगता है?', hiA: `प्रोसेसिंग समय योजना और स्थानीय कार्यालय पर निर्भर करता है। सामान्य समयसीमाएँ प्रत्येक योजना के विवरण पृष्ठ पर दी जाती हैं; यदि यह समय सीमा से अधिक हो तो अपने आवेदन आईडी के साथ सपोर्ट से संपर्क करें।`, category: 'Process' },
  { id: 'q8', q: 'Can I edit my submitted application?', a: `Some schemes allow edits within a short window; others do not. If edits are allowed, you'll see an Edit option on the application details page. Otherwise, contact support to request changes.`, hiQ: 'क्या मैं अपना जमा किया हुआ आवेदन संपादित कर सकता/सकती हूँ?', hiA: `कुछ योजनाओं में छोटी विंडो के भीतर संपादन की अनुमति होती है; अन्य में नहीं। यदि संपादन की अनुमति है, तो आवेदन विवरण पृष्ठ पर Edit विकल्प दिखाई देगा। अन्यथा, परिवर्तन के लिए सपोर्ट से संपर्क करें।`, category: 'Process' },
];

export default function Faq() {
  const [lang, setLang] = useState('en');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [open, setOpen] = useState({});

  const categories = useMemo(() => ['All', ...Array.from(new Set(FAQ_LIST.map((f) => f.category)))], []);

  const strings = useMemo(() => ({
    en: {
      title: 'FAQ',
      subtitle: 'Find answers, guides, and contact options to help you use SaralSeva.',
      searchPlaceholder: 'Search FAQs, guides...',
      categoryLabel: 'Category',
      stillHelp: 'Still need help?',
      contactSupport: 'Contact Support',
      openChatbot: 'Open Chatbot',
      print: 'Print this page',
    },
    hi: {
      title: 'FAQ',
      subtitle: 'SaralSeva का उपयोग करने में सहायता के लिए उत्तर, मार्गदर्शिकाएँ और संपर्क विकल्प खोजें।',
      searchPlaceholder: 'FAQs, मार्गदर्शिकाएँ खोजें...',
      categoryLabel: 'वर्ग',
      stillHelp: 'क्या आपको अभी भी मदद चाहिए?',
      contactSupport: 'सपोर्ट से संपर्क करें',
      openChatbot: 'चेटबोट खोलें',
      print: 'पृष्ठ प्रिंट करें',
    },
  }), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQ_LIST.filter((f) => (category === 'All' || f.category === category) && (!q || (f.q + ' ' + f.a + ' ' + (f.hiQ || '') + ' ' + (f.hiA || '')).toLowerCase().includes(q)));
  }, [query, category]);

  return (
    <div className="bg-orange-50/30 dark:bg-gray-900/50 transition-colors duration-300">
      <div className="relative flex items-center justify-center h-48 bg-cover bg-center" style={{ backgroundImage: `url(${banner})` }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative text-center">
          <h1 className="text-5xl font-extrabold text-white jost tracking-wider">{strings[lang].title}</h1>
          <p className="mt-2 text-white text-sm md:text-base opacity-90">{strings[lang].subtitle}</p>
        </div>
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <label className="text-sm text-white">EN</label>
          <input type="radio" name="lang" checked={lang === 'en'} onChange={() => setLang('en')} />
          <label className="text-sm text-white">HI</label>
          <input type="radio" name="lang" checked={lang === 'hi'} onChange={() => setLang('hi')} />
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-gray-600 mt-1">{strings[lang].subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => window.print()} className="text-sm px-3 py-1 border rounded">{strings[lang].print}</button>
            <label className="text-sm">EN</label>
            <input type="radio" name="lang" checked={lang === 'en'} onChange={() => setLang('en')} />
            <label className="text-sm">HI</label>
            <input type="radio" name="lang" checked={lang === 'hi'} onChange={() => setLang('hi')} />
          </div>
        </div>

        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="search" className="sr-only">Search FAQ</label>
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
                <h3 className="font-semibold mb-3">{strings[lang].stillHelp}</h3>
                <ul className="text-sm space-y-2">
                  <li><a href="/contact" className="text-amber-600">{strings[lang].contactSupport}</a></li>
                  <li><a href="/chatbot" className="text-amber-600">{strings[lang].openChatbot}</a></li>
                  <li><a href="/schemes" className="text-amber-600">{lang === 'hi' ? 'योजनाएँ खोजें' : 'Find Schemes'}</a></li>
                </ul>
              </div>
            </aside>

            <section className="md:col-span-2">
              <div className="relative">
                <img src={indiaFlag} alt="" className="absolute -top-8 right-4 w-80 opacity-10 pointer-events-none select-none" style={{ transform: 'rotate(-6deg)' }} />
                <div className="space-y-6">
                  {results.map((f) => (
                    <div key={f.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border-t-4 border-amber-500 overflow-hidden">
                      <div className="px-6 py-4 flex items-start justify-between">
                        <h4 className="text-lg font-semibold text-stone-800 dark:text-gray-200">{lang === 'hi' && f.hiQ ? f.hiQ : f.q}</h4>
                        <button onClick={() => setOpen((s) => ({ ...s, [f.id]: !s[f.id] }))} aria-expanded={!!open[f.id]} className={`ml-4 px-3 py-1 rounded-full border ${open[f.id] ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-amber-700 border-amber-200'} focus:outline-none focus:ring-2 focus:ring-amber-300`} aria-label={open[f.id] ? (lang === 'hi' ? 'उत्तर छुपाएँ' : 'Hide answer') : (lang === 'hi' ? 'उत्तर देखें' : 'View answer')}>
                          {open[f.id] ? (lang === 'hi' ? 'उत्तर छुपाएँ' : 'Hide') : (lang === 'hi' ? 'उत्तर देखें' : 'View')}
                        </button>
                      </div>

                      <div className={open[f.id] ? 'px-6 pb-6 pt-0 transition-all duration-300 max-h-screen' : 'px-6 pb-0 pt-0 max-h-0 overflow-hidden transition-all duration-300'}>
                        <div className="bg-white dark:bg-gray-800 text-base text-gray-700 dark:text-gray-300 whitespace-pre-line">
                          {lang === 'hi' && f.hiA ? f.hiA : f.a}
                        </div>
                      </div>
                    </div>
                  ))}

                  {results.length === 0 && (
                    <div className="text-center text-gray-500">{lang === 'hi' ? 'कोई परिणाम नहीं मिला। अलग खोज आज़माएँ।' : 'No results found. Try a different search.'}</div>
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
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
