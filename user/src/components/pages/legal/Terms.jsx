import React, { useMemo, useState } from 'react';
import banner from '../../../assets/header-banner2.jpg';

export default function Terms() {
  const [lang, setLang] = useState('en');
  const [open, setOpen] = useState({});

  const t = useMemo(() => ({
    en: {
      title: 'Terms of Service',
      subtitle: 'Please read these terms carefully before using SaralSeva.',
      lastUpdated: 'Last updated: October 12, 2025',
      toc: 'On this page',
      print: 'Print / Download',
      downloadPdf: 'Download PDF',
      backToTop: 'Back to top',
    },
    hi: {
      title: 'सेवा की शर्तें',
      subtitle: 'SaralSeva का उपयोग करने से पहले कृपया इन शर्तों को ध्यान से पढ़ें।',
      lastUpdated: 'अधिसूचित: 12 अक्टूबर, 2025',
      toc: 'इस पृष्ठ पर',
      print: 'प्रिंट / डाउनलोड',
      downloadPdf: 'PDF डाउनलोड करें',
      backToTop: 'ऊपर जाएँ',
    }
  }), []);

  // Core sections (simple strings kept short here; expand as needed)
  const SECTIONS = useMemo(() => ({
    en: [
      { id: 'intro', title: 'Introduction', body: `Welcome to SaralSeva. These Terms govern your use of our website and services. By using SaralSeva, you agree to these Terms.` },
      { id: 'use', title: 'Using the Service', body: `SaralSeva provides scheme information, application help and community features. Use the service responsibly.` },
      { id: 'accounts', title: 'Accounts & Security', body: `Keep your account secure. You are responsible for activity on your account.` },
      { id: 'content', title: 'Content & IP', body: `All content is protected by IP laws. Do not reproduce content without permission.` },
      { id: 'liability', title: 'Liability & Disclaimers', body: `Service provided “as is”. We disclaim warranties to the fullest extent permitted by law.` },
      { id: 'termination', title: 'Termination', body: `We may suspend or terminate accounts that violate these Terms.` },
      { id: 'governing', title: 'Governing Law', body: `These Terms are governed by the laws of India.` },
      { id: 'contact', title: 'Contact', body: `Contact support@saralseva.example for questions.` },
    ],
    hi: [
      { id: 'intro', title: 'परिचय', body: `SaralSeva में आपका स्वागत है। ये शर्तें हमारी वेबसाइट और सेवाओं के उपयोग को नियंत्रित करती हैं।` },
      { id: 'use', title: 'सेवा का उपयोग', body: `SaralSeva योजना जानकारी, आवेदन सहायता और सामुदायिक सुविधाएँ प्रदान करता है। सेवा का सावधानीपूर्वक उपयोग करें।` },
      { id: 'accounts', title: 'खाते और सुरक्षा', body: `अपने खाते को सुरक्षित रखें। खाते पर गतिविधियों के लिए आप जिम्मेदार हैं।` },
      { id: 'content', title: 'सामग्री और बौद्धिक संपदा', body: `सभी सामग्री IP कानूनों द्वारा सुरक्षित है। बिना अनुमति सामग्री न नकलें।` },
      { id: 'liability', title: 'दायित्व और अस्वीकरण', body: `सेवा "जैसी है" प्रदान की जाती है। हम कानून द्वारा अनुमति की गई सीमा तक वारंटियों से इनकार करते हैं।` },
      { id: 'termination', title: 'समाप्ति', body: `हम उन खातों को निलंबित या समाप्त कर सकते हैं जो इन शर्तों का उल्लंघन करते हैं।` },
      { id: 'governing', title: 'शासन कानून', body: `ये शर्तें भारत के कानूनों द्वारा शासित हैं।` },
      { id: 'contact', title: 'संपर्क', body: `प्रश्नों के लिए support@saralseva.example पर संपर्क करें।` },
    ]
  }), []);

  const sections = SECTIONS[lang] || SECTIONS.en;

  function toggle(id) {
    setOpen((s) => ({ ...s, [id]: !s[id] }));
  }

  function doPrint() {
    window.print();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#07132f] text-gray-900 dark:text-gray-100">
      <header className="relative h-44 md:h-56 overflow-hidden rounded-b-lg mb-6">
        <img src={banner} alt="Terms banner" className="w-full h-full object-cover brightness-75" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">{t[lang].title}</h1>
            <p className="mt-2 text-sm md:text-base text-white/90">{t[lang].subtitle}</p>
            <p className="mt-1 text-xs text-white/80">{t[lang].lastUpdated}</p>
          </div>

          <div className="absolute right-4 top-4 flex items-center gap-3">
            <button onClick={doPrint} className="text-sm px-3 py-1 bg-amber-500 text-white rounded-md">{t[lang].print}</button>
            <div className="flex items-center gap-2 text-white/90">
              <label className="text-sm">EN</label>
              <input type="radio" name="lang-terms" checked={lang === 'en'} onChange={() => setLang('en')} />
              <label className="text-sm">HI</label>
              <input type="radio" name="lang-terms" checked={lang === 'hi'} onChange={() => setLang('hi')} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-12">
        <div className="space-y-4">
          {sections.map((s) => {
            const excerpt = typeof s.body === 'string' ? (s.body.length > 160 ? s.body.slice(0, 160) + '…' : s.body) : '';
            return (
              <div key={s.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border-t-4 border-amber-500 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-stone-800 dark:text-gray-200">{s.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{excerpt}</p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => toggle(s.id)}
                      aria-expanded={!!open[s.id]}
                      aria-controls={`${s.id}-body`}
                      className={`px-4 py-2 rounded-full border ${open[s.id] ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-amber-700 border-amber-200'}`}
                    >
                      {open[s.id] ? (lang === 'hi' ? 'छुपाएँ' : 'Hide') : (lang === 'hi' ? 'पढ़ें' : 'Read')}
                    </button>
                  </div>
                </div>

                <div id={`${s.id}-body`} className={open[s.id] ? 'px-6 pb-6 pt-0 transition-all duration-300 max-h-screen' : 'px-6 pb-0 pt-0 max-h-0 overflow-hidden transition-all duration-300'}>
                  <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line pt-4">{s.body}</div>
                </div>
              </div>
            );
          })}

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">{t[lang].lastUpdated} • <strong>Version:</strong> 1.0</div>
            <div className="flex items-center gap-3">
              <button onClick={doPrint} className="px-4 py-2 bg-amber-500 text-white rounded-md">{t[lang].print}</button>
              <a href="#contact" className="text-sm text-amber-600 hover:underline">{t[lang].contact}</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
