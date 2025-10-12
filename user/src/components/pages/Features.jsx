import React, { useState, useMemo } from 'react';

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
    <div className="container mx-auto p-6">
      <header className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">{strings[lang].title}</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">{strings[lang].subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm">EN</label>
          <input type="radio" name="lang" checked={lang === 'en'} onChange={() => setLang('en')} />
          <label className="text-sm">HI</label>
          <input type="radio" name="lang" checked={lang === 'hi'} onChange={() => setLang('hi')} />
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURE_LIST.map((f) => (
          <div key={f.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{lang === 'hi' ? f.hiTitle : f.title}</h3>
            <p className="text-sm text-gray-700">{lang === 'hi' ? f.hiDesc : f.desc}</p>
          </div>
        ))}
      </section>

      <div className="mt-8 text-center">
        <a href="/schemes" className="px-6 py-3 bg-amber-500 text-white rounded-md">{strings[lang].cta}</a>
      </div>
    </div>
  );
}
