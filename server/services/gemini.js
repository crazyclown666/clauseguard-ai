import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Intelligent fallback analyzer used when GEMINI_API_KEY is not provided
 * Provides rich, realistic analysis of contract clauses.
 */
function analyzeContractLocally(text) {
  const lower = text.toLowerCase();
  const clauses = [];
  let scorePenalty = 0;
  const redFlags = [];

  // Check 1: Broad Indemnification & Unlimited Liability
  if (lower.includes('indemnif') || lower.includes('hold harmless')) {
    const isUnilateral = !lower.includes('mutual indemn') && (lower.includes('contractor shall indemnify') || lower.includes('licensee shall indemnify') || lower.includes('client shall be held harmless'));
    if (isUnilateral) {
      scorePenalty += 28;
      redFlags.push('One-sided broad indemnification clause holding you liable for third-party claims and legal fees.');
      clauses.push({
        id: 'c-indemnity',
        category: 'Liability & Indemnification',
        title: 'One-Sided Broad Indemnity Clause',
        severity: 'high',
        originalText: extractMatchingSentence(text, ['indemnify', 'hold harmless', 'defend']) || 'Contractor agrees to indemnify, defend, and hold harmless the Company from any claims, losses, or legal expenses.',
        plainEnglish: 'You are agreeing to pay all legal fees and financial damages if anyone sues the other party over this project—even if the issue was largely beyond your control.',
        riskAnalysis: 'Exposes you to potentially catastrophic uncapped legal bills and settlement costs without a reciprocal commitment.',
        recommendedAction: 'Make indemnification strictly mutual and cap total liability to the fees paid under this agreement.',
        counterProposal: 'Each party shall mutually indemnify and hold harmless the other party from third-party claims arising solely from gross negligence or willful misconduct, with total liability capped at total fees received in the preceding 12 months.'
      });
    } else {
      scorePenalty += 10;
      clauses.push({
        id: 'c-indemnity-mutual',
        category: 'Liability & Indemnification',
        title: 'Mutual Indemnity Clause',
        severity: 'medium',
        originalText: extractMatchingSentence(text, ['indemnify', 'hold harmless']) || 'Both parties agree to indemnify and hold each other harmless from claims.',
        plainEnglish: 'Both parties agree to cover legal damages for each other, but scope should be verified.',
        riskAnalysis: 'Acceptable in concept, but ensure liability caps are explicitly defined in the agreement.',
        recommendedAction: 'Verify that an aggregate liability cap (e.g. 1x contract value) is in place.',
        counterProposal: 'In no event shall either party\'s aggregate liability exceed the total amount paid by Client under this Agreement.'
      });
    }
  }

  // Check 2: Intellectual Property & "Work for Hire" Overreach
  if (lower.includes('intellectual property') || lower.includes('work for hire') || lower.includes('moral rights') || lower.includes('assigns all rights')) {
    const overreach = lower.includes('prior to') || lower.includes('outside of') || lower.includes('irrevocably assigns all') || lower.includes('perpetual, worldwide');
    if (overreach) {
      scorePenalty += 24;
      redFlags.push('Aggressive IP transfer claiming ownership over your pre-existing tools, code libraries, or unrelated ideas.');
      clauses.push({
        id: 'c-ip',
        category: 'Intellectual Property',
        title: 'Overly Broad IP Assignment & Work for Hire',
        severity: 'high',
        originalText: extractMatchingSentence(text, ['work for hire', 'assigns all right', 'moral rights', 'intellectual property']) || 'Contractor hereby assigns all right, title, and interest in all developments, tools, and creations made during or prior to the term.',
        plainEnglish: 'The client claims full ownership not just of the final project, but potentially your personal coding tools, background libraries, and future derivative ideas.',
        riskAnalysis: 'You could lose the legal right to reuse your own reusable components, frameworks, or past portfolio work for other paying clients.',
        recommendedAction: 'Carve out "Background / Pre-existing IP" and grant a perpetual license rather than transferring entire source ownership.',
        counterProposal: 'Contractor retains all right, title, and interest in Contractor Pre-Existing Tools and Background IP. Contractor grants Client a non-exclusive, perpetual, royalty-free license to use Background IP solely as integrated into the final Deliverables.'
      });
    } else {
      scorePenalty += 8;
      clauses.push({
        id: 'c-ip-std',
        category: 'Intellectual Property',
        title: 'Standard Deliverables IP Transfer',
        severity: 'low',
        originalText: extractMatchingSentence(text, ['intellectual property', 'deliverables', 'assignment']) || 'Client owns the final custom Deliverables upon full and final payment.',
        plainEnglish: 'The client owns the finished work, provided they pay you in full.',
        riskAnalysis: 'Ensure transfer is conditioned strictly upon receipt of full payment.',
        recommendedAction: 'Add clause stating IP transfers only after all invoices are settled in full.',
        counterProposal: 'Ownership of Deliverables shall transfer to Client only upon receipt of full and final payment of all outstanding invoices.'
      });
    }
  }

  // Check 3: Non-Compete & Restrictive Covenants
  if (lower.includes('non-compete') || lower.includes('non compete') || lower.includes('shall not engage in') || lower.includes('competing business')) {
    scorePenalty += 25;
    redFlags.push('Restrictive non-compete covenant preventing you from working with industry clients for an extended duration.');
    clauses.push({
      id: 'c-noncompete',
      category: 'Non-Compete & Exclusivity',
      title: 'Broad Non-Compete Restriction',
      severity: 'high',
      originalText: extractMatchingSentence(text, ['non-compete', 'compete', 'competing business', 'shall not engage']) || 'Contractor agrees not to engage in or provide services to any business in competition with the Company for 24 months.',
      plainEnglish: 'You are forbidden from working with other companies in the same industry or niche for up to 1-2 years after this contract ends.',
      riskAnalysis: 'Directly threatens your livelihood by blocking future freelance, consulting, or employment contracts.',
      recommendedAction: 'Demand complete removal of non-compete clauses; offer a standard Non-Solicitation / NDA instead.',
      counterProposal: 'Delete the Non-Compete section in its entirety. Replace with: "Contractor agrees not to directly solicit Company\'s active employees or clients for a period of 6 months following termination."'
    });
  }

  // Check 4: Payment Terms & Net-60/90 Delays
  if (lower.includes('net 60') || lower.includes('net 90') || lower.includes('pay when paid') || lower.includes('sole discretion')) {
    scorePenalty += 18;
    redFlags.push('Extended payment window (Net-60+) or conditional "pay-when-paid" clause endangering your cash flow.');
    clauses.push({
      id: 'c-payment',
      category: 'Payment Terms & Milestones',
      title: 'Extended Payment Delays & Unfavorable Terms',
      severity: 'medium',
      originalText: extractMatchingSentence(text, ['net 60', 'net 90', 'pay when paid', 'invoicing', 'discretion']) || 'Payment shall be disbursed Net 60 days following acceptance of invoice at Company\'s sole discretion.',
      plainEnglish: 'You will have to wait 60 to 90 days after finishing work to receive money, and client can delay if they unilaterally dispute subjective quality.',
      riskAnalysis: 'Increases risk of non-payment and cash flow dry spells.',
      recommendedAction: 'Standardize to Net 15 or Net 30, with mandatory 1.5% monthly late fees on overdue balances.',
      counterProposal: 'Invoices shall be payable Net 15 days from issuance. Overdue payments shall accrue interest at the rate of 1.5% per month or the maximum legal rate.'
    });
  } else {
    clauses.push({
      id: 'c-payment-ok',
      category: 'Payment Terms & Milestones',
      title: 'Standard Payment Schedule',
      severity: 'safe',
      originalText: extractMatchingSentence(text, ['payment', 'compensation', 'fee', 'invoice']) || 'Compensation shall be paid upon milestone completion as set forth in Exhibit A.',
      plainEnglish: 'Payment terms appear standard and milestone-based.',
      riskAnalysis: 'Low risk. Verify clear delivery criteria for each milestone.',
      recommendedAction: 'Confirm all deliverables have clear objective sign-off criteria.',
      counterProposal: 'Deliverables shall be deemed accepted if no written rejection is received within 5 business days of delivery.'
    });
  }

  // Check 5: Auto-Renewal / Sneaky Termination Penalties
  if (lower.includes('automatically renew') || lower.includes('auto-renew') || lower.includes('without cause') || lower.includes('liquidated damages')) {
    scorePenalty += 15;
    redFlags.push('Automatic lock-in renewal or one-sided termination clause without cause.');
    clauses.push({
      id: 'c-termination',
      category: 'Termination & Auto-Renewal',
      title: 'Automatic Lock-in or Unequal Termination Rights',
      severity: 'medium',
      originalText: extractMatchingSentence(text, ['automatically renew', 'renewal', 'termination for convenience', 'without cause']) || 'Agreement automatically renews for successive 1-year terms unless notice is given 90 days in advance.',
      plainEnglish: 'The contract locks you in for an entire extra year if you forget to give formal written notice 90 days ahead of time.',
      riskAnalysis: 'Leaves you trapped in an outdated contract with no easy exit.',
      recommendedAction: 'Require written affirmative renewal or reduce notice window to 14–30 days.',
      counterProposal: 'Either party may terminate this Agreement without cause upon thirty (30) days written notice. Renewal shall require mutual written agreement.'
    });
  }

  // Check 6: Confidentiality & NDA Disparity
  if (lower.includes('confidential') || lower.includes('proprietary')) {
    const isOneSided = lower.includes('recipient shall keep') && !lower.includes('mutual confidentiality');
    clauses.push({
      id: 'c-confidentiality',
      category: 'Confidentiality & Non-Disclosure',
      title: isOneSided ? 'One-Sided Confidentiality Obligations' : 'Mutual Non-Disclosure Agreement',
      severity: isOneSided ? 'medium' : 'safe',
      originalText: extractMatchingSentence(text, ['confidential', 'proprietary', 'trade secret']) || 'Recipient agrees to hold all disclosed information in strict confidence indefinitely.',
      plainEnglish: isOneSided ? 'You are sworn to strict secrecy indefinitely, while the other party is not bound by the same standards.' : 'Both parties agree to protect proprietary trade secrets and confidential information.',
      riskAnalysis: isOneSided ? 'Disproportionate risk if discussions fall apart.' : 'Standard commercial protection for trade secrets.',
      recommendedAction: isOneSided ? 'Make confidentiality obligations strictly bilateral with a 2-3 year sunset.' : 'Verify standard exclusions (public domain, independently developed).',
      counterProposal: 'Confidentiality obligations shall apply mutually to both parties and shall expire three (3) years from the date of disclosure.'
    });
  }

  // Calculate final score (0 - 100)
  const calculatedScore = Math.max(15, Math.min(95, 100 - scorePenalty));
  let riskLevel = 'Safe';
  if (calculatedScore < 45) riskLevel = 'Severe Risk';
  else if (calculatedScore < 65) riskLevel = 'High Risk';
  else if (calculatedScore < 80) riskLevel = 'Moderate Risk';
  else if (calculatedScore < 90) riskLevel = 'Low Risk';

  if (redFlags.length === 0) {
    redFlags.push('Minor ambiguities in termination procedures.', 'Recommend clarifying payment dispute timelines.');
  }

  return {
    isMock: true,
    overallScore: calculatedScore,
    riskLevel,
    documentType: detectDocumentType(text),
    wordCount: text.split(/\s+/).length,
    executiveSummary: {
      verdict: calculatedScore < 60 
        ? 'High Risk: Contains several aggressive or one-sided terms that strongly favor the counterparty. DO NOT sign without negotiating critical revisions.'
        : calculatedScore < 80 
        ? 'Moderate Risk: Standard commercial framework with 2-3 clauses that need clarification and liability capping.'
        : 'Low Risk / Favorable: Balanced agreement adhering to fair commercial standards.',
      topRedFlags: redFlags.slice(0, 3),
      financialExposure: calculatedScore < 60 ? 'Uncapped / High' : calculatedScore < 80 ? 'Moderate' : 'Low / Standard',
      negotiationLeverage: calculatedScore < 60 ? 'Urgent Revisions Needed' : 'Minor Refinements Recommended'
    },
    categoryBreakdown: {
      liability: calculateCategoryScore(clauses, 'Liability & Indemnification'),
      intellectualProperty: calculateCategoryScore(clauses, 'Intellectual Property'),
      paymentTerms: calculateCategoryScore(clauses, 'Payment Terms & Milestones'),
      termination: calculateCategoryScore(clauses, 'Termination & Auto-Renewal'),
      confidentiality: calculateCategoryScore(clauses, 'Confidentiality & Non-Disclosure'),
      nonCompete: calculateCategoryScore(clauses, 'Non-Compete & Exclusivity')
    },
    clauses,
    negotiationPlaybook: [
      {
        tactic: 'The "Market Standard" Framing',
        description: 'Position your edits not as distrust, but as aligning with standard industry best practices for mutual commercial protection.'
      },
      {
        tactic: 'Liability Cap Tie-in',
        description: 'Never sign an uncapped indemnity. Always anchor your liability to 100% of the fees received under the contract.'
      },
      {
        tactic: 'Prior IP & Background Tools Carve-out',
        description: 'Explicitly attach an Exhibit of your pre-existing code, templates, and methodologies so they cannot claim ownership of your base assets.'
      }
    ]
  };
}

