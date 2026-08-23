# 🛡️ ClauseGuard AI — AI Contract & Document Risk Analyzer (Micro-SaaS)

ClauseGuard AI is a production-ready, highly monetizable Micro-SaaS that analyzes contracts, NDAs, leases, and service agreements in seconds. It calculates a 0–100 risk score, flags critical hazards (uncapped liabilities, IP forfeitures, non-competes, predatory renewals), provides plain-English translations, and generates legally sound counter-clauses with ready-to-send email templates.

---

## 💰 Passive Income & Business Model

### 1. Revenue Streams
* **Pay-Per-Scan Pass ($4.99 one-time)**: High-conversion option for users who just need to review a single lease or client agreement.
* **Unlimited Pro Subscription ($19/month)**: Recurring MRR from active freelancers, consultants, agency owners, and startup founders.
* **Annual Pro ($149/year)**: High-ticket upfront cash flow ($149/sale).

### 2. High-ROI Customer Niches
* **Freelancers & Independent Contractors**: Reviewing client MSAs, avoiding work-for-hire overreach and Net-60/90 payment terms.
* **Content Creators & Influencers**: Guarding against perpetual likeness rights, AI voice/face cloning, and strict exclusivity.
* **Small Business Owners & Startups**: Auditing commercial office/retail leases and vendor agreements.
* **Software Engineers & Remote Workers**: Auditing employment offers, moonlighting policies, and restrictive non-competes.

### 3. Traffic & Growth Flywheel
* **Programmatic SEO / Free Contract Templates**: Create free landing pages for "Free Freelance Contract Review", "Is my NDA safe?", "Commercial Lease Red Flags".
* **Affiliate Program**: Offer 30% recurring commission to creator hubs, freelance newsletters, and legal blogs.
* **TikTok / Twitter / LinkedIn Breakdown Clips**: Share breakdowns of actual bad contracts and how ClauseGuard AI saves thousands in legal disputes.

---

## 🚀 Quick Start (Local Setup)

### 1. Install Dependencies
Run from the root directory:
```bash
npm run install:all
```
*(Or install in `server/` and `client/` individually)*:
```bash
cd server && npm install
cd ../client && npm install
```

### 2. Environment Configuration
Create your `.env` in `server/.env` (or use `.env.example` as a template):
```env
PORT=5000
CLIENT_URL=http://localhost:5173

# Optional: Google Gemini API Key (https://aistudio.google.com/)
# If left blank, the app will run with high-precision Local Heuristic Intelligence!
GEMINI_API_KEY=

# Optional: Stripe Secret Key (https://dashboard.stripe.com/test/apikeys)
# If left blank, the app runs in interactive Instant Demo Simulation mode!
STRIPE_SECRET_KEY=
```

### 3. Launch Development Servers
From the root directory:
```bash
npm run dev
```
* **Frontend**: [http://localhost:5173](http://localhost:5173)
* **Backend API**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🛠️ Tech Stack & Architecture

* **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti, Printable PDF reports.
* **Backend**: Node.js, Express, Multer (Memory Storage), `pdf-parse`, `mammoth` (DOCX extraction).
* **AI & Intelligence Engine**: Google Gemini 2.5 Flash / Flash Lite with deterministic JSON schema validation + Local Heuristic Fallback Engine.
* **Monetization**: Stripe Checkout API + Credit Balance Manager + Simulated Instant Unlock.

---

## 🌐 Deploying to Production (5-Minute Launch)

1. **Frontend (Vercel / Netlify / Cloudflare Pages)**:
   * Build command: `npm run build`
   * Output directory: `dist`
   * Set Environment Variable: `VITE_API_URL=https://your-backend-api.com`

2. **Backend (Render / Railway / Fly.io)**:
   * Root directory: `server`
   * Start command: `node index.js`
   * Add environment variables: `PORT=5000`, `CLIENT_URL=https://your-frontend-domain.com`, `GEMINI_API_KEY`, `STRIPE_SECRET_KEY`.

---

## ⚖️ Legal Disclaimer
ClauseGuard AI provides analytical insights for informational and educational review only and does not constitute formal legal advice or create an attorney-client relationship.
