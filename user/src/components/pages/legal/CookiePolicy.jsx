import React, { useState, useMemo } from 'react';

export default function CookiePolicy() {
  const [lang, setLang] = useState('en');

  const c = useMemo(() => ({
    en: {
      title: 'Cookie Policy',
      lastUpdated: 'Last updated: October 13, 2025',
      what: `Cookies are small text files stored on your device which help the site remember your preferences and improve your experience. They do not usually identify you personally.`,
      typesTitle: 'Types of cookies we use',
      types: [
        { key: 'essential', title: 'Essential', desc: 'Required for site functionality such as sessions and security.' },
        { key: 'performance', title: 'Performance', desc: 'Collect anonymous analytics to help us improve the site.' },
        { key: 'preferences', title: 'Preferences', desc: 'Remember language and other display settings.' },
        { key: 'marketing', title: 'Marketing', desc: 'Used by third parties to deliver relevant advertising.' },
      ],
      useTitle: 'How we use cookies',
      use: `We use cookies to enable core site functionality, analyze usage, remember user choices, and for optional marketing features. You can opt out of non-essential cookies via your browser or privacy controls where available.`,
      thirdPartyTitle: 'Third‑party cookies',
      thirdParty: `Certain features (analytics, social embeds, advertising) may be provided by third parties and set their own cookies. We do not control those cookies; please check third parties' policies for details.`,
      manageTitle: 'Managing cookies',
      manage: `Most browsers allow you to control cookies (view, delete or block). Disabling cookies may reduce functionality. For step-by-step instructions, refer to your browser help pages.`,
      changesTitle: 'Changes to this policy',
      changes: `We may update this Cookie Policy from time to time. When we make material changes we will post a notice on the site.`,
      contact: `If you have questions about cookies, contact us at support@saralseva.example (replace with a real address).`,
      print: 'Print this page',
    },
    hi: {
      title: 'कुकी नीति',
      lastUpdated: 'अधिसूचित: 13 अक्टूबर, 2025',
      what: `कुकीज़ आपकी डिवाइस पर छोटे टेक्स्ट फ़ाइलें हैं जो साइट आपकी प्राथमिकताएँ याद रखने और अनुभव बेहतर करने में मदद करती हैं। वे आमतौर पर आपको व्यक्तिगत रूप से पहचानती नहीं हैं।`,
      typesTitle: 'हम किन प्रकार की कुकीज़ का उपयोग करते हैं',
      types: [
        { key: 'essential', title: 'आवश्यक', desc: 'सेशन और सुरक्षा जैसी साइट कार्यक्षमता के लिए आवश्यक।' },
        { key: 'performance', title: 'प्रदर्शन', desc: 'साइट सुधारने के लिए गुमनाम विश्लेषण एकत्र करते हैं।' },
        { key: 'preferences', title: 'प्राथमिकताएँ', desc: 'भाषा और अन्य प्रदर्शन सेटिंग्स याद रखने के लिए।' },
        { key: 'marketing', title: 'मार्केटिंग', desc: 'तीसरे पक्ष द्वारा प्रासंगिक विज्ञापन दिखाने के लिए उपयोग की जाती हैं।' },
      ],
      useTitle: 'हम कुकीज़ का उपयोग कैसे करते हैं',
      use: `हम मूल साइट कार्यक्षमता सक्षम करने, प्रदर्शन सुधारने, प्राथमिकताएँ याद रखने और उपयोगकर्ता व्यवहार समझने के लिए कुकीज़ का उपयोग करते हैं। आप गैर-आवश्यक कुकीज़ को ब्राउज़र या गोपनीयता नियंत्रणों के माध्यम से अक्षम कर सकते हैं।`,
      thirdPartyTitle: 'तीसरे‑पक्ष की कुकीज़',
      thirdParty: `कुछ सुविधाएँ (विश्लेषण, सोशल एम्बेड, विज्ञापन) तीसरे पक्ष द्वारा प्रदान की जाती हैं और अपनी कुकीज़ सेट कर सकती हैं। हम उन कुकीज़ को नियंत्रित नहीं करते; विवरण के लिए तीसरे पक्ष की नीतियाँ देखें।`,
      manageTitle: 'कुकीज़ प्रबंधित करना',
      manage: `अधिकांश ब्राउज़र आपको कुकीज़ देखने, हटाने या ब्लॉक करने की अनुमति देते हैं। कुकीज़ को अक्षम करने से साइट की कार्यक्षमता कम हो सकती है।`,
      changesTitle: 'नीति में बदलाव',
      changes: `हम समय-समय पर इस निति को अपडेट कर सकते हैं। महत्वपूर्ण बदलावों की सूचना साइट पर प्रकाशित की जाएगी।`,
      contact: `कुकीज़ के बारे में प्रश्नों के लिए हमें support@saralseva.example पर संपर्क करें (इसे वास्तविक पते से बदलें)।`,
      print: 'पृष्ठ प्रिंट करें',
    },
  }), []);

  const S = c[lang];

  const sections = [
    { id: 'what', title: lang === 'en' ? 'What are cookies?' : 'कुकीज़ क्या हैं?', body: S.what },
    { id: 'types', title: S.typesTitle, body: S.types },
    { id: 'use', title: S.useTitle, body: S.use },
    { id: 'thirdparty', title: S.thirdPartyTitle, body: S.thirdParty },
    { id: 'manage', title: S.manageTitle, body: S.manage },
    { id: 'changes', title: S.changesTitle, body: S.changes },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">{S.title}</h1>
          <p className="text-sm text-gray-500 mt-1">{S.lastUpdated}</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => window.print()} className="text-sm px-3 py-1 border rounded">{S.print}</button>
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
                {sec.id === 'types' ? (
                  <ul className="list-disc ml-6 text-gray-700">
                    {S.types.map((t) => (
                      <li key={t.key} className="mb-1">
                        <strong>{t.title}:</strong> {t.desc}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700 whitespace-pre-line">{sec.body}</p>
                )}
              </section>
            ))}

            <div className="mt-4 text-sm text-gray-600">
              <p>{S.contact}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
