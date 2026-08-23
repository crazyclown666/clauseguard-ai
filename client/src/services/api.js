const API_BASE = '/api';

/**
 * Analyzes raw pasted contract text
 */
export async function analyzeContractText(text, documentTitle = 'Custom Pasted Agreement') {
  const response = await fetch(`${API_BASE}/analyze/text`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, documentTitle }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Server responded with status ${response.status}`);
  }

  const result = await response.json();
  return result.data;
}

/**
 * Analyzes uploaded file (PDF, DOCX, TXT)
 */
export async function analyzeContractFile(file) {
  const formData = new FormData();
  formData.append('document', file);

  const response = await fetch(`${API_BASE}/analyze/file`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Server responded with status ${response.status}`);
  }

  const result = await response.json();
  return result.data;
}

/**
 * Fetches sample contracts from server
 */
export async function getSampleContracts() {
  try {
    const response = await fetch(`${API_BASE}/samples`);
    if (!response.ok) throw new Error('Failed to fetch samples');
    const result = await response.json();
    return result.data;
  } catch (err) {
    console.warn('Using client-side fallback sample contracts.');
    return null;
  }
}

/**
 * Initiates Stripe checkout session
 */
export async function createCheckout(planId) {
  const response = await fetch(`${API_BASE}/checkout/create-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      planId,
      clientUrl: window.location.origin
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || 'Failed to initialize payment.');
  }

  return await response.json();
}

/**
 * Local Credit / Subscription State Management
 */
export function getUserCredits() {
  const saved = localStorage.getItem('clauseguard_credits');
  if (saved !== null) {
    return parseInt(saved, 10);
  }
  // Default 1 free scan for new users
  localStorage.setItem('clauseguard_credits', '1');
  return 1;
}

export function isProUser() {
  return localStorage.getItem('clauseguard_is_pro') === 'true';
}

export function decrementCredits() {
  if (isProUser()) return 9999;
  const current = getUserCredits();
  const next = Math.max(0, current - 1);
  localStorage.setItem('clauseguard_credits', next.toString());
  return next;
}

export function activateProPlan() {
  localStorage.setItem('clauseguard_is_pro', 'true');
  localStorage.setItem('clauseguard_credits', '9999');
}

export function addCredits(amount = 1) {
  const current = getUserCredits();
  const next = current + amount;
  localStorage.setItem('clauseguard_credits', next.toString());
  return next;
}
