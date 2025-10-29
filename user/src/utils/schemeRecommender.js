/**
 * Scheme Recommender Engine
 * Matches user queries with government schemes using extracted entities
 * Implements hybrid scoring: eligibility (60%) + similarity (30%) + popularity (10%)
 */

import schemesData from '../data/schemesData.json';
import { calculateSimilarity, tokenize, removeStopwords } from './nlpProcessor';

/**
 * Check if user meets age eligibility
 */
function checkAgeEligibility(userAge, scheme) {
  if (!userAge || !scheme.eligibility.age_min || !scheme.eligibility.age_max) {
    return { eligible: true, score: 0.5 }; // Neutral if no age data
  }

  if (userAge >= scheme.eligibility.age_min && userAge <= scheme.eligibility.age_max) {
    return { eligible: true, score: 1.0 };
  }

  // Partial score if close to range
  const minDiff = Math.abs(userAge - scheme.eligibility.age_min);
  const maxDiff = Math.abs(userAge - scheme.eligibility.age_max);
  const closestDiff = Math.min(minDiff, maxDiff);
  
  if (closestDiff <= 5) {
    return { eligible: true, score: 0.3 }; // Close enough, might still apply
  }

  return { eligible: false, score: 0 };
}

/**
 * Check if user meets occupation eligibility
 */
function checkOccupationEligibility(userOccupations, scheme) {
  if (!userOccupations || !scheme.eligibility.occupation) {
    return { eligible: true, score: 0.5 };
  }

  const schemeOccupations = scheme.eligibility.occupation.map(o => o.toLowerCase());
  
  // Check if scheme accepts all occupations
  if (schemeOccupations.includes('all')) {
    return { eligible: true, score: 0.7 };
  }

  // Check for direct match
  for (const userOcc of userOccupations) {
    if (schemeOccupations.includes(userOcc.toLowerCase())) {
      return { eligible: true, score: 1.0 };
    }
  }

  return { eligible: false, score: 0 };
}

/**
 * Check if user meets income eligibility
 */
function checkIncomeEligibility(userIncome, scheme) {
  if (!userIncome || !scheme.eligibility.income_limit) {
    return { eligible: true, score: 0.5 };
  }

  if (userIncome <= scheme.eligibility.income_limit) {
    return { eligible: true, score: 1.0 };
  }

  // Partial score if slightly over limit (within 20%)
  const overage = (userIncome - scheme.eligibility.income_limit) / scheme.eligibility.income_limit;
  if (overage <= 0.2) {
    return { eligible: true, score: 0.4 };
  }

  return { eligible: false, score: 0 };
}

/**
 * Check if user meets state eligibility
 */
function checkStateEligibility(userState, scheme) {
  if (!userState || !scheme.eligibility.state_specific) {
    return { eligible: true, score: 0.5 };
  }

  const schemeStates = scheme.eligibility.state_specific.map(s => s.toLowerCase());
  
  if (schemeStates.includes('all')) {
    return { eligible: true, score: 0.8 };
  }

  if (schemeStates.includes(userState.toLowerCase())) {
    return { eligible: true, score: 1.0 };
  }

  return { eligible: false, score: 0 };
}

/**
 * Check if user meets gender eligibility
 */
function checkGenderEligibility(userGender, scheme) {
  if (!userGender || !scheme.eligibility.gender) {
    return { eligible: true, score: 0.5 };
  }

  const schemeGenders = scheme.eligibility.gender.map(g => g.toLowerCase());
  
  if (schemeGenders.includes('all')) {
    return { eligible: true, score: 0.7 };
  }

  if (schemeGenders.includes(userGender.toLowerCase())) {
    return { eligible: true, score: 1.0 };
  }

  return { eligible: false, score: 0 };
}

/**
 * Check BPL eligibility
 */
function checkBPLEligibility(userBPL, scheme) {
  if (userBPL === null || scheme.eligibility.bpl === undefined) {
    return { eligible: true, score: 0.5 };
  }

  if (scheme.eligibility.bpl === userBPL) {
    return { eligible: true, score: 1.0 };
  }

  // If scheme requires BPL but user is not, ineligible
  if (scheme.eligibility.bpl && !userBPL) {
    return { eligible: false, score: 0 };
  }

  // If user is BPL but scheme doesn't require it, still eligible
  return { eligible: true, score: 0.7 };
}

/**
 * Calculate overall eligibility score
 */
function calculateEligibilityScore(entities, scheme) {
  const checks = [
    checkAgeEligibility(entities.age, scheme),
    checkOccupationEligibility(entities.occupation, scheme),
    checkIncomeEligibility(entities.income, scheme),
    checkStateEligibility(entities.state, scheme),
    checkGenderEligibility(entities.gender, scheme),
    checkBPLEligibility(entities.bpl, scheme)
  ];

  // Check if any hard requirement is not met
  const hasHardFailure = checks.some(check => !check.eligible);
  if (hasHardFailure) {
    return 0;
  }

  // Average of all eligibility scores
  const avgScore = checks.reduce((sum, check) => sum + check.score, 0) / checks.length;
  return avgScore;
}

