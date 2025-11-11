import React, { useState, useMemo } from 'react';
import banner from '../../assets/header-banner2.jpg';
import indiaFlag from '../../assets/india.svg';

const SAMPLE = {
  groups: [
    { id: 'g1', name: 'Panchayat Admins', hiName: 'पंचायत प्रशासन', desc: 'Discussions for Gram Panchayat officials and coordinators.', hiDesc: 'ग्राम पंचायत अधिकारियों और समन्वयकों के लिए चर्चा।', members: 420 },
    { id: 'g2', name: 'Beneficiaries', hiName: 'लाभार्थी', desc: 'Community discussions for scheme beneficiaries to share experiences.', hiDesc: 'योजना लाभार्थियों के अनुभव साझा करने के लिए समुदायिक चर्चा।', members: 1800 },
    { id: 'g3', name: 'Field Workers', hiName: 'फील्ड वर्कर्स', desc: 'Field staff and mobilizers share best practices and local updates.', hiDesc: 'फील्ड स्टाफ और मोबिलाइज़र सर्वोत्कृष्ट प्रथाएँ और स्थानीय अपडेट साझा करते हैं।', members: 640 },
    { id: 'g4', name: 'Volunteers & NGOs', hiName: 'स्वयंसेवक और NGO', desc: 'Coordinate outreach, drives and local training with volunteers and NGOs.', hiDesc: 'स्वयंसेवकों और NGO के साथ आउटरीच, ड्राइव और स्थानीय प्रशिक्षण का समन्वय।', members: 320 },
  ],
  threads: [
    { id: 't1', title: 'Uploading village reports - quick guide', replies: 12, group: 'g1' },
    { id: 't2', title: 'Fix: application stuck on verification', replies: 8, group: 'g2' },
    { id: 't3', title: 'Best training resources for new recruits', replies: 5, group: 'g3' },
  ],
  events: [
    { id: 'e1', title: 'District training workshop', date: '2025-10-20', location: 'Block Office' },
    { id: 'e2', title: 'Webinar: Using SaralSeva for outreach', date: '2025-11-03', location: 'Online' },
  ],
  testimonials: [
    { id: 'p1', name: 'Ramesh Kumar', role: 'Panchayat Secretary', quote: 'SaralSeva helped our panchayat streamline scheme reports and reach more beneficiaries.' },
    { id: 'p2', name: 'Sita Devi', role: 'Beneficiary', quote: 'I found the right scheme quickly and the guidance was very clear.' },
  ]
};

