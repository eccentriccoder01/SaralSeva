import React, { useState, useMemo } from 'react';

export default function Terms() {
  const [lang, setLang] = useState('en');

  const t = useMemo(() => ({
    en: {
      title: 'Terms of Service',
      lastUpdated: 'Last updated: October 12, 2025',
      toc: 'Contents',
      introTitle: '1. Introduction',
      intro: `Welcome to SaralSeva. These Terms of Service ("Terms") govern your use of our website and services. By accessing or using SaralSeva, you agree to be bound by these Terms.`,
      acceptanceTitle: '2. Acceptance of Terms',
      acceptance: `By using our services you accept these Terms and our Privacy Policy. If you do not agree, please do not use the services.`,
      servicesTitle: '3. Services',
      services: `SaralSeva provides informational resources, scheme listings, application assistance and community features. Specific services may have additional terms.`,
      userObligationsTitle: '4. User obligations',
      userObligations: `You must provide accurate information and not misuse the services. You are responsible for account security and for maintaining confidentiality of any credentials.`,
      prohibitedTitle: '5. Prohibited actions',
      prohibited: `You must not (a) impersonate others; (b) upload malicious content; (c) use automated scraping; or (d) infringe on others' rights.`,
      ipTitle: '6. Intellectual Property',
      ip: `All content on SaralSeva is protected by copyright, trademark and other laws. You may not reproduce materials without permission.`,
      disclaimerTitle: '7. Disclaimers & Limitation of Liability',
      disclaimer: `The service is provided "as is". To the fullest extent permitted by law, SaralSeva disclaims all warranties and will not be liable for indirect or consequential damages.`,
      indemnifyTitle: '8. Indemnification',
      indemnify: `You agree to indemnify SaralSeva from any claims arising from your use of the service or violation of these Terms.`,
      terminationTitle: '9. Termination',
      termination: `We may suspend or terminate accounts for violations of these Terms. Some provisions survive termination.`,
      governingTitle: '10. Governing Law',
      governing: `These Terms are governed by the laws of India. Any disputes will be resolved in the competent courts of India.`,
      contactTitle: '11. Contact',
      contact: `If you have questions about these Terms, contact us at support@saralseva.example (replace with real address).`,
      print: 'Print this page',
      backToTop: 'Back to top',
    },
    hi: {
      title: 'सेवा की शर्तें',
      lastUpdated: 'अधिसूचित: 12 अक्टूबर, 2025',
      toc: 'अनुक्रमणिका',
      introTitle: '1. परिचय',
      intro: `SaralSeva में आपका स्वागत है। ये सेवा की शर्तें ("शर्तें") हमारी वेबसाइट और सेवाओं के उपयोग को नियंत्रित करती हैं। हमारी सेवाओं का उपयोग कर आप इन शर्तों से सहमत होते हैं।`,
      acceptanceTitle: '2. शर्तों की स्वीकृति',
      acceptance: `हमारी सेवाओं का उपयोग करके आप इन शर्तों और हमारी गोपनीयता नीति से सहमत होते हैं। यदि आप सहमत नहीं हैं, तो कृपया सेवाओं का उपयोग न करें।`,
      servicesTitle: '3. सेवाएँ',
      services: `SaralSeva सूचनात्मक संसाधन, योजनाओं की सूची, आवेदन सहायता और सामुदायिक सुविधाएँ प्रदान करता है। कुछ सेवाओं के अतिरिक्त नियम हो सकते हैं।`,
      userObligationsTitle: '4. उपयोगकर्ता की जिम्मेदारियाँ',
      userObligations: `आपको सही जानकारी प्रदान करनी चाहिए और सेवाओं का दुरुपयोग नहीं करना चाहिए। खाता सुरक्षा आपकी जिम्मेदारी है।`,
      prohibitedTitle: '5. निषिद्ध कार्य',
      prohibited: `आपको (a) किसी और का नक़ल नहीं करना; (b) हानिकारक सामग्री अपलोड नहीं करनी; (c) स्वचालित स्क्रैपिंग का उपयोग नहीं करना; या (d) दूसरों के अधिकारों का उल्लंघन नहीं करना चाहिए।`,
      ipTitle: '6. बौद्धिक संपदा',
      ip: `SaralSeva पर सभी सामग्री कॉपीराइट, ट्रेडमार्क और अन्य कानूनों द्वारा सुरक्षित है। बिना अनुमति सामग्री की नकल न करें।`,
      disclaimerTitle: '7. अस्वीकरण और दायित्व की सीमा',
      disclaimer: `सेवा "जैसी है" दी जाती है। कानून द्वारा अनुमत अधिकतम सीमा तक, SaralSeva सभी वारंटियों से इनकार करता है और अप्रत्यक्ष या परिणामी नुकसान के लिए ज़िम्मेदार नहीं होगा।`,
      indemnifyTitle: '8. प्रतिरक्षण',
      indemnify: `आप SaralSeva को किसी भी दावे से प्रतिरक्षित करेंगे जो आपकी सेवाओं के उपयोग या इन शर्तों के उल्लंघन से उत्पन्न होते हैं।`,
      terminationTitle: '9. समाप्ति',
      termination: `हम इन शर्तों के उल्लंघन पर खातों को निलंबित या समाप्त कर सकते हैं। कुछ प्रावधान समाप्ति के बाद भी बने रहते हैं।`,
      governingTitle: '10. शासन कानून',
      governing: `ये शर्तें भारत के कानूनों द्वारा शासित हैं। किसी भी विवाद का निपटान भारत के सक्षम न्यायालयों में होगा।`,
      contactTitle: '11. संपर्क',
      contact: `यदि आपके पास इन शर्तों के बारे में प्रश्न हैं, तो हमें support@saralseva.example पर संपर्क करें (इसे वास्तविक पते से बदलें)।`,
      print: 'पृष्ठ प्रिंट करें',
      backToTop: 'ऊपर जाएँ',
    },
  }), []);

  const S = t[lang];

  const sections = [
    { id: 'introduction', title: S.introTitle, body: S.intro },
    { id: 'acceptance', title: S.acceptanceTitle, body: S.acceptance },
    { id: 'services', title: S.servicesTitle, body: S.services },
    { id: 'user-obligations', title: S.userObligationsTitle, body: S.userObligations },
    { id: 'prohibited', title: S.prohibitedTitle, body: S.prohibited },
    { id: 'intellectual-property', title: S.ipTitle, body: S.ip },
    { id: 'disclaimer', title: S.disclaimerTitle, body: S.disclaimer },
    { id: 'indemnification', title: S.indemnifyTitle, body: S.indemnify },
    { id: 'termination', title: S.terminationTitle, body: S.termination },
    { id: 'governing-law', title: S.governingTitle, body: S.governing },
    { id: 'contact', title: S.contactTitle, body: S.contact },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">{S.title}</h1>
          <p className="text-sm text-gray-500 mt-1">{S.lastUpdated}</p>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => window.print()} className="text-sm px-3 py-1 border rounded">{S.print}</button>
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
          <nav className="sticky top-6 bg-white p-4 rounded shadow-sm">
            <h3 className="font-semibold mb-3">{S.toc}</h3>
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
          {sections.map((s) => (
            <section id={s.id} key={s.id} className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{s.title}</h2>
              <p className="text-gray-700 whitespace-pre-line">{s.body}</p>
              <p className="mt-2 text-sm">
                <a className="text-amber-600 hover:underline" href="#top">{S.backToTop}</a>
              </p>
            </section>
          ))}

          <section id="version" className="mt-8 text-sm text-gray-600">
            <strong>Version:</strong> 1.0
            <p className="mt-2">{S.lastUpdated}</p>
          </section>
        </main>
      </div>
    </div>
  );
}
