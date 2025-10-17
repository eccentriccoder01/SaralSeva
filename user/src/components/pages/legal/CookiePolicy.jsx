import React, { useState } from 'react';
import banner from '../../../assets/header-banner2.jpg';
import { Printer, Coffee, Database, Lock, Eye } from 'lucide-react';

export default function CookiePolicy() {
  const [lang, setLang] = useState('en');

  const TEXT = {
    en: {
      title: 'Cookie Policy',
      subtitle: 'How we use cookies and similar technologies on SaralSeva',
      sections: [
        { id: 'what', title: 'What are cookies?', body: 'Cookies are small text files stored on your device that help sites remember information about your visit. They enable features, remember preferences, and help with analytics.' },
        { id: 'types', title: 'Types of cookies we use', body: 'Essential cookies (required for the site to work), Performance cookies (analytics), Functional cookies (preferences), and Advertising cookies (third-party ads and personalization).' },
        { id: 'purpose', title: 'Why we use cookies', body: 'We use cookies to provide core functionality, analyze usage to improve the site, remember language and accessibility settings, and deliver relevant content.' },
        { id: 'control', title: 'Managing cookies', body: 'You can control cookies via your browser settings. To opt-out of analytics or advertising cookies, use the provided preferences or your browser privacy controls.' },
        { id: 'third', title: 'Third-party cookies', body: 'We may use third-party services (analytics, maps, ad partners) that set their own cookies. We do not control their policies — please check the provider for details.' },
      ],
    },
    hi: {
      title: 'कुकी नीति',
      subtitle: 'SaralSeva पर हम कुकीज और समान तकनीकों का कैसे उपयोग करते हैं',
      sections: [
        { id: 'what', title: 'कुकीज़ क्या हैं?', body: 'कुकीज़ आपके डिवाइस पर संग्रहीत छोटे टेक्स्ट फ़ाइलें होती हैं जो आपकी यात्रा के बारे में जानकारी याद रखने में मदद करती हैं। वे सुविधाएँ सक्षम करती हैं, प्राथमिकताएँ याद रखती हैं, और विश्लेषण में मदद करती हैं।' },
        { id: 'types', title: 'हम किन प्रकार की कुकीज़ का उपयोग करते हैं', body: 'आवश्यक कुकीज़ (साइट के लिए आवश्यक), प्रदर्शन कुकीज़ (विश्लेषण), कार्यात्मक कुकीज़ (प्राथमिकताएँ), और विज्ञापन कुकीज़ (तीसरे पक्ष के विज्ञापन और वैयक्तिकरण)।' },
        { id: 'purpose', title: 'हम कुकीज़ क्यों उपयोग करते हैं', body: 'हम साइट की मूल कार्यक्षमता प्रदान करने, उपयोग विश्लेषण करने, भाषा और पहुँच सेटिंग्स याद रखने, और प्रासंगिक सामग्री प्रदान करने के लिए कुकीज़ का उपयोग करते हैं।' },
        { id: 'control', title: 'कुकीज़ का प्रबंधन', body: 'आप अपने ब्राउज़र सेटिंग्स के माध्यम से कुकीज़ को नियंत्रित कर सकते हैं। विश्लेषण या विज्ञापन कुकीज़ से ऑप्ट-आउट करने के लिए प्रदान की गई प्राथमिकताओं या ब्राउज़र गोपनीयता नियंत्रण का उपयोग करें।' },
        { id: 'third', title: 'तीसरे पक्ष की कुकीज़', body: 'हम तीसरे पक्ष की सेवाओं (विश्लेषण, मानचित्र, विज्ञापन भागीदार) का उपयोग कर सकते हैं जो अपनी कुकीज़ सेट करते हैं। उनकी नीतियों पर हमारा नियंत्रण नहीं है — कृपया विवरण के लिए प्रदाता की जाँच करें।' },
      ],
    },
  };

  const data = TEXT[lang];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#061325] text-gray-900 dark:text-gray-100">
      <header className="relative h-56 md:h-72 lg:h-96 overflow-hidden rounded-b-lg mb-8">
        <img src={banner} alt="Cookie banner" className="w-full h-full object-cover brightness-75" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">{data.title}</h1>
            <p className="mt-2 text-sm md:text-base text-white/90">{data.subtitle}</p>
          </div>
          <div className="absolute right-4 top-4 flex items-center gap-3">
            <label className="text-sm text-white">EN</label>
            <input type="radio" name="cookie-lang" checked={lang === 'en'} onChange={() => setLang('en')} />
            <label className="text-sm text-white">HI</label>
            <input type="radio" name="cookie-lang" checked={lang === 'hi'} onChange={() => setLang('hi')} />
            <button
              onClick={() => window.print()}
              title={lang === 'hi' ? 'छापें' : 'Print'}
              className="bg-white/10 hover:bg-white/20 text-white rounded px-2 py-1 text-sm flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="space-y-6">
          {data.sections.map((s) => (
            <article key={s.id} id={s.id} className="relative overflow-hidden rounded-lg p-6 shadow-sm ring-1 ring-gray-100 dark:ring-0 bg-white dark:bg-[#071322]">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" aria-hidden />
              <div className="flex items-start gap-4 ml-4">
                <div className="flex-shrink-0 text-amber-500 mt-1">
                  <Coffee className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white">{s.title}</h3>
                  <p className="text-gray-700 dark:text-gray-200 mb-3">{s.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

