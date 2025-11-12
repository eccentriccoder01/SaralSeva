import React, { useState } from 'react';
import { User, Calendar, Tag, ArrowRight } from 'lucide-react';
import banner from './../../assets/header-banner2.jpg';
import StoryModal from './StoryModal';

// Sample success stories data
const successStories = [
  {
    id: 1,
    name: "Ramesh P.",
    location: "Farmer from Nashik, Maharashtra",
    scheme: "Pradhan Mantri Awas Yojana",
    shortDescription: "After years of living in a kutcha house, I finally got my own pucca house under PMAY. My family now has a safe and secure home.",
    fullStory: "Living in a kutcha house with my wife and three children was always a challenge, especially during the monsoon season. When I heard about the Pradhan Mantri Awas Yojana through SaralSeva portal, I immediately applied. The process was simple and transparent. Within 6 months, I received the financial assistance and constructed my dream home. Today, my children study in a safe environment, and my family feels secure. This scheme has truly transformed our lives.",
    quote: "PMAY didn't just give me a house; it gave my family dignity and security.",
    dateOfBenefit: "March 2024",
    avatar: "RP"
  },
  {
    id: 2,
    name: "Lakshmi S.",
    location: "Small Business Owner from Bengaluru, Karnataka",
    scheme: "Pradhan Mantri Mudra Yojana",
    shortDescription: "With a small loan under PMMY, I expanded my tailoring business and now employ 5 women from my community.",
    fullStory: "I started my tailoring business from home with just one sewing machine. I always dreamed of expanding but lacked the capital. Through SaralSeva, I learned about Pradhan Mantri Mudra Yojana and applied for a loan. The collateral-free loan of ₹50,000 helped me purchase 3 more machines and rent a small shop. Today, I employ 5 women from my neighborhood, and we collectively serve over 100 customers monthly. This scheme empowered me to become a job creator.",
    quote: "PMMY turned my small dream into a thriving business that supports multiple families.",
    dateOfBenefit: "January 2024",
    avatar: "LS"
  },
  {
    id: 3,
    name: "Arjun K.",
    location: "Student from Patna, Bihar",
    scheme: "National Scholarship Portal",
    shortDescription: "The scholarship I received helped me pursue engineering without burdening my family financially.",
    fullStory: "Coming from a lower-middle-class family, pursuing higher education seemed like a distant dream. My father is a daily wage worker, and affording engineering college fees was impossible. I discovered the National Scholarship Portal through SaralSeva and applied for the merit-cum-means scholarship. Receiving the scholarship was life-changing. It covered my tuition fees and hostel expenses for all four years. I'm now in my final year of engineering and have already secured a job at a reputed IT company. I'm the first graduate in my family.",
    quote: "Education should not be a privilege of the rich. This scholarship made my dreams accessible.",
    dateOfBenefit: "July 2023",
    avatar: "AK"
  },
  {
    id: 4,
    name: "Meera D.",
    location: "Widow from Jaipur, Rajasthan",
    scheme: "National Social Assistance Programme",
    shortDescription: "The widow pension has provided me financial stability and helped me educate my two daughters.",
    fullStory: "After losing my husband 5 years ago, I was left alone to raise my two young daughters. With no source of income and limited support, life was extremely difficult. A social worker informed me about the National Social Assistance Programme available through SaralSeva. I applied for the widow pension, and within two months, I started receiving monthly assistance. This regular income has been a lifeline. I've been able to send both my daughters to school, and they are now excelling in their studies. The scheme gave me hope when I had none.",
    quote: "This pension is not just money; it's the foundation of my daughters' future.",
    dateOfBenefit: "September 2023",
    avatar: "MD"
  },
  {
    id: 5,
    name: "Suresh M.",
    location: "Farmer from Warangal, Telangana",
    scheme: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    shortDescription: "The direct income support has helped me invest in better seeds and irrigation, increasing my crop yield by 40%.",
    fullStory: "Farming has been my family's occupation for generations, but unpredictable weather and rising input costs made it increasingly difficult. When PM-KISAN was launched, I registered through SaralSeva portal. The ₹6,000 annual support might seem small, but for a small farmer like me, it's significant. I used this money to purchase high-quality seeds and improve my irrigation system. My crop yield increased by 40% in just two seasons. The direct bank transfer ensures I receive the money without any middlemen. This scheme has restored my faith in farming.",
    quote: "PM-KISAN has made farming viable again for small farmers like me.",
    dateOfBenefit: "December 2023",
    avatar: "SM"
  },
  {
    id: 6,
    name: "Anita B.",
    location: "Entrepreneur from Pune, Maharashtra",
    scheme: "Stand-Up India Scheme",
    shortDescription: "As a woman entrepreneur, the loan under Stand-Up India helped me establish my organic food processing unit.",
    fullStory: "I always wanted to start my own business but faced numerous challenges as a woman entrepreneur. Banks were hesitant to provide loans without collateral. I learned about the Stand-Up India Scheme through SaralSeva, which specifically supports women and SC/ST entrepreneurs. I applied for a loan to start an organic food processing unit. The loan of ₹25 lakhs helped me set up the unit, purchase equipment, and hire staff. Today, my unit processes organic products from local farmers and supplies to major retail chains. I employ 15 people, mostly women from nearby villages. This scheme didn't just help me; it created opportunities for many.",
    quote: "Stand-Up India gave me the confidence and capital to stand on my own feet.",
    dateOfBenefit: "February 2024",
    avatar: "AB"
  }
];