function extractMatchingSentence(text, keywords) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  for (const sentence of sentences) {
    const sLower = sentence.toLowerCase();
    if (keywords.some(k => sLower.includes(k))) {
      return sentence.trim();
    }
  }
  return '';
}

function detectDocumentType(text) {
  const lower = text.toLowerCase();
  if (lower.includes('lease') || lower.includes('tenant') || lower.includes('landlord')) return 'Commercial / Residential Lease';
  if (lower.includes('non-disclosure') || lower.includes('confidentiality agreement') || lower.includes('nda')) return 'Non-Disclosure Agreement (NDA)';
  if (lower.includes('influencer') || lower.includes('sponsor') || lower.includes('campaign')) return 'Brand Sponsorship & Creator Agreement';
  if (lower.includes('contractor') || lower.includes('freelance') || lower.includes('consultant')) return 'Independent Contractor / Services Agreement';
  if (lower.includes('employment') || lower.includes('employee') || lower.includes('salary')) return 'Employment Contract';
  if (lower.includes('software license') || lower.includes('saas') || lower.includes('end user')) return 'SaaS / Software License Agreement';
  return 'General Commercial Contract';
}

function calculateCategoryScore(clauses, categoryName) {
  const match = clauses.find(c => c.category === categoryName);
  if (!match) return 85;
  if (match.severity === 'high') return 35;
  if (match.severity === 'medium') return 60;
  if (match.severity === 'low') return 80;
  return 95;
}

