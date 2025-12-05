/**
 * NLP Processor for Scheme Recommendation
 * Pure JavaScript implementation without external NLP libraries
 * Extracts entities (age, occupation, state, gender, income) and intent from user queries
 */

// Common stopwords to filter out
const STOPWORDS = new Set([
  'i', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
  'should', 'could', 'may', 'might', 'must', 'can', 'the', 'a',
  'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of',
  'with', 'by', 'from', 'as', 'into', 'through', 'during', 'before',
  'after', 'above', 'below', 'between', 'under', 'again', 'further',
  'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how',
  'all', 'both', 'each', 'few', 'more', 'most', 'other', 'some',
  'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than',
  'too', 'very', 'my', 'me', 'looking', 'need', 'want', 'get'
]);

// Occupation keywords mapping
const OCCUPATION_KEYWORDS = {
  'farmer': ['farmer', 'agriculture', 'farming', 'cultivator', 'agriculturist', 'crop', 'land', 'kisan'],
  'student': ['student', 'studying', 'school', 'college', 'university', 'education', 'learner'],
  'entrepreneur': ['entrepreneur', 'business', 'startup', 'enterprise', 'businessperson', 'owner'],
  'self-employed': ['self-employed', 'freelancer', 'independent', 'own business'],
  'unemployed': ['unemployed', 'jobless', 'looking for job', 'seeking employment'],
  'trader': ['trader', 'merchant', 'dealer', 'vendor'],
  'shopkeeper': ['shopkeeper', 'shop owner', 'retailer', 'store owner'],
  'agricultural worker': ['agricultural worker', 'farm worker', 'farm labour'],
  'small business owner': ['small business', 'msme', 'micro enterprise']
};

// Category/Intent keywords
const CATEGORY_KEYWORDS = {
  'agriculture': ['farm', 'crop', 'agriculture', 'kisan', 'irrigation', 'soil', 'harvest', 'cultivation'],
  'housing': ['house', 'home', 'housing', 'shelter', 'awas', 'accommodation', 'residence'],
  'business & entrepreneurship': ['business', 'loan', 'startup', 'enterprise', 'mudra', 'entrepreneur'],
  'education': ['education', 'scholarship', 'study', 'school', 'college', 'student', 'fees', 'learning'],
  'social welfare': ['pension', 'elderly', 'widow', 'disability', 'welfare', 'old age', 'senior'],
  'health': ['health', 'medical', 'hospital', 'treatment', 'insurance', 'healthcare', 'doctor'],
  'skill development': ['skill', 'training', 'vocational', 'course', 'employment', 'job training'],
  'financial inclusion': ['bank', 'account', 'savings', 'financial', 'banking'],
  'energy & environment': ['solar', 'energy', 'lpg', 'gas', 'electricity', 'renewable', 'fuel'],
  'women & child development': ['women', 'girl', 'child', 'daughter', 'beti', 'female', 'mother'],
  'food security': ['food', 'ration', 'grain', 'pds', 'subsidy']
};

// Indian states
const INDIAN_STATES = [
  'andhra pradesh', 'arunachal pradesh', 'assam', 'bihar', 'chhattisgarh',
  'goa', 'gujarat', 'haryana', 'himachal pradesh', 'jharkhand', 'karnataka',
  'kerala', 'madhya pradesh', 'maharashtra', 'manipur', 'meghalaya', 'mizoram',
  'nagaland', 'odisha', 'punjab', 'rajasthan', 'sikkim', 'tamil nadu',
  'telangana', 'tripura', 'uttar pradesh', 'uttarakhand', 'west bengal',
  'delhi', 'jammu and kashmir', 'ladakh'
];

// Gender keywords
const GENDER_KEYWORDS = {
  'female': ['female', 'woman', 'women', 'girl', 'she', 'her', 'widow', 'lady'],
  'male': ['male', 'man', 'boy', 'he', 'his', 'him']
};


/**
 * Tokenize and clean text
 */
export function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ') // Remove punctuation
    .split(/\s+/)
    .filter(word => word.length > 0);
}

/**
 * Remove stopwords from tokens
 */
export function removeStopwords(tokens) {
  return tokens.filter(token => !STOPWORDS.has(token));
}

/**
 * Extract age from text
 */
