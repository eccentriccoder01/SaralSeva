import banner from "./../assets/header-banner2.jpg";
import { Mail, MapPin, User, BookUser, MessageSquare, CheckCircle, XCircle, AlertTriangle, X } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next"; // ✅ Import i18n hook

const Contact = () => {
  const { i18n } = useTranslation(); // ✅ Use global i18n
  const lang = i18n.language || "en"; // ✅ Get language from i18n

  const t = useMemo(
    () => ({
      en: {
        title: "Contact Us",
        subtitle: "Get in Touch",
        intro:
          "As a partner to the community, we look forward to your comments, suggestions, and any feedback that will help us provide better service.",
        contactDetails: "By Email & Phone",
        addressTitle: "Our Address",
        formTitle: "Send Us a Message",
        email: "info@dgs.gov.in",
        phone: "9876543210",
        lastUpdated: "Updated: October 12, 2025",
        toc: "Contents",
        print: "Print this page",
        namePlaceholder: "Enter your name",
        emailPlaceholder: "Enter your email",
        subjectPlaceholder: "Enter subject",
        messagePlaceholder: "Write your message here...",
        nameLabel: "Full Name",
        emailLabel: "Email Address",
        subjectLabel: "Subject",
        messageLabel: "Message",
        sendButton: "Send Message",
      },
      hi: {
        title: "संपर्क करें",
        subtitle: "हमसे संपर्क करें",
        intro:
          "समुदाय के साझीदार के रूप में, हम आपकी टिप्पणियों, सुझावों और किसी भी प्रतिक्रिया का स्वागत करते हैं जो हमें बेहतर सेवा प्रदान करने में मदद करेगी।",
        contactDetails: "ईमेल और फोन द्वारा",
        addressTitle: "हमारा पता",
        formTitle: "मुझें संदेश भेजें",
        email: "info@dgs.gov.in",
        phone: "9876543210",
        lastUpdated: "अद्यतन: 12 अक्टूबर, 2025",
        toc: "अनुक्रमणिका",
        print: "पृष्ठ प्रिंट करें",
        namePlaceholder: "अपना नाम दर्ज करें",
        emailPlaceholder: "अपना ईमेल दर्ज करें",
        subjectPlaceholder: "विषय दर्ज करें",
        messagePlaceholder: "अपना संदेश यहाँ लिखें...",
        nameLabel: "पूरा नाम",
        emailLabel: "ईमेल पता",
        subjectLabel: "विषय",
        messageLabel: "संदेश",
        sendButton: "संदेश भेजें",
      },
    }),
    []
  );

  const S = t[lang];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      setNotification({ type: "success", message: data?.message || "Message sent" });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setNotification({ type: "error", message: "Something went wrong. Please try again." });
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const renderIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-10 h-10 text-green-500" />;
      case "error":
        return <XCircle className="w-10 h-10 text-red-500" />;
      case "warning":
        return <AlertTriangle className="w-10 h-10 text-yellow-500" />;
      default:
        return null;
    }
  };

  const sections = [
    { id: "details", title: S.contactDetails },
    { id: "address", title: S.addressTitle },
    { id: "form", title: S.formTitle },
  ];

  // Smooth scroll function (cross-browser safe)
  const smoothScrollTo = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    const yOffset = -80; // offset for fixed headers if any
    const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="bg-orange-50/30 dark:bg-gray-900/50 transition-colors duration-300" id="top">
      {/* Banner */}
      <div
        className="relative flex items-center justify-center h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center">
          <h1 className="text-5xl font-extrabold text-white jost tracking-wider">{S.title}</h1>
          <p className="mt-2 text-white text-sm md:text-base opacity-90">{S.subtitle}</p>
          <p className="mt-1 text-white text-sm opacity-80">{S.lastUpdated}</p>
        </div>
        {/* ✅ REMOVED: Local language selector - now uses global navbar selector */}
        <div className="absolute right-4 top-4">
          <button 
            onClick={() => window.print()} 
            className="text-sm text-white bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded backdrop-blur-sm transition-colors"
          >
            {S.print}
          </button>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="md:flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="md:w-1/4 mb-6 md:mb-0">
            <nav className="sticky top-6 bg-white dark:bg-gray-800 p-4 rounded shadow-sm">
              <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">{S.toc}</h3>
              <ul className="space-y-2 text-sm">
                {sections.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => smoothScrollTo(s.id)}
                      className="text-amber-600 hover:underline dark:text-amber-400 cursor-pointer bg-transparent border-none p-0"
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="md:flex-1">
            {/* Section: Email & Phone */}
            <section id="details" className="mb-6 scroll-mt-28">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-t-4 border-amber-500">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-stone-800 dark:text-gray-200">{S.contactDetails}</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">{S.intro}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Email</h4>
                    <a href={`mailto:${S.email}`} className="text-amber-700 dark:text-amber-400 font-semibold hover:underline">{S.email}</a>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Phone</h4>
                    <div className="font-semibold text-amber-700 dark:text-amber-400">{S.phone}</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Address */}
            <section id="address" className="mb-6 scroll-mt-28">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-t-4 border-amber-500">
                <h3 className="text-2xl font-bold text-stone-800 dark:text-gray-200">{S.addressTitle}</h3>
                {lang === "en" ? (
                  <>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">National Portal Secretariat</p>
                    <p className="text-gray-600 dark:text-gray-300">CGO Complex, Lodhi Road, New Delhi - 110 003, India.</p>
                  </>
                ) : (
                  <>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">राष्ट्रीय पोर्टल सचिवालय</p>
                    <p className="text-gray-600 dark:text-gray-300">सीजीओ कॉम्प्लेक्स, लोदी रोड, नई दिल्ली - 110 003, भारत।</p>
                  </>
                )}

                <div className="mt-4">
                  <div className="w-full h-44 rounded-md overflow-hidden border border-gray-300 dark:border-gray-600">
                    <iframe
                      title="CGO Complex Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14085.2214807896!2d77.2237149!3d28.5929309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2b6d9b7a7a9%3A0xc0f3fde7b2b6b6a8!2sCGO%20Complex!5e0!3m2!1sen!2sin!4v1697188800000"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                    ></iframe>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Map data © Google</p>
                </div>
              </div>
            </section>

            {/* Section: Form */}
            <section id="form" className="mb-6 scroll-mt-28">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-t-4 border-amber-500">
                <h3 className="text-2xl font-bold text-center text-orange-900 dark:text-orange-400 mb-4">{S.formTitle}</h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{S.nameLabel}</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          placeholder={S.namePlaceholder}
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{S.emailLabel}</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          placeholder={S.emailPlaceholder}
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{S.subjectLabel}</label>
                    <div className="relative">
                      <BookUser className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="subject"
                        placeholder={S.subjectPlaceholder}
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{S.messageLabel}</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                      <textarea
                        name="message"
                        rows={5}
                        placeholder={S.messagePlaceholder}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        required
                      ></textarea>
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <button
                      type="submit"
                      className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                    >
                      {S.sendButton}
                    </button>
                  </div>
                </form>
              </div>
            </section>

            {/* Notification */}
            {notification && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 px-8 py-6 text-center w-[90%] sm:w-[380px] animate-fadeIn">
                  <button
                    onClick={() => setNotification(null)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="flex flex-col items-center space-y-4">
                    {renderIcon(notification.type)}
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {notification.message}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default Contact;