export default function Community() {
  const [lang, setLang] = useState('en');
  const [q, setQ] = useState('');
  const [openGroup, setOpenGroup] = useState(null);

  const strings = useMemo(() => ({
    en: {
      title: 'Community',
      subtitle: 'Groups, discussions and events — connect, learn and collaborate with other users and local officials.',
      search: 'Search groups, threads or events...',
      join: 'Join',
      viewAll: 'View all',
      upcoming: 'Upcoming Events',
      testimonials: 'What people say',
      createGroup: 'Create a group',
    },
    hi: {
      title: 'समुदाय',
      subtitle: 'समूह, चर्चाएँ और कार्यक्रम — अन्य उपयोगकर्ताओं और स्थानीय अधिकारियों के साथ जुड़ें, सीखें और सहयोग करें।',
      search: 'समूह, थ्रेड या कार्यक्रम खोजें...',
      join: 'जॉइन करें',
      viewAll: 'सभी देखें',
      upcoming: 'आगामी कार्यक्रम',
      testimonials: 'लोग क्या कहते हैं',
      createGroup: 'समूह बनाएँ',
    }
  }), []);

  const groups = SAMPLE.groups.filter(g =>
    (g.name + ' ' + g.desc + ' ' + (g.hiName || '') + ' ' + (g.hiDesc || '')).toLowerCase().includes(q.toLowerCase())
  );
  const threads = SAMPLE.threads.filter(t => t.title.toLowerCase().includes(q.toLowerCase()));
  const events = SAMPLE.events.filter(e => (e.title + ' ' + e.location).toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#07132f] text-gray-900 dark:text-gray-100">

      {/* Hero / Banner */}
      <header className="relative h-64 md:h-72 lg:h-96 overflow-hidden rounded-b-lg mb-8">
        <img src={banner} alt="Community banner" className="w-full h-full object-cover brightness-75" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">{strings[lang].title}</h1>
            <p className="mt-2 text-white text-sm md:text-base opacity-90">{strings[lang].subtitle}</p>
            <div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
              <a href="/community/create" className="px-4 py-2 bg-amber-500 text-white rounded-md font-medium">{strings[lang].createGroup}</a>
              <a href="/chatbot" className="px-4 py-2 bg-transparent border border-white text-white rounded-md">Open Chatbot</a>
            </div>
          </div>

          <div className="absolute right-4 top-4 flex items-center gap-2">
            <label className="text-sm text-white">EN</label>
            <input type="radio" name="clan" checked={lang === 'en'} onChange={() => setLang('en')} />
            <label className="text-sm text-white">HI</label>
            <input type="radio" name="clan" checked={lang === 'hi'} onChange={() => setLang('hi')} />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-6 flex flex-col sm:flex-row items-stretch gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={strings[lang].search}
            className="flex-1 px-4 py-3 border rounded-md text-black"
          />
          <a href="/community/create" className="px-4 py-3 bg-amber-500 text-white rounded-md text-center">{strings[lang].createGroup}</a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Groups Section */}
          <section className="lg:col-span-2 space-y-8">
            <h2 className="text-xl font-semibold">{lang === 'hi' ? 'लोकप्रिय समूह' : 'Popular Groups'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {groups.map(g => (
                <div
                  key={g.id}
                  className="relative p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md border-t-4 border-amber-500 overflow-hidden transition-transform hover:scale-[1.02] duration-200"
                >
                  {/* Background flag */}
                  <div className="absolute top-2 right-2 w-24 md:w-28 opacity-10 pointer-events-none select-none">
                    <img src={indiaFlag} alt="" className="object-contain" />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 relative z-10">
                    {/* Circle with initials */}
                    <div
                    className="flex-shrink-0 w-14 h-14 rounded-full bg-amber-100 text-amber-800 
                     flex items-center justify-center font-semibold text-base sm:text-lg uppercase shadow-sm"
                     title={g.name} // tooltip on hover
>
                 {g.name === 'Volunteers & NGOs'
                ? 'V&N'
              : g.name.split(' ').map(w => w[0]).join('').slice(0, 2)
                     }
                    </div>


                    <div className="flex-1">
                      <h3 className="text-lg font-semibold leading-snug break-words">
                        {lang === 'hi' && g.hiName ? g.hiName : g.name}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 leading-relaxed break-words">
                        {lang === 'hi' && g.hiDesc ? g.hiDesc : g.desc}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          onClick={() => setOpenGroup(g.id)}
                          className="px-3 py-1 bg-amber-500 text-white rounded-md text-sm"
                        >
                          {strings[lang].join}
                        </button>
                        <a
                          href={`/community/group/${g.id}`}
                          className="text-amber-600 text-sm font-medium hover:underline"
                        >
                          {strings[lang].viewAll}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Active Discussions */}
            <div>
              <h2 className="text-xl font-semibold mt-8">{lang === 'hi' ? 'सक्रिय चर्चाएँ' : 'Active Discussions'}</h2>
              <div className="mt-4 space-y-3">
                {threads.map(t => (
                  <div key={t.id} className="p-3 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-between">
                    <div>
                      <a href={`/community/thread/${t.id}`} className="font-medium">{t.title}</a>
                      <div className="text-xs text-gray-500">{t.replies} replies</div>
                    </div>
                    <a href={`/community/thread/${t.id}`} className="text-amber-500 text-sm">{strings[lang].join}</a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">{strings[lang].upcoming}</h3>
              <ul className="space-y-3 text-sm">
                {events.map(e => (
                  <li key={e.id} className="flex items-start justify-between">
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
              <h3 className="font-semibold mb-3">{strings[lang].testimonials}</h3>
              <div className="space-y-3 text-sm">
                {SAMPLE.testimonials.map(p => (
                  <div key={p.id} className="p-3 bg-amber-50 dark:bg-gray-900 rounded">
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-xs text-gray-500">{p.role}</div>
                    <div className="mt-2">"{p.quote}"</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Need help?</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                See community guidelines or contact support for any issues participating in the community.
              </p>
              <div className="mt-3">
                <a href="/help" className="px-3 py-2 bg-amber-500 text-white rounded-md">{strings[lang].viewAll}</a>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
