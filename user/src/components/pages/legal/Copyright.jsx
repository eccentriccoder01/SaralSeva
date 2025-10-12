import React, { useState, useMemo } from 'react';

export default function Copyright() {
  const [lang, setLang] = useState('en');

  const C = useMemo(() => ({
    en: {
      title: 'Copyright Notice',
      tagline: 'Protecting content, empowering users',
      body1: `© ${new Date().getFullYear()} SaralSeva. All rights reserved. The content on this site (text, images, logos, code and design) is protected by copyright and other intellectual property laws.`,
      permittedTitle: 'Permitted uses',
      permitted: `You may view, share links to our pages, and use content for personal, non-commercial purposes. For any other use (reproduction, republication, bulk copying), please obtain written permission.`,
      takedownTitle: 'Copyright takedown',
      takedown: `If you believe your copyrighted work has been used without authorization, please contact us with sufficient details so we may investigate and act promptly.`,
      licenseTitle: 'License requests & permissions',
      license: `Contact our support team for licenses or requests to reuse content (provide exact content reference and purpose).`,
      contact: 'Email: legal@saralseva.example (replace with your real contact)',
    },
    hi: {
      title: 'कॉपीराइट सूचनाख',
      tagline: 'सामग्री की सुरक्षा, उपयोगकर्ताओं को सशक्त बनाना',
      body1: `© ${new Date().getFullYear()} SaralSeva। सर्वाधिकार सुरक्षित। इस साइट की सामग्री (टेक्स्ट, छवियाँ, लोगो, कोड और डिज़ाइन) कॉपीराइट और अन्य बौद्धिक संपदा कानूनों द्वारा सुरक्षित है।`,
      permittedTitle: 'अनुमत उपयोग',
      permitted: `आप साइट के पृष्ठों को देख और साझा कर सकते हैं और व्यक्तिगत, गैर-वाणिज्यिक प्रयोजनों के लिए सामग्री का उपयोग कर सकते हैं। किसी अन्य उपयोग (प्रजनन, पुनर्प्रकाशन, बल्क कॉपी) के लिए लिखित अनुमति प्राप्त करें।`,
      takedownTitle: 'कॉपीराइट हटाने का अनुरोध',
      takedown: `यदि आपको लगता है कि आपकी कॉपीराइटेड सामग्री का उपयोग बिना अनुमति के किया गया है, तो कृपया हमें पर्याप्त विवरण के साथ संपर्क करें ताकि हम जाँच कर सकें और त्वरित कार्रवाई कर सकें।`,
      licenseTitle: 'लाइसेंस अनुरोध और अनुमति',
      license: `सामग्री के उपयोग के लिए लाइसेंस या अनुरोधों के लिए कृपया हमारी सपोर्ट टीम से संपर्क करें (सटीक सामग्री संदर्भ और उद्देश्य प्रदान करें)।`,
      contact: 'ईमेल: legal@saralseva.example (इसे वास्तविक संपर्क से बदलें)',
    },
  }), []);

  const S = C[lang];

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">{S.title}</h1>
          <p className="text-amber-600 mt-2 font-medium">{S.tagline}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <label className="text-sm">EN</label>
            <input type="radio" name="lang" checked={lang === 'en'} onChange={() => setLang('en')} />
            <label className="text-sm">HI</label>
            <input type="radio" name="lang" checked={lang === 'hi'} onChange={() => setLang('hi')} />
          </div>
        </div>
      </div>

      <div className="md:flex gap-8">
        <aside className="md:w-1/4 mb-6 md:mb-0">
          <div className="bg-white p-4 rounded shadow-sm">
            <h4 className="font-semibold mb-2">{lang === 'en' ? 'Quick links' : 'त्वरित लिंक'}</h4>
            <ul className="text-sm space-y-2 text-amber-600">
              <li><a href="/terms">{lang === 'en' ? 'Terms of Service' : 'सेवा की शर्तें'}</a></li>
              <li><a href="/privacy">{lang === 'en' ? 'Privacy Policy' : 'गोपनीयता नीति'}</a></li>
              <li><a href="/cookie-policy">{lang === 'en' ? 'Cookie Policy' : 'कुकी नीति'}</a></li>
            </ul>
          </div>
        </aside>

        <main className="md:flex-1 prose max-w-none">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-4">{S.body1}</p>

            <section className="mb-4">
              <h3 className="text-lg font-semibold">{S.permittedTitle}</h3>
              <p className="text-gray-700">{S.permitted}</p>
            </section>

            <section className="mb-4">
              <h3 className="text-lg font-semibold">{S.takedownTitle}</h3>
              <p className="text-gray-700">{S.takedown}</p>
            </section>

            <section className="mb-4">
              <h3 className="text-lg font-semibold">{S.licenseTitle}</h3>
              <p className="text-gray-700">{S.license}</p>
            </section>

            <div className="mt-6 text-sm text-gray-600">
              <strong>{lang === 'en' ? 'Contact' : 'संपर्क'}:</strong> <span>{S.contact}</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
