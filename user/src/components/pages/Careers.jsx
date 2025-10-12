import React, { useState, useMemo } from 'react';

const JOBS = [
  {
    id: 'j1',
    title: 'Frontend Developer',
    hiTitle: 'फ्रंटएंड डेवलपर',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    posted: 'Oct 5, 2025',
    description:
      'Build user interfaces using React, improve performance, and collaborate with designers and backend engineers to ship features that help citizens access schemes easily.',
    hiDescription:
      'React का उपयोग करके उपयोगकर्ता इंटरफेस बनाएं, प्रदर्शन सुधारें, और डिज़ाइनरों तथा बैकएंड इंजीनियरों के साथ मिलकर ऐसे फीचर लॉन्च करें जो नागरिकों को योजनाओं तक पहुँचने में मदद करें।',
  },
  {
    id: 'j2',
    title: 'Product Manager - Schemes',
    hiTitle: 'प्रोडक्ट मैनेजर - योजनाएँ',
    department: 'Product',
    location: 'Delhi, India',
    type: 'Full-time',
    posted: 'Sep 20, 2025',
    description:
      'Lead the roadmap for citizen-facing scheme features, gather requirements and measure impact. Work cross-functionally to ensure smooth delivery.',
    hiDescription:
      'नागरिक-उन्मुख योजना फीचर के लिए रोडमैप का नेतृत्व करें, आवश्यकताएँ एकत्र करें और प्रभाव मापें। सुचारू डिलीवरी के लिए क्रॉस-फंक्शनल टीमों के साथ काम करें।',
  },
  {
    id: 'j3',
    title: 'Customer Support Specialist',
    hiTitle: 'कस्टमर सपोर्ट स्पेशलिस्ट',
    department: 'Support',
    location: 'Hybrid - Bangalore',
    type: 'Part-time',
    posted: 'Aug 30, 2025',
    description:
      'Help users via chat and email, resolve application issues, and contribute to our Help Center content.',
    hiDescription:
      'चैट और ईमेल के माध्यम से उपयोगकर्ताओं की मदद करें, आवेदन संबंधी समस्याओं का समाधान करें, और हमारे हेल्प सेंटर के लिए सामग्री बनाएं।',
  },
  {
    id: 'j4',
    title: 'Gram Panchayat IT Coordinator',
    hiTitle: 'ग्राम पंचायत आईटी कोऑर्डिनेटर',
    department: 'Field Operations',
    location: 'Village / Remote',
    type: 'Contract',
    posted: 'Oct 12, 2025',
    description:
      'Work with Gram Panchayats to implement and maintain SaralSeva at the village level. Provide on-site technical support, run training sessions for local staff, and help with data uploads and reporting.',
    hiDescription:
      'ग्राम पंचायतों के साथ मिलकर गांव स्तर पर SaralSeva को लागू और मेंटेन करें। ऑन-साइट तकनीकी सहायता प्रदान करें, स्थानीय स्टाफ के लिए प्रशिक्षण आयोजित करें, और डेटा अपलोड व रिपोर्टिंग में मदद करें।',
  },
  {
    id: 'j5',
    title: 'Block Level MIS Officer',
    hiTitle: 'ब्लॉक स्तर MIS अधिकारी',
    department: 'Local Governance',
    location: 'Block Office (Regional)',
    type: 'Full-time',
    posted: 'Oct 10, 2025',
    description:
      'Coordinate data collection across Gram Panchayats, validate scheme entries, and prepare periodic reports for district-level authorities. Strong Excel/MIS skills preferred.',
    hiDescription:
      'ग्राम पंचायतों में डेटा संग्रह का समन्वय करें, योजना प्रविष्टियों को सत्यापित करें, और जिला-स्तर अधिकारियों के लिए आवधिक रिपोर्ट तैयार करें। Excel/MIS में कुशलता वांछनीय है।',
  },
  {
    id: 'j6',
    title: 'Community Mobilizer / Field Facilitator',
    hiTitle: 'कमीुनिटी मोबिलाइजर / फील्ड फैसिलिटेटर',
    department: 'Field Operations',
    location: 'Village',
    type: 'Contract',
    posted: 'Oct 1, 2025',
    description:
      'Engage with villagers to raise awareness about schemes, assist residents in using SaralSeva, collect feedback and help with paperless application support.',
    hiDescription:
      'योजनाओं के बारे में जागरूकता बढ़ाने के लिए ग्रामीणों से जुड़ें, SaralSeva के उपयोग में निवासियों की मदद करें, प्रतिक्रिया एकत्र करें और पेपरलेस आवेदन सहायता प्रदान करें।',
  },
  {
    id: 'j7',
    title: 'Training & Capacity Building Officer',
    hiTitle: 'प्रशिक्षण एवं क्षमता विकास अधिकारी',
    department: 'Product',
    location: 'Hybrid',
    type: 'Full-time',
    posted: 'Sep 28, 2025',
    description:
      'Design and deliver training programs for Panchayat staff and field workers, create training materials, and run workshops both online and in-person.',
    hiDescription:
      'पंचायत स्टाफ और फील्ड वर्कर्स के लिए प्रशिक्षण कार्यक्रम डिज़ाइन और दें, प्रशिक्षण सामग्री बनाएं, और ऑनलाइन तथा इन-पर्सन कार्यशालाएँ चलाएँ।',
  },
  {
    id: 'j8',
    title: 'Scheme Implementation Coordinator',
    hiTitle: 'योजना क्रियान्वयन समन्वयक',
    department: 'Program Management',
    location: 'District Office',
    type: 'Full-time',
    posted: 'Sep 15, 2025',
    description:
      'Work with government stakeholders to coordinate rollout of specific schemes via SaralSeva, monitor KPIs and ensure smooth inter-departmental collaboration.',
    hiDescription:
      'सरकार के हितधारकों के साथ काम करके SaralSeva के माध्यम से विशिष्ट योजनाओं का रोलआउट समन्वयित करें, KPIs मॉनिटर करें और विभागों के बीच सुचारू सहयोग सुनिश्चित करें।',
  },
  {
    id: 'j9',
    title: 'Data Entry / MIS Assistant',
    hiTitle: 'डेटा एंट्री / MIS सहायक',
    department: 'Support',
    location: 'Remote / Office',
    type: 'Part-time',
    posted: 'Oct 5, 2025',
    description:
      'Accurately enter data from field forms, assist with data cleaning, and support the Block Level MIS Officer with routine tasks.',
    hiDescription:
      'फील्ड फॉर्म्स से सटीक डेटा एंट्री करें, डेटा क्लीनिंग में मदद करें, और नियमित कार्यों में ब्लॉक स्तर MIS अधिकारी का समर्थन करें।',
  },
];

