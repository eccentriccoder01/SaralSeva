import React, { useState, useMemo } from 'react';
import banner from "../../assets/header-banner2.jpg";

const FEATURE_LIST = [
  {
    id: 'f1',
    title: 'Schemes Finder',
    hiTitle: 'योजनाएँ खोजें',
    desc: 'Search and discover government schemes relevant to you using filters like eligibility, location and benefits.',
    hiDesc: 'पात्रता, स्थान और लाभ जैसे फ़िल्टर का उपयोग करके आपके लिए उपयुक्त सरकारी योजनाएँ खोजें।',
    icon: '🔍',
  },
  {
    id: 'f2',
    title: 'Apply Online',
    hiTitle: 'ऑनलाइन आवेदन',
    desc: 'Apply for schemes online with document uploads, validation and tracking in one place.',
    hiDesc: 'दस्तावेज़ अपलोड, सत्यापन और ट्रैकिंग के साथ ऑनलाइन आवेदन करें।',
    icon: '📝',
  },
  {
    id: 'f3',
    title: 'Dashboard & Tracking',
    hiTitle: 'डैशबोर्ड और ट्रैकिंग',
    desc: 'Monitor application status, scheme progress and important alerts from your personalised dashboard.',
    hiDesc: 'अपने व्यक्तिगत डैशबोर्ड से आवेदन की स्थिति, योजना प्रगति और महत्वपूर्ण सूचनाएँ देखें।',
    icon: '📊',
  },
  {
    id: 'f4',
    title: 'Panchayat Tools',
    hiTitle: 'पंचायत टूल्स',
    desc: 'Tools for Gram Panchayat staff: reporting, data uploads, and local administration features.',
    hiDesc: 'ग्राम पंचायत स्टाफ के लिए टूल्स: रिपोर्टिंग, डेटा अपलोड और स्थानीय प्रशासन फीचर्स।',
    icon: '🏛️',
  },
  {
    id: 'f5',
    title: 'Help & Support',
    hiTitle: 'सहायता और सपोर्ट',
    desc: 'Help Center, chatbot and support channels to resolve issues and guide users.',
    hiDesc: 'समस्याओं का समाधान और उपयोगकर्ताओं का मार्गदर्शन करने के लिए सहायता केंद्र, चैटबोट और सपोर्ट चैनल।',
    icon: '💬',
  },
  {
    id: 'f6',
    title: 'Mobile App',
    hiTitle: 'मोबाइल ऐप',
    desc: 'Download the SaralSeva mobile app to access services on the go.',
    hiDesc: 'सारलसेवा मोबाइल ऐप डाउनलोड करें और चलते-फिरते सेवाओं का उपयोग करें।',
    icon: '📱',
  },
];

export default function Features() {
  const [lang, setLang] = useState('en');

  const strings = useMemo(() => ({
    en: {
      title: 'Features Overview',
      subtitle: 'What SaralSeva offers — simplified access to public schemes and admin tools for Panchayats.',
      cta: 'Explore Schemes',
    },
    hi: {
      title: 'फ़ीचर्स अवलोकन',
      subtitle: 'SaralSeva क्या प्रदान करता है — सार्वजनिक योजनाओं और पंचायतों के लिए प्रशासनिक टूल्स तक आसान पहुँच।',
      cta: 'योजनाएँ देखें',
    },
  }), []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#07132f] text-gray-900 dark:text-gray-100">
      <header className="relative h-56 md:h-72 lg:h-96 overflow-hidden rounded-b-lg mb-8">
        <img src={banner} alt="Features banner" className="w-full h-full object-cover brightness-75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/15" />
        <div className="absolute inset-0 flex items-center justify-center">
          {/* decorative flag removed per request */}
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {strings[lang].title}
            </h1>
            <p className="mt-2 text-sm md:text-base opacity-90 text-white">{strings[lang].subtitle}</p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <label className="text-sm">EN</label>
              <input type="radio" name="lang" checked={lang === 'en'} onChange={() => setLang('en')} />
              <label className="text-sm">HI</label>
              <input type="radio" name="lang" checked={lang === 'hi'} onChange={() => setLang('hi')} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURE_LIST.map((f) => (
            <article key={f.id} className="bg-white dark:bg-[#082040] border border-gray-100 dark:border-transparent shadow-sm rounded-lg p-6">
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-4 text-lg font-semibold">{lang === 'hi' ? f.hiTitle : f.title}</h3>
              <p className="mt-2 text-sm opacity-90">{lang === 'hi' ? f.hiDesc : f.desc}</p>
            </article>
          ))}
        </section>

        <section className="mt-12 text-center">
          <a href="/schemes" className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">{strings[lang].cta}</a>
        </section>
      </main>
    </div>
  );
}
