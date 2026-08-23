import express from 'express';
import { createCheckoutSession } from '../services/stripe.js';

const router = express.Router();

// Create checkout session
router.post('/create-session', async (req, res) => {
  try {
    const { planId, clientUrl } = req.body;
    const session = await createCheckoutSession({ planId, clientUrl });

    return res.json({
      success: true,
      url: session.url,
      isDemo: session.isDemo,
      sessionId: session.sessionId
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return res.status(500).json({
      error: 'Failed to initialize payment gateway checkout.',
      details: error.message
    });
  }
});

// Verify session status or simulate token redemption
router.get('/verify-session', (req, res) => {
  const { sessionId } = req.query;
  if (!sessionId) {
    return res.status(400).json({ error: 'Missing session ID.' });
  }

  return res.json({
    success: true,
    active: true,
    creditsRemaining: 9999,
    plan: 'Pro Plan'
  });
});

export default router;
