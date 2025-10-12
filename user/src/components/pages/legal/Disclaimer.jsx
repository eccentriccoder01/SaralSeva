import React, { useState } from 'react';

export default function Disclaimer() {
  const [lang, setLang] = useState('en');

  const simple = {
    en: {
      title: 'Disclaimer',
      text: {
        accuracy: 'The content on SaralSeva is provided for general informational purposes. While we try to keep information current, we do not guarantee its completeness or accuracy.',
        professional: 'The site does not provide medical, legal, financial, or other professional advice. For specific advice, consult a qualified professional.',
        external: 'SaralSeva may link to external sites. We are not responsible for the content, practices, or privacy policies of those sites.',
        endorsement: 'Links or mentions do not imply endorsement. Any reliance on information found on this site is at your own risk.',
        changes: 'We may update content at any time. Continued use after changes means you accept the updated information.',
        liability: 'To the fullest extent permitted by law, SaralSeva and its contributors are not liable for any damages resulting from use of the site.',
        contact: 'If you have concerns about content, contact us at support@saralseva.example (replace with a real address).',
      },
    },
    hi: {
      title: 'अस्वीकरण',
      text: {
        accuracy: 'SaralSeva पर दी गई जानकारी केवल सामान्य प्रयोजनों के लिए है। हम जानकारी की पूर्णता या सटीकता की गारंटी नहीं देते।',
        professional: 'यह साइट चिकित्सा, कानूनी, वित्तीय या अन्य पेशेवर सलाह प्रदान नहीं करती। विशिष्ट मामलों के लिए योग्य पेशेवर से परामर्श लें।',
        external: 'SaralSeva बाहरी साइटों के लिंक रख सकता है। हम उन साइटों की सामग्री, प्रथाओं या गोपनीयता नीतियों के लिए उत्तरदायी नहीं हैं।',
        endorsement: 'किसी लिंक या उल्लेख का समर्थन होना आवश्यक नहीं है। इस साइट पर मिली जानकारी पर भरोसा आपकी जिम्मेदारी है।',
        changes: 'हम किसी भी समय सामग्री अपडेट कर सकते हैं। बदलावों के बाद साइट का निरंतर उपयोग अपडेट जानकारी की स्वीकृति माना जाएगा।',
        liability: 'कानून द्वारा अनुमति की अधिकतम सीमा तक, SaralSeva और इसके योगदानकर्ता साइट के उपयोग से होने वाले किसी भी नुकसान के लिए उत्तरदायी नहीं होंगे।',
        contact: 'सामग्री के बारे में चिंता के लिए हमें support@saralseva.example पर संपर्क करें (इसे वास्तविक पते से बदलें)।',
      },
    },
  };

  const S = simple[lang];

  const sections = [
    { id: 'accuracy', title: lang === 'en' ? 'Accuracy' : 'सटीकता', body: S.text.accuracy },
    { id: 'professional', title: lang === 'en' ? 'Not professional advice' : 'पेशेवर सलाह नहीं', body: S.text.professional },
    { id: 'links', title: lang === 'en' ? 'External links' : 'बाहरी लिंक', body: S.text.external },
    { id: 'endorsement', title: lang === 'en' ? 'No endorsement' : 'समर्थन नहीं', body: S.text.endorsement },
    { id: 'changes', title: lang === 'en' ? 'Changes' : 'बदलाव', body: S.text.changes },
    { id: 'liability', title: lang === 'en' ? 'Limitation of liability' : 'दायित्व की सीमा', body: S.text.liability },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">{S.title}</h1>
          <p className="text-sm text-gray-500 mt-1">Last updated: October 13, 2025</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => window.print()} className="text-sm px-3 py-1 border rounded">Print</button>
          <div className="flex items-center gap-2">
            <label className="text-sm">EN</label>
            <input type="radio" name="lang" checked={lang === 'en'} onChange={() => setLang('en')} />
            <label className="text-sm">HI</label>
            <input type="radio" name="lang" checked={lang === 'hi'} onChange={() => setLang('hi')} />
          </div>
        </div>
      </div>

      <div className="md:flex gap-8">
        <aside className="md:w-1/4 mb-6 md:mb-0">
          <nav className="sticky top-6 bg-white p-4 rounded shadow-sm">
            <h3 className="font-semibold mb-3">{lang === 'en' ? 'Contents' : 'अनुक्रमणिका'}</h3>
            <ul className="space-y-2 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a className="text-amber-600 hover:underline" href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="md:flex-1 prose max-w-none">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            {sections.map((sec) => (
              <section id={sec.id} key={sec.id} className="mb-6">
                <h2 className="text-xl font-semibold mb-2">{sec.title}</h2>
                <p className="text-gray-700 whitespace-pre-line">{sec.body}</p>
              </section>
            ))}

            <div className="mt-4 text-sm text-gray-600">
              <p>{S.text.contact}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
