# 🤖 AI-Assisted Scheme Recommender - Feature Documentation

## 📋 Overview

The **Ask SaralSeva** feature is an AI-powered chat-based scheme recommender that helps users discover the most relevant government schemes based on their profile and situation. This feature transforms SaralSeva from a static catalog into an intelligent digital assistant for citizens.

## ✨ Key Features

### 1. **Natural Language Understanding**
- Extracts user information from conversational queries
- Identifies: age, occupation, state, gender, income, and BPL status
- Detects intent/category (agriculture, education, business, etc.)

### 2. **Intelligent Scheme Matching**
- Hybrid scoring algorithm:
  - **60%** Eligibility Match
  - **30%** Textual Similarity
  - **10%** Popularity Score
- Filters schemes based on user profile
- Ranks recommendations by relevance

### 3. **Interactive Chat Interface**
- ChatGPT-style conversational UI
- Real-time typing indicators
- Quick suggestion buttons
- Responsive design with dark mode support

### 4. **Comprehensive Scheme Database**
- 20 major government schemes
- Detailed eligibility criteria
- Benefits information
- Direct application links

## 🏗️ Architecture

### Components Structure

```
user/src/
├── components/
│   └── pages/
│       └── ai-recommender/
│           ├── AskSaralSeva.jsx       # Main chat interface
│           └── MessageBubble.jsx       # Chat message components
├── data/
│   └── schemesData.json                # Scheme database
└── utils/
    ├── nlpProcessor.js                 # NLP entity extraction
    └── schemeRecommender.js            # Matching & ranking engine
```

### Data Flow

```
User Query
    ↓
NLP Processor (extractEntities)
    ↓
Entity Extraction
    ↓
Scheme Recommender (recommendSchemes)
    ↓
Hybrid Scoring Algorithm
    ↓
Top 5 Ranked Schemes
    ↓
Chat UI Display
```

## 🧠 NLP Processing

### Entity Extraction

The system extracts the following entities from user queries:

| Entity | Example | Pattern |
|--------|---------|---------|
| **Age** | "45 years old", "aged 30" | Regex patterns for age mentions |
| **Occupation** | "farmer", "student", "entrepreneur" | Keyword matching with occupation dictionary |
| **State** | "Maharashtra", "Punjab" | Indian state name matching |
| **Gender** | "male", "female", "woman" | Gender keyword detection |
| **Income** | "5 lakh income", "₹800000 salary" | Income amount extraction |
| **BPL Status** | "BPL", "below poverty line" | BPL keyword detection |

### Intent Detection

Categories detected:
- Agriculture
- Housing
- Business & Entrepreneurship
- Education
- Social Welfare
- Health
- Skill Development
- Financial Inclusion
- Energy & Environment
- Women & Child Development
- Food Security

## 🎯 Matching Algorithm

### Eligibility Checks

Each scheme is evaluated against user profile:

1. **Age Eligibility** (0-1 score)
   - Perfect match: 1.0
   - Close match (±5 years): 0.3
   - No match: 0.0

2. **Occupation Eligibility** (0-1 score)
   - Direct match: 1.0
   - "All" occupations: 0.7
   - No match: 0.0

3. **Income Eligibility** (0-1 score)
   - Within limit: 1.0
   - Slightly over (≤20%): 0.4
   - Over limit: 0.0

4. **State Eligibility** (0-1 score)
   - State match: 1.0
   - "All" states: 0.8
   - No match: 0.0

5. **Gender Eligibility** (0-1 score)
   - Gender match: 1.0
   - "All" genders: 0.7
   - No match: 0.0

6. **BPL Eligibility** (0-1 score)
   - Requirement met: 1.0
   - Not required: 0.7
   - Requirement not met: 0.0

### Hybrid Score Calculation

```javascript
finalScore = (eligibilityScore × 0.6) + (similarityScore × 0.3) + (popularityScore × 0.1)
```

- **Eligibility Score**: Average of all eligibility checks
- **Similarity Score**: Jaccard similarity + intent boost
- **Popularity Score**: Based on scheme usage patterns

### Filtering & Ranking

1. Filter schemes with `finalScore > 0.2`
2. Sort by final score (descending)
3. Return top 5 recommendations

## 📊 Scheme Database

### Schema

```json
{
  "id": "unique-scheme-id",
  "scheme_name": "Full Scheme Name",
  "category": "Category Name",
  "description": "Brief description",
  "eligibility": {
    "occupation": ["Farmer", "All"],
    "age_min": 18,
    "age_max": 60,
    "income_limit": 1200000,
    "state_specific": ["All"],
    "gender": ["All"],
    "bpl": false
  },
  "benefits": "Benefit description",
  "application_link": "https://...",
  "keywords": ["keyword1", "keyword2"]
}
```

### Included Schemes (20)

1. PM-KISAN Samman Nidhi
2. Pradhan Mantri Awas Yojana (PMAY)
3. Pradhan Mantri MUDRA Yojana (PMMY)
4. National Scholarship Portal (NSP)
5. National Social Assistance Programme (NSAP)
6. Stand-Up India
7. Pradhan Mantri Jan Dhan Yojana (PMJDY)
8. Pradhan Mantri Fasal Bima Yojana (PMFBY)
9. Atal Pension Yojana (APY)
10. Pradhan Mantri Ujjwala Yojana (PMUY)
11. Beti Bachao Beti Padhao (BBBP)
12. Pradhan Mantri Gram Sadak Yojana (PMGSY)
13. Ayushman Bharat - PM-JAY
14. Skill India Mission (PMKVY)
15. SVAMITVA Scheme
16. PM-KUSUM (Solar Agriculture)
17. National Rural Livelihood Mission (NRLM)
18. PMEGP
19. Sukanya Samriddhi Yojana (SSY)
20. One Nation One Ration Card