const SuccessStories = () => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReadMore = (story) => {
    setSelectedStory(story);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedStory(null), 300);
  };

  return (
    <main className='bg-orange-50/30 dark:bg-gray-900 min-h-screen'>
      {/* Banner Section */}
      <div
        className="relative flex items-center justify-center h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black/50 dark:bg-black/60"></div>
        <div className="relative text-center px-4">
          <h1 className="text-5xl font-extrabold text-white jost tracking-wider drop-shadow-lg">
            Success Stories
          </h1>
          <p className="text-xl text-white/90 mt-2 font-light">
            Discover how government initiatives are changing lives across India
          </p>
        </div>
      </div>

      {/* Stories Grid Section */}
      <div className='container mx-auto px-[5vw] py-16'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map((story) => (
            <div
              key={story.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
            >
              {/* Avatar Section */}
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 h-32 flex items-center justify-center">
                <div className="w-20 h-20 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {story.avatar}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 space-y-4">
                {/* Name and Location */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    {story.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 ml-7">
                    {story.location}
                  </p>
                </div>

                {/* Scheme Tag */}
                <div className="flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 px-3 py-2 rounded-lg">
                  <Tag className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  <span className="text-sm font-semibold text-orange-800 dark:text-orange-300">
                    {story.scheme}
                  </span>
                </div>

                {/* Short Description */}
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                  {story.shortDescription}
                </p>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{story.dateOfBenefit}</span>
                </div>

                {/* Read More Button */}
                <button
                  onClick={() => handleReadMore(story)}
                  className="w-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 group-hover:gap-3"
                >
                  Read Full Story
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 py-16">
        <div className="container mx-auto px-[5vw] text-center">
          <h2 className="text-4xl font-bold text-white mb-4 jost">
            Have You Benefited from a Scheme?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Share your inspiring story and motivate others to take advantage of government initiatives!
          </p>
          <button
            onClick={() => window.location.href = '/share-story'}
            className="bg-white text-orange-600 hover:bg-orange-50 dark:bg-gray-800 dark:text-orange-400 dark:hover:bg-gray-700 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Share Your Story
          </button>
          <p className="text-white/80 text-sm mt-4">
            (Feature coming soon - We're building a platform for community contributions)
          </p>
        </div>
      </div>

      {/* Story Modal */}
      {selectedStory && (
        <StoryModal
          story={selectedStory}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </main>
  );
};

export default SuccessStories;