export default function Careers() {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicant, setApplicant] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [lang, setLang] = useState('en'); // 'en' or 'hi'

  const departments = useMemo(() => ['All', ...new Set(JOBS.map((j) => j.department))], []);

  const strings = useMemo(() => ({
    en: {
      title: 'Careers',
      subtitle: 'Join SaralSeva — build products that make access to public schemes easier for everyone.',
      searchPlaceholder: 'Search by title or keyword',
      departmentLabel: 'Department',
      posted: 'Posted',
      apply: 'Apply',
      details: 'Details',
      noRoles: 'No roles match your search.',
      fullname: 'Full name',
      email: 'Email',
      message: 'Message (optional)',
      submit: 'Submit application',
      cancel: 'Cancel',
    },
    hi: {
      title: 'करियर',
      subtitle: 'SaralSeva से जुड़ें — सार्वजनिक योजनाओं तक पहुँच सरल बनाने के लिए उत्पाद बनाएँ।',
      searchPlaceholder: 'शीर्षक या कीवर्ड से खोजें',
      departmentLabel: 'विभाग',
      posted: 'प्रकाशित',
      apply: 'आवेदन करें',
      details: 'विवरण',
      noRoles: 'कोई भूमिका नहीं मिली।',
      fullname: 'पूरा नाम',
      email: 'ईमेल',
      message: 'संदेश (वैकल्पिक)',
      submit: 'आवेदन भेजें',
      cancel: 'रद्द करें',
    },
  }), []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return JOBS.filter((job) => {
      const matchDept = department === 'All' || job.department === department;
      const matchQ = !q || job.title.toLowerCase().includes(q) || job.description.toLowerCase().includes(q);
      return matchDept && matchQ;
    });
  }, [search, department]);

  function openApply(job) {
    setSelectedJob(job);
    setSubmitted(false);
    setApplicant({ name: '', email: '', message: '' });
  }

  function submitApplication(e) {
    e.preventDefault();
    // Basic validation
    if (!applicant.name || !applicant.email) {
      alert('Please provide name and email.');
      return;
    }
    // Simulate submit (no network)
    setSubmitted(true);
    setTimeout(() => {
      setSelectedJob(null);
      alert('Application submitted — thank you! (simulated)');
    }, 900);
  }

  return (
    <div className="container mx-auto p-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{strings[lang].title}</h1>
          <p className="text-gray-600 mt-2">{strings[lang].subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm">EN</label>
          <input type="radio" name="lang" checked={lang === 'en'} onChange={() => setLang('en')} />
          <label className="text-sm">HI</label>
          <input type="radio" name="lang" checked={lang === 'hi'} onChange={() => setLang('hi')} />
        </div>
      </header>

      <section className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-2">
          <label htmlFor="search" className="sr-only">{strings[lang].searchPlaceholder}</label>
          <input
            id="search"
            className="px-3 py-2 border rounded-md w-64"
            placeholder={strings[lang].searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="department" className="text-sm">{strings[lang].departmentLabel}</label>
          <select id="department" value={department} onChange={(e) => setDepartment(e.target.value)} className="px-2 py-1 border rounded-md">
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((job) => (
          <article key={job.id} className="border rounded-lg p-4 bg-white dark:bg-gray-800">
            <h2 className="text-lg font-semibold">{lang === 'hi' && job.hiTitle ? job.hiTitle : job.title}</h2>
            <div className="text-xs text-gray-500 mb-2">{job.department} • {job.location} • {job.type}</div>
            <p className="text-sm text-gray-700 mb-3">{lang === 'hi' && job.hiDescription ? job.hiDescription : job.description}</p>
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">{strings[lang].posted} {job.posted}</div>
              <div className="flex items-center gap-2">
                <button onClick={() => openApply(job)} className="bg-amber-500 text-white px-3 py-1 rounded-md text-sm">{strings[lang].apply}</button>
                <button onClick={() => setSelectedJob(job)} className="text-sm text-amber-500">{strings[lang].details}</button>
              </div>
            </div>
          </article>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-500">{strings[lang].noRoles}</div>
        )}
      </section>

      {/* Modal: Job detail / application */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-xl w-full p-6 shadow-lg">
            <header className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">{selectedJob.title}</h3>
                <div className="text-sm text-gray-500">{selectedJob.department} • {selectedJob.location}</div>
              </div>
              <button aria-label="Close" onClick={() => setSelectedJob(null)} className="text-gray-500">✕</button>
            </header>

            <div className="mb-4 text-sm text-gray-700">{lang === 'hi' && selectedJob.hiDescription ? selectedJob.hiDescription : selectedJob.description}</div>

            <form onSubmit={submitApplication} className="space-y-3">
              <div>
                <label className="block text-sm">{strings[lang].fullname}</label>
                <input value={applicant.name} onChange={(e) => setApplicant({ ...applicant, name: e.target.value })} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div>
                <label className="block text-sm">{strings[lang].email}</label>
                <input type="email" value={applicant.email} onChange={(e) => setApplicant({ ...applicant, email: e.target.value })} className="w-full px-3 py-2 border rounded-md" required />
              </div>
              <div>
                <label className="block text-sm">{strings[lang].message}</label>
                <textarea value={applicant.message} onChange={(e) => setApplicant({ ...applicant, message: e.target.value })} rows={4} className="w-full px-3 py-2 border rounded-md" />
              </div>

              <div className="flex items-center justify-between">
                <button type="submit" className="bg-amber-500 text-white px-4 py-2 rounded-md">{submitted ? (lang === 'hi' ? 'भेजना...' : 'Sending...') : strings[lang].submit}</button>
                <button type="button" onClick={() => setSelectedJob(null)} className="text-sm text-gray-600">{strings[lang].cancel}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
