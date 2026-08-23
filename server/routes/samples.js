import express from 'express';

const router = express.Router();

export const SAMPLE_CONTRACTS = [
  {
    id: 'freelance-dev',
    name: 'Freelance Software & IP Agreement',
    badge: '🚨 High Risk (Common Freelance Trap)',
    description: 'A standard-looking consulting agreement packed with broad IP assignment, uncapped indemnity, and a 24-month non-compete.',
    text: `MASTER SERVICES & INDEPENDENT CONTRACTOR AGREEMENT

This Agreement is entered into between Acme Global Enterprises ("Company") and Jane Doe ("Contractor").

1. SCOPE OF SERVICES & DELIVERABLES
Contractor agrees to perform full-stack software development, architectural design, and consulting as requested by Company.

2. COMPENSATION & PAYMENT TERMS
Company shall pay Contractor at the rate of $95 per hour. Contractor shall invoice Company on the final day of each calendar month. Invoices shall be payable Net 60 days following formal written acceptance of all deliverables by Company at Company's sole discretion. If Company disputes any portion of an invoice, payment for the entire invoice may be withheld until resolution.

3. INTELLECTUAL PROPERTY & WORK FOR HIRE
Contractor agrees that all works of authorship, code, algorithms, designs, documentation, tools, methodologies, and inventions created, conceived, or reduced to practice by Contractor—either solely or jointly with others, during the term of this Agreement or within one (1) year prior to execution—shall be deemed "Work Made for Hire" and the exclusive, perpetual, worldwide property of Company. Contractor hereby unconditionally and irrevocably assigns all right, title, interest, and moral rights in all such creations to Company.

4. INDEMNIFICATION & LIABILITY
Contractor agrees to defend, indemnify, and hold harmless Company, its officers, directors, employees, and affiliates from and against any and all claims, liabilities, losses, damages, legal proceedings, and attorney fees arising out of or resulting from Contractor's services, deliverables, alleged patent/copyright infringement, or breach of this Agreement. Contractor's liability under this section shall be uncapped.

5. NON-COMPETITION & NON-SOLICITATION
During the term of this Agreement and for a period of twenty-four (24) months following termination, Contractor shall not directly or indirectly provide consulting, software development, or related services to any client, company, or startup operating in the financial technology or software sector.

6. TERMINATION
Company may terminate this Agreement at any time without cause upon 24 hours written notice. In the event of termination, Contractor shall only be entitled to pro-rata payment for accepted deliverables.`
  },
  {
    id: 'commercial-lease',
    name: 'Commercial Office / Retail Lease Agreement',
    badge: '⚠️ Moderate-to-High Risk',
    description: 'Commercial tenancy agreement with automatic 3-year rollover, triple-net maintenance surprises, and landlord acceleration clauses.',
    text: `STANDARD COMMERCIAL LEASE AGREEMENT

BETWEEN: Summit Commercial Realty LLC ("Landlord") AND Apex Studios ("Tenant").

1. PREMISES & TERM
Landlord leases to Tenant Suite 400 for an initial term of 24 months.

2. BASE RENT & TRIPLE NET (NNN) OPERATING EXPENSES
Tenant shall pay Base Rent of $4,200 per month. In addition, Tenant shall be responsible for 100% of its proportional share of all building property taxes, insurance premiums, capital structural replacements, HVAC system overhauls, roof repairs, and common area maintenance (CAM) assessments invoiced by Landlord.

3. AUTOMATIC RENEWAL (ROLLOVER)
This Lease shall automatically renew for an additional three (3) year term at a 15% escalated rental rate unless Tenant provides written notice of non-renewal via certified mail exactly one hundred and eighty (180) days prior to the expiration of the initial term.

4. DEFAULT & RENT ACCELERATION
In the event Tenant fails to pay rent within five (5) days of due date, Landlord may declare the entire remaining balance of rent for the full term immediately due and payable, and may re-enter the premises without judicial process.

5. ALTERATIONS & FIXTURES
All improvements, interior walls, electrical wiring, and fixtures installed by Tenant shall immediately become the permanent property of Landlord upon installation.`
  },
  {
    id: 'creator-sponsorship',
    name: 'Creator & Influencer Brand Sponsorship',
    badge: '🚨 High Risk (Perpetual AI/Likeness Rights)',
    description: 'Brand partnership contract containing perpetual likeness rights, paid-ad whitelisting in perpetuity, and strict non-disparagement.',
    text: `INFLUENCER MARKETING & SPONSORSHIP AGREEMENT

BETWEEN: GlowBeverage Co. ("Sponsor") AND Alex Rivera ("Creator").

1. DELIVERABLES
Creator agrees to produce one (1) dedicated YouTube integration and two (2) Instagram Reels promoting Sponsor's new energy beverage.

2. COMPENSATION
Sponsor shall pay a flat fee of $2,500 within 45 days after the final deliverable has been verified to achieve at least 50,000 organic views within the first 14 days of publication.

3. USAGE RIGHTS, LIKENESS & PERPETUAL AD WHITELISTING
Creator grants Sponsor an irrevocable, perpetual, worldwide, royalty-free license to use, reproduce, edit, adapt, broadcast, and train machine learning/AI models on Creator's name, voice, image, likeness, and video content across all media, including paid digital advertising, television, and print.

4. CATEGORY EXCLUSIVITY
Creator shall not promote, endorse, review, or be seen consuming any beverage, coffee, tea, or dietary supplement brand other than Sponsor for a period of twelve (12) months from the date of contract execution.

5. LIQUIDATED DAMAGES
Any breach of exclusivity or negative commentary regarding Sponsor shall entitle Sponsor to liquidated damages in the amount of $25,000 plus return of all sponsorship fees.`
  },
  {
    id: 'mutual-nda',
    name: 'Balanced Mutual Non-Disclosure Agreement',
    badge: '✅ Low Risk (Industry Standard)',
    description: 'A fair, bilateral NDA protecting trade secrets with reasonable 2-year expiration and mutual protections.',
    text: `MUTUAL NON-DISCLOSURE AGREEMENT

This Mutual Non-Disclosure Agreement ("Agreement") is entered into by and between Alpha Corp and Beta Ventures ("Parties").

1. PURPOSE
The Parties wish to explore a potential business relationship and may disclose confidential proprietary information to each other.

2. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means any non-public business, financial, technical, or marketing data disclosed by one party to the other, marked as confidential or reasonably understood to be confidential.

3. EXCLUSIONS
Confidential Information does not include information that: (a) is or becomes publicly known without breach; (b) was already known to the recipient prior to disclosure; (c) is independently developed without reference to the disclosed information; or (d) is required to be disclosed by law.

4. OBLIGATIONS & TERM
Each party agrees to protect the other's confidential information using the same degree of care it uses for its own confidential assets (at least reasonable care). These confidentiality obligations shall expire two (2) years from the date of disclosure.

5. GOVERNING LAW
This Agreement shall be governed by the laws of the State of Delaware without regard to conflict of law principles.`
  }
];

router.get('/', (req, res) => {
  return res.json({
    success: true,
    data: SAMPLE_CONTRACTS
  });
});

export default router;