## 🎨 UI/UX Features

### Chat Interface
- **Message Bubbles**: Distinct styling for user and bot messages
- **Typing Indicator**: Animated dots during processing
- **Scheme Cards**: Rich display with match percentage, benefits, and apply button
- **Suggestions**: Quick-click suggestion buttons
- **Auto-scroll**: Smooth scrolling to latest message

### Responsive Design
- Mobile-first approach
- Adapts to all screen sizes
- Touch-friendly interactions
- Dark mode support

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- High contrast colors

## 🚀 Usage Examples

### Example 1: Farmer Query
**User**: "I'm a 45-year-old farmer from Maharashtra looking for an irrigation subsidy."

**AI Response**:
- Extracts: age=45, occupation=farmer, state=Maharashtra, intent=agriculture
- Recommends: PM-KISAN, PMFBY, PM-KUSUM
- Shows eligibility match reasons

### Example 2: Student Query
**User**: "Need scholarship for my daughter who is in college"

**AI Response**:
- Extracts: occupation=student, gender=female, intent=education
- Recommends: NSP, Beti Bachao Beti Padhao, Sukanya Samriddhi
- Displays benefits and application links

### Example 3: Entrepreneur Query
**User**: "I'm a woman entrepreneur wanting to start a small business"

**AI Response**:
- Extracts: gender=female, occupation=entrepreneur, intent=business
- Recommends: Stand-Up India, PMMY, PMEGP
- Shows loan amounts and eligibility

## 🔧 Technical Implementation

### Technologies Used
- **Frontend**: React, React Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **NLP**: Pure JavaScript (no external libraries)
- **Data**: JSON-based scheme database

### Performance Optimizations
- Client-side processing (no API calls)
- Efficient text matching algorithms
- Lazy loading of components
- Optimized re-renders with React hooks

### Browser Compatibility
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 📈 Future Enhancements

### Phase 2 Features
1. **User Profile Integration**
   - Auto-fill from logged-in user profile
   - Save conversation history
   - Bookmark favorite schemes

2. **Advanced NLP**
   - Multi-language support (Hindi, regional languages)
   - Better context understanding
   - Synonym recognition

3. **Enhanced Recommendations**
   - Collaborative filtering
   - User feedback learning
   - Trending schemes

4. **Analytics Dashboard**
   - Popular queries tracking
   - Scheme recommendation success rate
   - User engagement metrics

5. **Integration Features**
   - Direct scheme application from chat
   - Document upload assistance
   - Application status tracking

### Phase 3 Features
1. **Voice Input**
   - Speech-to-text for queries
   - Voice responses

2. **Multi-modal Support**
   - Image-based queries
   - Document analysis

3. **Personalization**
   - ML-based user profiling
   - Adaptive recommendations
   - Smart notifications

## 🧪 Testing

### Test Scenarios

1. **Entity Extraction Tests**
   - Age detection accuracy
   - Occupation matching
   - State recognition
   - Income parsing

2. **Matching Algorithm Tests**
   - Eligibility scoring
   - Ranking accuracy
   - Edge cases handling

3. **UI/UX Tests**
   - Responsive design
   - Dark mode
   - Accessibility
   - Performance

### Sample Test Queries

```javascript
const testQueries = [
  "I'm a 45-year-old farmer from Maharashtra",
  "Looking for education scholarships for SC category",
  "Need business loan for women entrepreneur",
  "Senior citizen pension schemes",
  "Health insurance for low income family",
  "Skill training for unemployed youth"
];
```

## 📝 Code Quality

### Best Practices Followed
- ✅ Modular architecture
- ✅ Reusable components
- ✅ Clean code principles
- ✅ Comprehensive comments
- ✅ Error handling
- ✅ Type safety (JSDoc)

### Code Structure
- Separation of concerns (UI, logic, data)
- Single responsibility principle
- DRY (Don't Repeat Yourself)
- Consistent naming conventions

## 🔒 Privacy & Security

### Data Handling
- **No external API calls**: All processing happens client-side
- **No data storage**: Conversations not saved (unless user opts in)
- **No tracking**: User queries not logged
- **Privacy-first**: GDPR compliant

### Security Measures
- Input sanitization
- XSS prevention
- Safe external links (rel="noopener noreferrer")

## 📚 Documentation

### Developer Guide
- Code is well-commented
- Function documentation with JSDoc
- README files for each module
- Architecture diagrams

### User Guide
- In-app tips and examples
- Help section
- FAQ integration
- Tutorial videos (future)

## 🎓 Learning Resources

### For Developers
- NLP basics in JavaScript
- React best practices
- Tailwind CSS patterns
- Algorithm optimization

### For Users
- How to write effective queries
- Understanding scheme eligibility
- Application process guidance

## 🤝 Contributing

### How to Extend
1. **Add New Schemes**: Update `schemesData.json`
2. **Improve NLP**: Enhance `nlpProcessor.js`
3. **Better Matching**: Optimize `schemeRecommender.js`
4. **UI Improvements**: Modify components in `ai-recommender/`

### Contribution Guidelines
- Follow existing code style
- Add tests for new features
- Update documentation
- Create meaningful commit messages

## 📞 Support

For issues or questions:
- GitHub Issues
- Documentation
- Community forums

---

**Built with ❤️ for SaralSeva**

*Making government schemes accessible to everyone through AI*
