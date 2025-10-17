import React, { useState } from 'react';
import banner from '../../../assets/header-banner2.jpg';
import { Printer, FileText, Users, Lock } from 'lucide-react';

export default function Copyright() {
  const [lang, setLang] = useState('en');

  const TEXT = {
    en: {
      title: 'Copyright Notice',
      subtitle: 'Ownership, permissions and reporting on SaralSeva',
      sections: [
        {
          id: 'ownership',
          title: 'Ownership of content',
          body: 'All original content on SaralSeva (text, images, logos, code, and designs) is owned or licensed by SaralSeva unless otherwise stated. Unauthorized reproduction is prohibited.'
        },
        {
          id: 'license',
          title: 'Limited license to users',
          body: 'Subject to these terms, SaralSeva grants you a limited, non-exclusive, non-transferable license to access and use the site for personal, non-commercial purposes.'
        },
        {
          id: 'user-submissions',
          title: 'User submissions & grants',
          body: 'By submitting content (comments, documents, or uploads) you grant SaralSeva a worldwide, royalty-free, perpetual license to use, reproduce, and display the content as necessary to provide the service.'
        },
        {
          id: 'dmca',
          title: 'DMCA / takedown requests',
          body: 'If you believe your copyrighted work has been used in a way that constitutes infringement, please provide a takedown notice with sufficient detail including identification of the copyrighted work, location of the infringing material, your contact information, and a signed statement under penalty of perjury.'
        },
        {
          id: 'jurisdiction',
          title: 'Jurisdiction & governing law',
          body: 'These terms are governed by applicable laws in India. Any disputes will be subject to the jurisdiction of the competent courts.'
        },
        {
          id: 'contact',
          title: 'Contact for copyright issues',
          body: 'For copyright concerns, contact our legal team at legal@saralseva.example (replace with the real address) with the details requested in our DMCA procedure.'
        },
      ],
    },
    hi: {
      title: 'कॉपीराइट नोटिस',
      subtitle: 'SaralSeva पर अधिकार, अनुमतियाँ और रिपोर्टिंग',
      sections: [
        {
          id: 'ownership',
          title: 'सामग्री का स्वामित्व',
          body: 'SaralSeva पर सभी मूल सामग्री (पाठ, छवियाँ, लोगो, कोड और डिज़ाइन) SaralSeva के स्वामित्व वाली या लाइसेंस प्राप्त हैं जब तक कि अन्यथा कहा न गया हो। अनधिकृत पुनरुत्पादन निषिद्ध है।'
        },
        {
          id: 'license',
          title: 'उपयोगकर्ताओं को सीमित लाइसेंस',
          body: 'इन शर्तों के अधीन, SaralSeva आपको व्यक्तिगत, गैर-व्यावसायिक उद्देश्यों के लिए साइट तक पहुँच और उपयोग करने के लिए एक सीमित, गैर-विशेष, अस्थायी लाइसेंस प्रदान करता है।'
        },
        {
          id: 'user-submissions',
          title: 'उपयोगकर्ता प्रस्तुतियाँ और ग्रांट्स',
          body: 'सामग्री (टिप्पणियाँ, दस्तावेज़ या अपलोड) सबमिट करके आप SaralSeva को आपकी सामग्री को सेवा प्रदान करने के लिए उपयोग, पुनरुत्पादन और दिखाने के लिए एक विश्वव्यापी, रॉयल्टी-रहित, स्थायी लाइसेंस प्रदान करते हैं।'
        },
        {
          id: 'dmca',
          title: 'DMCA / हटाने का अनुरोध',
          body: 'यदि आप मानते हैं कि आपके कॉपीराइटेड कार्य का उपयोग उल्लंघन के रूप में किया गया है, तो कृपया एक हटाने की नोटिस प्रदान करें जिसमें कॉपीराइटेड कार्य की पहचान, उल्लंघन सामग्री का स्थान, संपर्क जानकारी और परज़ाब के तहत हस्ताक्षरित बयान शामिल हो।'
        },
        {
          id: 'jurisdiction',
          title: 'क्षेत्राधिकार और लागू कानून',
          body: 'ये शर्तें भारत के लागू कानूनों के अधीन हैं। किसी भी विवाद के लिए सक्षम न्यायालयों का क्षेत्राधिकार लागू होगा।'
        },
        {
          id: 'contact',
          title: 'कॉपीराइट मुद्दों के लिए संपर्क',
          body: 'कॉपीराइट समस्याओं के लिए हमारी लीगल टीम से legal@saralseva.example पर संपर्क करें (इसे वास्तविक पते से बदलें) और DMCA प्रक्रिया में अनुरोधित विवरण भेजें।'
        },
      ],
    },
  };

  const data = TEXT[lang];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#061325] text-gray-900 dark:text-gray-100">
      <header className="relative h-56 md:h-72 lg:h-96 overflow-hidden rounded-b-lg mb-8">
        <img src={banner} alt="Copyright banner" className="w-full h-full object-cover brightness-75" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">{data.title}</h1>
            <p className="mt-2 text-sm md:text-base text-white/90">{data.subtitle}</p>
          </div>
          <div className="absolute right-4 top-4 flex items-center gap-3">
            <label className="text-sm text-white">EN</label>
            <input type="radio" name="copyright-lang" checked={lang === 'en'} onChange={() => setLang('en')} />
            <label className="text-sm text-white">HI</label>
            <input type="radio" name="copyright-lang" checked={lang === 'hi'} onChange={() => setLang('hi')} />
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
                  {s.id === 'ownership' && <FileText className="w-6 h-6 text-amber-500" />}
                  {s.id === 'license' && <Users className="w-6 h-6 text-amber-500" />}
                  {s.id === 'user-submissions' && <FileText className="w-6 h-6 text-amber-500" />}
                  {s.id === 'dmca' && <Lock className="w-6 h-6 text-amber-500" />}
                  {s.id === 'jurisdiction' && <FileText className="w-6 h-6 text-amber-500" />}
                  {s.id === 'contact' && <Users className="w-6 h-6 text-amber-500" />}
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