/**
 * Main analysis function: Uses Google Generative AI (Gemini 2.5 Flash / Flash Lite) if API key is present,
 * or gracefully falls back to local intelligent heuristic analyzer.
 */
export async function analyzeContract(contractText) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey === 'YOUR_GEMINI_API_KEY') {
    console.log('[ClauseGuard Engine] Using Local Intelligent Legal Analysis Engine (No GEMINI_API_KEY detected).');
    return analyzeContractLocally(contractText);
  }

  try {
    console.log('[ClauseGuard Engine] Analyzing contract via Gemini API...');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
You are ClauseGuard AI, an elite legal risk analyst and contract intelligence assistant.
Analyze the following contract document for legal risks, hidden traps, unfair obligations, and plain-English breakdown.

Analyze strictly and return a valid JSON object matching this schema:
{
  "overallScore": number (0 to 100, where 100 is completely safe/fair, and 0 is hazardous/one-sided),
  "riskLevel": "Safe" | "Low Risk" | "Moderate Risk" | "High Risk" | "Severe Risk",
  "documentType": string (e.g. "Independent Contractor Agreement", "Commercial Lease", "NDA", etc.),
  "wordCount": number,
  "executiveSummary": {
    "verdict": string (2-3 sentences summarizing the overall fairness and key takeaway),
    "topRedFlags": [string, string, string] (Top 3 most dangerous or questionable items found),
    "financialExposure": string (e.g. "Uncapped / Severe", "Moderate", "Limited"),
    "negotiationLeverage": string (e.g. "High Priority Revisions Needed", "Minor Adjustments Recommended")
  },
  "categoryBreakdown": {
    "liability": number (0-100),
    "intellectualProperty": number (0-100),
    "paymentTerms": number (0-100),
    "termination": number (0-100),
    "confidentiality": number (0-100),
    "nonCompete": number (0-100)
  },
  "clauses": [
    {
      "id": string (unique ID like "c1", "c2"),
      "category": string (e.g. "Liability & Indemnification", "Intellectual Property", "Payment Terms", "Termination", "Non-Compete", "Confidentiality", "Dispute Resolution"),
      "title": string (Descriptive headline like "Uncapped Indemnity for Third-Party Claims"),
      "severity": "high" | "medium" | "low" | "safe",
      "originalText": string (the exact or summarized passage from the contract),
      "plainEnglish": string (crystal clear explanation of what this actually means for the user in real life without legalese),
      "riskAnalysis": string (why this is risky or disadvantageous),
      "recommendedAction": string (what they should do or ask for),
      "counterProposal": string (exact professional alternative wording to counter-offer)
    }
  ],
  "negotiationPlaybook": [
    {
      "tactic": string,
      "description": string
    }
  ]
}

CONTRACT TEXT TO ANALYZE:
"""
${contractText.slice(0, 30000)}
"""

Return ONLY the raw JSON object. Do not include markdown code block markers or additional prose.
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    // Strip possible markdown fences
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);
    parsed.isMock = false;
    return parsed;
  } catch (error) {
    console.error('[ClauseGuard Engine] Gemini API error, falling back to local analysis:', error.message);
    const fallback = analyzeContractLocally(contractText);
    fallback.fallbackNotice = `Live AI request encountered an error (${error.message}). Displaying heuristic legal audit.`;
    return fallback;
  }
}