/**
 * Calculate textual similarity score
 */
function calculateTextualSimilarity(entities, scheme) {
  const userText = entities.originalText.toLowerCase();
  const schemeText = `${scheme.scheme_name} ${scheme.description} ${scheme.category} ${scheme.keywords.join(' ')}`.toLowerCase();

  // Calculate similarity
  const similarity = calculateSimilarity(userText, schemeText);

  // Boost score if intent matches category
  let intentBoost = 0;
  if (entities.intent && entities.intent.length > 0) {
    const primaryIntent = entities.intent[0].toLowerCase();
    const schemeCategory = scheme.category.toLowerCase();
    
    if (schemeCategory.includes(primaryIntent) || primaryIntent.includes(schemeCategory)) {
      intentBoost = 0.3;
    }
  }

  return Math.min(similarity + intentBoost, 1.0);
}

/**
 * Calculate popularity score (placeholder - can be enhanced with real data)
 */
function calculatePopularityScore(scheme) {
  // Popular schemes based on common usage
  const popularSchemes = [
    'pm-kisan', 'pmay', 'ayushman-bharat', 'pmjdy', 
    'nsp', 'pmmy', 'skill-india'
  ];

  return popularSchemes.includes(scheme.id) ? 0.8 : 0.5;
}

/**
 * Calculate hybrid score
 * 60% eligibility + 30% textual similarity + 10% popularity
 */
function calculateHybridScore(entities, scheme) {
  const eligibilityScore = calculateEligibilityScore(entities, scheme);
  const similarityScore = calculateTextualSimilarity(entities, scheme);
  const popularityScore = calculatePopularityScore(scheme);

  const hybridScore = (
    eligibilityScore * 0.6 +
    similarityScore * 0.3 +
    popularityScore * 0.1
  );

  return {
    total: hybridScore,
    eligibility: eligibilityScore,
    similarity: similarityScore,
    popularity: popularityScore
  };
}

/**
 * Main recommendation function
 * Returns top N schemes ranked by hybrid score
 */
export function recommendSchemes(entities, topN = 5) {
  const scoredSchemes = schemesData.map(scheme => {
    const scores = calculateHybridScore(entities, scheme);
    return {
      ...scheme,
      scores,
      finalScore: scores.total
    };
  });

  // Filter schemes with score > 0.2 (minimum threshold)
  const filteredSchemes = scoredSchemes.filter(s => s.finalScore > 0.2);

  // Sort by final score (descending)
  const rankedSchemes = filteredSchemes.sort((a, b) => b.finalScore - a.finalScore);

  // Return top N
  return rankedSchemes.slice(0, topN);
}

/**
 * Get scheme by ID
 */
export function getSchemeById(schemeId) {
  return schemesData.find(scheme => scheme.id === schemeId);
}

/**
 * Get all schemes in a category
 */
export function getSchemesByCategory(category) {
  return schemesData.filter(scheme => 
    scheme.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Generate explanation for why a scheme was recommended
 */
export function generateRecommendationExplanation(scheme, entities) {
  const reasons = [];

  // Check what matched
  if (entities.occupation && scheme.eligibility.occupation) {
    const schemeOccupations = scheme.eligibility.occupation.map(o => o.toLowerCase());
    const userOccupations = entities.occupation.map(o => o.toLowerCase());
    const match = userOccupations.some(uo => schemeOccupations.includes(uo));
    
    if (match || schemeOccupations.includes('all')) {
      reasons.push('✓ Matches your occupation');
    }
  }

  if (entities.age && scheme.eligibility.age_min && scheme.eligibility.age_max) {
    if (entities.age >= scheme.eligibility.age_min && entities.age <= scheme.eligibility.age_max) {
      reasons.push('✓ Meets age requirement');
    }
  }

  if (entities.income && scheme.eligibility.income_limit) {
    if (entities.income <= scheme.eligibility.income_limit) {
      reasons.push('✓ Within income limit');
    }
  }

  if (entities.state && scheme.eligibility.state_specific) {
    const schemeStates = scheme.eligibility.state_specific.map(s => s.toLowerCase());
    if (schemeStates.includes('all') || schemeStates.includes(entities.state.toLowerCase())) {
      reasons.push('✓ Available in your state');
    }
  }

  if (entities.intent && entities.intent.length > 0) {
    const primaryIntent = entities.intent[0];
    if (scheme.category.toLowerCase().includes(primaryIntent.toLowerCase())) {
      reasons.push(`✓ Relevant to ${primaryIntent}`);
    }
  }

  return reasons.length > 0 
    ? reasons.join('\n') 
    : '✓ General eligibility match';
}

export default {
  recommendSchemes,
  getSchemeById,
  getSchemesByCategory,
  generateRecommendationExplanation
};