export function extractAge(text) {
  // Pattern: "X years old", "X year old", "aged X", "age X", just "X" followed by year/years
  const patterns = [
    /(\d+)\s*(?:years?|yrs?)\s*old/i,
    /aged?\s*(\d+)/i,
    /(\d+)\s*(?:years?|yrs?)/i,
    /\b(\d{1,2})\b/  // Any 1-2 digit number (fallback)
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const age = parseInt(match[1]);
      if (age >= 0 && age <= 120) {
        return age;
      }
    }
  }
  return null;
}

/**
 * Extract occupation from text
 */
export function extractOccupation(text) {
  const lowerText = text.toLowerCase();
  const detectedOccupations = [];

  for (const [occupation, keywords] of Object.entries(OCCUPATION_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        detectedOccupations.push(occupation);
        break;
      }
    }
  }

  return detectedOccupations.length > 0 ? detectedOccupations : null;
}

/**
 * Extract state from text
 */
export function extractState(text) {
  const lowerText = text.toLowerCase();
  
  for (const state of INDIAN_STATES) {
    if (lowerText.includes(state)) {
      return state;
    }
  }
  return null;
}

/**
 * Extract gender from text
 */
export function extractGender(text) {
  const lowerText = text.toLowerCase();
  
  for (const [gender, keywords] of Object.entries(GENDER_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        return gender;
      }
    }
  }
  return null;
}

/**
 * Extract income from text
 */
export function extractIncome(text) {
  // Pattern: "income of X", "earning X", "salary X", numbers with lakh/lakhs
  const patterns = [
    /(?:income|earning|salary)\s*(?:of|is|:)?\s*(?:rs\.?|₹)?\s*(\d+(?:\.\d+)?)\s*(?:lakh|lakhs?)/i,
    /(?:rs\.?|₹)\s*(\d+(?:\.\d+)?)\s*(?:lakh|lakhs?)/i,
    /(\d+(?:\.\d+)?)\s*(?:lakh|lakhs?)/i
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const amount = parseFloat(match[1]) * 100000; // Convert lakhs to rupees
      return amount;
    }
  }
  return null;
}

/**
 * Detect intent/category from text
 */
export function detectIntent(text) {
  const lowerText = text.toLowerCase();
  const tokens = tokenize(lowerText);
  const categoryScores = {};

  // Score each category based on keyword matches
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    let score = 0;
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        score += 1;
      }
    }
    if (score > 0) {
      categoryScores[category] = score;
    }
  }

  // Return categories sorted by score
  const sortedCategories = Object.entries(categoryScores)
    .sort((a, b) => b[1] - a[1])
    .map(([category]) => category);

  return sortedCategories.length > 0 ? sortedCategories : ['general'];
}

/**
 * Extract BPL status from text
 */
export function extractBPLStatus(text) {
  const lowerText = text.toLowerCase();
  const bplKeywords = ['bpl', 'below poverty line', 'poor', 'economically weak'];
  
  for (const keyword of bplKeywords) {
    if (lowerText.includes(keyword)) {
      return true;
    }
  }
  return null;
}

/**
 * Main entity extraction function
 */
export function extractEntities(text) {
  return {
    age: extractAge(text),
    occupation: extractOccupation(text),
    state: extractState(text),
    gender: extractGender(text),
    income: extractIncome(text),
    bpl: extractBPLStatus(text),
    intent: detectIntent(text),
    originalText: text
  };
}

/**
 * Calculate text similarity using Jaccard similarity
 */
export function calculateSimilarity(text1, text2) {
  const tokens1 = new Set(removeStopwords(tokenize(text1)));
  const tokens2 = new Set(removeStopwords(tokenize(text2)));

  const intersection = new Set([...tokens1].filter(x => tokens2.has(x)));
  const union = new Set([...tokens1, ...tokens2]);

  return union.size > 0 ? intersection.size / union.size : 0;
}

/**
 * Generate a natural language response for extracted entities
 */
export function generateEntitySummary(entities) {
  const parts = [];
  
  if (entities.age) parts.push(`age ${entities.age}`);
  if (entities.occupation) parts.push(`occupation: ${entities.occupation.join(', ')}`);
  if (entities.state) parts.push(`state: ${entities.state}`);
  if (entities.gender) parts.push(`gender: ${entities.gender}`);
  if (entities.income) parts.push(`income: ₹${(entities.income / 100000).toFixed(2)} lakh`);
  if (entities.bpl) parts.push('BPL category');
  
  return parts.length > 0 
    ? `I understood: ${parts.join(', ')}.` 
    : 'I\'m analyzing your query...';
}
