import Stripe from 'stripe';

/**
 * Stripe checkout session handler
 */
export async function createCheckoutSession({ planId, clientUrl }) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const baseUrl = clientUrl || process.env.CLIENT_URL || 'http://localhost:5173';

  // Plan pricing lookup
  const plans = {
    'single-scan': {
      name: 'ClauseGuard AI - Single Document Audit Pass',
      price: 499, // $4.99 in cents
      type: 'one_time',
      credits: 1
    },
    'monthly-pro': {
      name: 'ClauseGuard AI - Unlimited Pro Plan (Monthly)',
      price: 1900, // $19.00 in cents
      type: 'recurring',
      credits: 9999
    },
    'annual-pro': {
      name: 'ClauseGuard AI - Unlimited Pro Plan (Annual - 40% Off)',
      price: 14900, // $149.00 in cents
      type: 'recurring',
      credits: 9999
    }
  };

  const selectedPlan = plans[planId] || plans['single-scan'];

  // If no Stripe API key is set, return a demo checkout URL that redirects to success
  if (!secretKey || secretKey.trim() === '' || secretKey.startsWith('sk_test_placeholder')) {
    console.log('[Stripe Service] Running in Mock/Test Simulation Mode.');
    const demoToken = 'demo_' + Math.random().toString(36).substring(2, 12);
    return {
      isDemo: true,
      url: `${baseUrl}?payment_success=true&session_id=${demoToken}&plan=${planId}`,
      plan: selectedPlan
    };
  }

  try {
    const stripe = new Stripe(secretKey, {
      apiVersion: '2024-06-20',
      timeout: 20000,
      maxNetworkRetries: 2,
    });

    const isRecurring = selectedPlan.type === 'recurring';

    const lineItems = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: selectedPlan.name,
            description: 'Instant AI contract risk scoring, plain-English translation & counter-clause generator.'
          },
          unit_amount: selectedPlan.price,
          ...(isRecurring ? { recurring: { interval: planId === 'annual-pro' ? 'year' : 'month' } } : {})
        },
        quantity: 1
      }
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: isRecurring ? 'subscription' : 'payment',
      success_url: `${baseUrl}?payment_success=true&session_id={CHECKOUT_SESSION_ID}&plan=${planId}`,
      cancel_url: `${baseUrl}?payment_cancelled=true`,
      metadata: {
        planId,
        credits: String(selectedPlan.credits)
      }
    });

    return {
      isDemo: false,
      url: session.url,
      sessionId: session.id
    };
  } catch (error) {
    console.error('[Stripe Service] Error creating Stripe session:', error.message);
    // If network/SSL block on local machine, fall back to safe demo simulation with notice
    const demoToken = 'demo_' + Math.random().toString(36).substring(2, 12);
    return {
      isDemo: true,
      fallbackError: error.message,
      url: `${baseUrl}?payment_success=true&session_id=${demoToken}&plan=${planId}`,
      plan: selectedPlan
    };
  }
}
