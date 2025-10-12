import React, { useState, useMemo } from 'react';

const GROUPS = [
  { id: 'g1', name: 'Panchayat Admins', hiName: 'पंचायत प्रशासन', description: 'Discussions for Gram Panchayat officials and coordinators.' , hiDesc: 'ग्राम पंचायत अधिकारियों और समन्वयकों के लिए चर्चा।'},
  { id: 'g2', name: 'Beneficiaries', hiName: 'लाभार्थी', description: 'Community discussions for scheme beneficiaries to share experiences.' , hiDesc: 'योजना लाभार्थियों के अनुभव साझा करने के लिए समुदायिक चर्चा।'},
  { id: 'g3', name: 'Field Workers', hiName: 'फील्ड वर्कर्स', description: 'Field staff and mobilizers share best practices and local updates.' , hiDesc: 'फील्ड स्टाफ और मोबिलाइज़र सर्वोत्कृष्ट प्रथाएँ और स्थानीय अपडेट साझा करते हैं।'},
];

const THREADS = [
  { id: 't1', title: 'How to upload village reports?', group: 'g1', replies: 12 },
  { id: 't2', title: 'Application stuck at verification', group: 'g2', replies: 8 },
  { id: 't3', title: 'Training material for new staff', group: 'g3', replies: 5 },
];

const EVENTS = [
  { id: 'e1', title: 'District-level training: October 20', location: 'Block Office', date: '2025-10-20' },
  { id: 'e2', title: 'Webinar: Using SaralSeva for grievance tracking', location: 'Online', date: '2025-11-03' },
];

export default function Community() {
  const [lang, setLang] = useState('en');
  const [query, setQuery] = useState('');

  const strings = useMemo(() => ({
    en: { title: 'Community', subtitle: 'Groups, discussions and events — connect with other users and local officials.', searchPlaceholder: 'Search groups or threads...', join: 'Join Group', upcoming: 'Upcoming Events' },
    hi: { title: 'समुदाय', subtitle: 'समूह, चर्चाएँ और कार्यक्रम — अन्य उपयोगकर्ताओं और स्थानीय अधिकारियों से जुड़ें।', searchPlaceholder: 'समूह या थ्रेड खोजें...', join: 'समूह में शामिल हों', upcoming: 'आगामी कार्यक्रम' },
  }), []);

  const matchedGroups = useMemo(() => GROUPS.filter(g => (g.name + ' ' + (g.description || '') + ' ' + (g.hiName || '') + ' ' + (g.hiDesc || '')).toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <div className="container mx-auto p-6">
      <header className="mb-6 flex items-start justify-between">
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

      <div className="mb-6 flex items-center gap-3">
        <input value={query} onChange={e => setQuery(e.target.value)} className="px-3 py-2 border rounded-md w-72" placeholder={strings[lang].searchPlaceholder} />
        <a href="/community/create" className="px-3 py-2 bg-amber-500 text-white rounded-md">{strings[lang].join}</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">{lang === 'hi' ? 'लोकप्रिय समूह' : 'Popular Groups'}</h2>
          {matchedGroups.map(g => (
            <div key={g.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold">{lang === 'hi' && g.hiName ? g.hiName : g.name}</h3>
              <p className="text-sm text-gray-700">{lang === 'hi' && g.hiDesc ? g.hiDesc : g.description}</p>
              <div className="mt-3 flex gap-2">
                <a href={`/community/group/${g.id}`} className="text-amber-500">{lang === 'hi' ? 'देखें' : 'View'}</a>
                <button className="px-3 py-1 border rounded-md">{strings[lang].join}</button>
              </div>
            </div>
          ))}

          <h2 className="text-xl font-semibold">{lang === 'hi' ? 'सक्रिय चर्चाएँ' : 'Active Discussions'}</h2>
          <div className="space-y-3">
            {THREADS.map(t => (
              <div key={t.id} className="p-3 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-between">
                <div>
                  <a href={`/community/thread/${t.id}`} className="font-medium">{t.title}</a>
                  <div className="text-xs text-gray-500">{t.replies} replies</div>
                </div>
                <a href={`/community/thread/${t.id}`} className="text-amber-500">{lang === 'hi' ? 'जॉइन करें' : 'Join'}</a>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">{strings[lang].upcoming}</h3>
            <ul className="text-sm space-y-2">
              {EVENTS.map(e => (
                <li key={e.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{e.title}</div>
                    <div className="text-xs text-gray-500">{e.date} • {e.location}</div>
                  </div>
                  <a href={`/community/event/${e.id}`} className="text-amber-500">{lang === 'hi' ? 'विवरण' : 'Details'}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">{lang === 'hi' ? 'सहायता' : 'Help'}</h3>
            <p className="text-sm text-gray-700">{lang === 'hi' ? 'समुदाय के नियम और मार्गदर्शिका के लिए यहाँ देखें।' : 'See community guidelines and help for participation.'}</p>
            <a href="/help" className="mt-3 inline-block text-amber-500">{lang === 'hi' ? 'और देखें' : 'Learn more'}</a>
          </div>
        </aside>
      </div>
    </div>
  );
}
