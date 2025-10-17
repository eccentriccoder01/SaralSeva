import React, { useState } from 'react';
import banner from '../../../assets/header-banner2.jpg';
import { Printer, Database, FileText, Users, Lock, Eye, Mail } from 'lucide-react';

export default function Disclaimer() {
  const [lang, setLang] = useState('en');

  const TEXT = {
    en: {
      title: 'Disclaimer',
      subtitle: 'Important information about the content on SaralSeva',
      sections: [
        { id: 'accuracy', title: 'Accuracy', body: 'The content on SaralSeva is provided for general informational purposes. While we try to keep information current, we do not guarantee its completeness or accuracy.' },
        { id: 'professional', title: 'Not professional advice', body: 'The site does not provide medical, legal, financial, or other professional advice. For specific advice, consult a qualified professional.' },
        { id: 'links', title: 'External links', body: 'SaralSeva may link to external sites. We are not responsible for the content, practices, or privacy policies of those sites.' },
        { id: 'endorsement', title: 'No endorsement', body: 'Links or mentions do not imply endorsement. Any reliance on information found on this site is at your own risk.' },
        { id: 'changes', title: 'Changes', body: 'We may update content at any time. Continued use after changes means you accept the updated information.' },
        { id: 'liability', title: 'Limitation of liability', body: 'To the fullest extent permitted by law, SaralSeva and its contributors are not liable for any damages resulting from use of the site.' },
      ],
  // contact removed per request
    },
    hi: {
      title: 'अस्वीकरण',
      subtitle: 'SaralSeva पर सामग्री के बारे में महत्वपूर्ण जानकारी',
      sections: [
        { id: 'accuracy', title: 'सटीकता', body: 'SaralSeva पर दी गई जानकारी केवल सामान्य प्रयोजनों के लिए है। हम जानकारी की पूर्णता या सटीकता की गारंटी नहीं देते।' },
        { id: 'professional', title: 'पेशेवर सलाह नहीं', body: 'यह साइट चिकित्सा, कानूनी, वित्तीय या अन्य पेशेवर सलाह प्रदान नहीं करती। विशिष्ट मामलों के लिए योग्य पेशेवर से परामर्श लें।' },
        { id: 'links', title: 'बाहरी लिंक', body: 'SaralSeva बाहरी साइटों के लिंक रख सकता है। हम उन साइटों की सामग्री, प्रथाओं या गोपनीयता नीतियों के लिए उत्तरदायी नहीं हैं।' },
        { id: 'endorsement', title: 'समर्थन नहीं', body: 'किसी लिंक या उल्लेख का समर्थन होना आवश्यक नहीं है। इस साइट पर मिली जानकारी पर भरोसा आपकी जिम्मेदारी है।' },
        { id: 'changes', title: 'बदलाव', body: 'हम किसी भी समय सामग्री अपडेट कर सकते हैं। बदलावों के बाद साइट का निरंतर उपयोग अपडेट जानकारी की स्वीकृति माना जाएगा।' },
        { id: 'liability', title: 'दायित्व की सीमा', body: 'कानून द्वारा अनुमति की अधिकतम सीमा तक, SaralSeva और इसके योगदानकर्ता साइट के उपयोग से होने वाले किसी भी नुकसान के लिए उत्तरदायी नहीं होंगे।' },
      ],
  // contact removed per request
    },
  };

  const data = TEXT[lang];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#061325] text-gray-900 dark:text-gray-100">
      <header className="relative h-56 md:h-72 lg:h-96 overflow-hidden rounded-b-lg mb-8">
        <img src={banner} alt="Disclaimer banner" className="w-full h-full object-cover brightness-75" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">{data.title}</h1>
            <p className="mt-2 text-sm md:text-base text-white/90">{data.subtitle}</p>
          </div>
          <div className="absolute right-4 top-4 flex items-center gap-3">
            <label className="text-sm text-white">EN</label>
            <input type="radio" name="disclaimer-lang" checked={lang === 'en'} onChange={() => setLang('en')} />
            <label className="text-sm text-white">HI</label>
            <input type="radio" name="disclaimer-lang" checked={lang === 'hi'} onChange={() => setLang('hi')} />
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
                  {s.id === 'accuracy' && <Database className="w-6 h-6 text-amber-500" />}
                  {s.id === 'professional' && <FileText className="w-6 h-6 text-amber-500" />}
                  {s.id === 'links' && <Users className="w-6 h-6 text-amber-500" />}
                  {s.id === 'endorsement' && <Lock className="w-6 h-6 text-amber-500" />}
                  {s.id === 'changes' && <Eye className="w-6 h-6 text-amber-500" />}
                  {s.id === 'liability' && <Mail className="w-6 h-6 text-amber-500" />}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white">{s.title}</h3>
                  <p className="text-gray-700 dark:text-gray-200 mb-3">{s.body}</p>
                </div>
              </div>
            </article>
          ))}

          {/* contact line removed */}
        </div>
      </main>
    </div>
  );
}
