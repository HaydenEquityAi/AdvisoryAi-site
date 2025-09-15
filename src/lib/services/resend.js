import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-build');

/**
 * Send a single email using Resend API
 * @param {Object} params - Email parameters
 * @param {string} params.to - Recipient email
 * @param {string} params.subject - Email subject
 * @param {string} params.html - HTML content
 * @param {string} params.text - Text content (optional)
 * @param {string} params.from - Sender email (optional, uses default)
 * @returns {Promise<Object>} Resend API response
 */
export async function sendEmail({ to, subject, html, text, from }) {
  try {
    // Check if API key is configured
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'dummy-key-for-build') {
      console.warn('Resend API key not configured, skipping email send');
      return {
        success: false,
        data: null,
        error: 'Email service not configured'
      };
    }

    const response = await resend.emails.send({
      from: from || process.env.RESEND_FROM || 'AdvisoryAi <no-reply@advisoryai.co>',
      to: [to],
      subject,
      html,
      text,
    });

    return {
      success: true,
      data: response.data,
      error: null
    };
  } catch (error) {
    console.error('Resend API error:', error);
    return {
      success: false,
      data: null,
      error: error.message || 'Failed to send email'
    };
  }
}

/**
 * Send contact form confirmation email
 * @param {Object} params - Contact form data
 * @param {string} params.name - Contact name
 * @param {string} params.email - Contact email
 * @param {string} params.message - Contact message
 * @param {string} params.business - Business name (optional)
 * @returns {Promise<Object>} Send result
 */
export async function sendContactConfirmation({ name, email, message, business }) {
  const subject = 'Thank you for contacting AdvisoryAI';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for contacting AdvisoryAI</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">AdvisoryAI</h1>
          <p style="color: #e2e8f0; margin: 8px 0 0 0; font-size: 16px;">AI & Automation for Tulsa Businesses</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #1a202c; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Thank you for reaching out!</h2>
          
          <p style="color: #4a5568; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
            Hi ${name},
          </p>
          
          <p style="color: #4a5568; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
            Thank you for contacting AdvisoryAI. We've received your message and will get back to you within 1 business day.
          </p>
          
          <div style="background-color: #f7fafc; border-left: 4px solid #667eea; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
            <h3 style="color: #2d3748; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">Your Message:</h3>
            <p style="color: #4a5568; margin: 0; font-size: 14px; line-height: 1.6; font-style: italic;">
              "${message}"
            </p>
            ${business ? `<p style="color: #718096; margin: 10px 0 0 0; font-size: 14px;"><strong>Business:</strong> ${business}</p>` : ''}
          </div>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="${process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/hayden-capitalaiadvisors'}" 
               style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
              Schedule Free Consultation
            </a>
          </div>
          
          <p style="color: #718096; margin: 30px 0 0 0; font-size: 14px; line-height: 1.6;">
            Best regards,<br>
            The AdvisoryAI Team
          </p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="color: #718096; margin: 0; font-size: 14px;">
            © ${new Date().getFullYear()} AdvisoryAI. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Thank you for contacting AdvisoryAI!

Hi ${name},

Thank you for contacting AdvisoryAI. We've received your message and will get back to you within 1 business day.

Your Message:
"${message}"
${business ? `Business: ${business}` : ''}

Schedule a free consultation: ${process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/hayden-capitalaiadvisors'}

Best regards,
The AdvisoryAI Team

© ${new Date().getFullYear()} AdvisoryAI. All rights reserved.
  `;

  return await sendEmail({
    to: email,
    subject,
    html,
    text
  });
}

/**
 * Send newsletter welcome email
 * @param {Object} params - Newsletter signup data
 * @param {string} params.name - Subscriber name (optional)
 * @param {string} params.email - Subscriber email
 * @returns {Promise<Object>} Send result
 */
export async function sendNewsletterWelcome({ name, email }) {
  const subject = 'Welcome to AdvisoryAI Newsletter!';
  const displayName = name || 'there';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to AdvisoryAI Newsletter</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">AdvisoryAI</h1>
          <p style="color: #e2e8f0; margin: 8px 0 0 0; font-size: 16px;">AI & Automation for Tulsa Businesses</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #1a202c; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Welcome to our newsletter, ${displayName}!</h2>
          
          <p style="color: #4a5568; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
            You're now part of our community of Tulsa business owners who are unlocking growth with practical AI automation.
          </p>
          
          <div style="background-color: #f7fafc; border-radius: 12px; padding: 30px; margin: 30px 0;">
            <h3 style="color: #2d3748; margin: 0 0 20px 0; font-size: 20px; font-weight: 600; text-align: center;">What to expect:</h3>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
              <div style="text-align: center;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); width: 50px; height: 50px; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: #ffffff; font-size: 20px;">🤖</span>
                </div>
                <h4 style="color: #2d3748; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">AI Insights</h4>
                <p style="color: #718096; margin: 0; font-size: 14px;">Latest automation strategies</p>
              </div>
              
              <div style="text-align: center;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); width: 50px; height: 50px; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: #ffffff; font-size: 20px;">📊</span>
                </div>
                <h4 style="color: #2d3748; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Case Studies</h4>
                <p style="color: #718096; margin: 0; font-size: 14px;">Real Tulsa business results</p>
              </div>
              
              <div style="text-align: center;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); width: 50px; height: 50px; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: #ffffff; font-size: 20px;">⚡</span>
                </div>
                <h4 style="color: #2d3748; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Quick Tips</h4>
                <p style="color: #718096; margin: 0; font-size: 14px;">Actionable automation advice</p>
              </div>
              
              <div style="text-align: center;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); width: 50px; height: 50px; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: #ffffff; font-size: 20px;">🎯</span>
                </div>
                <h4 style="color: #2d3748; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Early Access</h4>
                <p style="color: #718096; margin: 0; font-size: 14px;">New tools and features first</p>
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="${process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/hayden-capitalaiadvisors'}" 
               style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
              Schedule Free Consultation
            </a>
          </div>
          
          <p style="color: #718096; margin: 30px 0 0 0; font-size: 14px; line-height: 1.6;">
            Ready to get started?<br>
            The AdvisoryAI Team
          </p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="color: #718096; margin: 0 0 10px 0; font-size: 14px;">
            © ${new Date().getFullYear()} AdvisoryAI. All rights reserved.
          </p>
          <p style="color: #a0aec0; margin: 0; font-size: 12px;">
            <a href="#" style="color: #a0aec0; text-decoration: underline;">Unsubscribe</a> | 
            <a href="#" style="color: #a0aec0; text-decoration: underline;">Privacy Policy</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Welcome to AdvisoryAI Newsletter!

Hi ${displayName},

You're now part of our community of Tulsa business owners who are unlocking growth with practical AI automation.

What to expect:
🤖 AI Insights - Latest automation strategies
📊 Case Studies - Real Tulsa business results  
⚡ Quick Tips - Actionable automation advice
🎯 Early Access - New tools and features first

Schedule a free consultation: ${process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/hayden-capitalaiadvisors'}

Ready to get started?
The AdvisoryAI Team

© ${new Date().getFullYear()} AdvisoryAI. All rights reserved.
  `;

  return await sendEmail({
    to: email,
    subject,
    html,
    text
  });
}
