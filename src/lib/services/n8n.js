/**
 * n8n Webhook Service
 * Handles communication with n8n workflows via webhooks
 */

const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL || 'https://n8n.capitalaiadvisors.com/webhook/advisoryai';

/**
 * Send data to n8n webhook with retry logic
 * @param {Object} data - Data to send to n8n
 * @param {number} retries - Number of retry attempts (default: 2)
 * @returns {Promise<Object>} Result object
 */
async function sendToWebhook(data, retries = 2) {
  if (!WEBHOOK_URL) {
    console.warn('N8N_WEBHOOK_URL not configured');
    return {
      success: false,
      error: 'Webhook URL not configured'
    };
  }

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        return {
          success: true,
          data: await response.json().catch(() => ({ status: 'success' })),
          error: null
        };
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`n8n webhook attempt ${attempt + 1} failed:`, error.message);
      
      if (attempt === retries) {
        return {
          success: false,
          data: null,
          error: error.message
        };
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
}

/**
 * Trigger contact form workflow in n8n
 * @param {Object} params - Contact form data
 * @param {string} params.name - Contact name
 * @param {string} params.email - Contact email
 * @param {string} params.message - Contact message
 * @param {string} params.business - Business name (optional)
 * @param {boolean} params.subscribeNewsletter - Whether user opted into newsletter
 * @returns {Promise<Object>} Result object
 */
export async function triggerContactWorkflow({ name, email, message, business, subscribeNewsletter }) {
  const data = {
    type: 'contact_form',
    source: 'advisoryai_website',
    timestamp: new Date().toISOString(),
    data: {
      name,
      email,
      message,
      business: business || null,
      subscribeNewsletter: subscribeNewsletter || false,
      source: 'contact_form'
    }
  };

  return await sendToWebhook(data);
}

/**
 * Trigger newsletter signup workflow in n8n
 * @param {Object} params - Newsletter signup data
 * @param {string} params.name - Subscriber name (optional)
 * @param {string} params.email - Subscriber email
 * @param {string} params.source - Source of signup (newsletter_signup, contact_form, footer)
 * @returns {Promise<Object>} Result object
 */
export async function triggerNewsletterWorkflow({ name, email, source }) {
  const data = {
    type: 'newsletter_signup',
    source: 'advisoryai_website',
    timestamp: new Date().toISOString(),
    data: {
      name: name || null,
      email,
      source: source || 'newsletter_signup'
    }
  };

  return await sendToWebhook(data);
}

/**
 * Trigger combined contact + newsletter workflow
 * @param {Object} params - Combined data
 * @param {string} params.name - Contact name
 * @param {string} params.email - Contact email
 * @param {string} params.message - Contact message
 * @param {string} params.business - Business name (optional)
 * @returns {Promise<Object>} Result object
 */
export async function triggerContactWithNewsletterWorkflow({ name, email, message, business }) {
  const data = {
    type: 'contact_with_newsletter',
    source: 'advisoryai_website',
    timestamp: new Date().toISOString(),
    data: {
      name,
      email,
      message,
      business: business || null,
      subscribeNewsletter: true,
      source: 'contact_form'
    }
  };

  return await sendToWebhook(data);
}

/**
 * Send test data to n8n webhook for testing
 * @returns {Promise<Object>} Result object
 */
export async function testWebhookConnection() {
  const testData = {
    type: 'test',
    source: 'advisoryai_website',
    timestamp: new Date().toISOString(),
    data: {
      message: 'Test connection from AdvisoryAI website',
      test: true
    }
  };

  return await sendToWebhook(testData);
}
