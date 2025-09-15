/**
 * Email Templates for AdvisoryAI
 * Centralized template system for consistent branding
 */

/**
 * Get the common header HTML for all emails
 * @returns {string} HTML header
 */
export function getEmailHeader() {
  return `
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">AdvisoryAI</h1>
      <p style="color: #e2e8f0; margin: 8px 0 0 0; font-size: 16px;">AI & Automation for Tulsa Businesses</p>
    </div>
  `;
}

/**
 * Get the common footer HTML for all emails
 * @returns {string} HTML footer
 */
export function getEmailFooter() {
  return `
    <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="color: #718096; margin: 0 0 10px 0; font-size: 14px;">
        © ${new Date().getFullYear()} AdvisoryAI. All rights reserved.
      </p>
      <p style="color: #a0aec0; margin: 0; font-size: 12px;">
        <a href="#" style="color: #a0aec0; text-decoration: underline;">Unsubscribe</a> | 
        <a href="#" style="color: #a0aec0; text-decoration: underline;">Privacy Policy</a>
      </p>
    </div>
  `;
}

/**
 * Get the common CTA button HTML
 * @param {string} href - Button link
 * @param {string} text - Button text
 * @returns {string} HTML button
 */
export function getCTAButton(href, text) {
  return `
    <div style="text-align: center; margin: 40px 0;">
      <a href="${href}" 
         style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
        ${text}
      </a>
    </div>
  `;
}

/**
 * Get the common content wrapper styles
 * @returns {string} CSS styles
 */
export function getContentStyles() {
  return `
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background-color: #f8fafc;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
      }
      .content {
        padding: 40px 30px;
      }
      .highlight-box {
        background-color: #f7fafc;
        border-left: 4px solid #667eea;
        padding: 20px;
        margin: 30px 0;
        border-radius: 0 8px 8px 0;
      }
      .feature-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin: 20px 0;
      }
      .feature-item {
        text-align: center;
      }
      .feature-icon {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin: 0 auto 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .feature-icon span {
        color: #ffffff;
        font-size: 20px;
      }
      .feature-title {
        color: #2d3748;
        margin: 0 0 8px 0;
        font-size: 16px;
        font-weight: 600;
      }
      .feature-desc {
        color: #718096;
        margin: 0;
        font-size: 14px;
      }
      @media (max-width: 600px) {
        .feature-grid {
          grid-template-columns: 1fr;
        }
        .content {
          padding: 30px 20px;
        }
      }
    </style>
  `;
}

/**
 * Generate contact confirmation email template
 * @param {Object} params - Contact data
 * @returns {Object} Email template with HTML and text
 */
export function generateContactConfirmationTemplate({ name, message, business }) {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/hayden-capitalaiadvisors';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for contacting AdvisoryAI</title>
      ${getContentStyles()}
    </head>
    <body>
      <div class="email-container">
        ${getEmailHeader()}
        
        <div class="content">
          <h2 style="color: #1a202c; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Thank you for reaching out!</h2>
          
          <p style="color: #4a5568; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
            Hi ${name},
          </p>
          
          <p style="color: #4a5568; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
            Thank you for contacting AdvisoryAI. We've received your message and will get back to you within 1 business day.
          </p>
          
          <div class="highlight-box">
            <h3 style="color: #2d3748; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">Your Message:</h3>
            <p style="color: #4a5568; margin: 0; font-size: 14px; line-height: 1.6; font-style: italic;">
              "${message}"
            </p>
            ${business ? `<p style="color: #718096; margin: 10px 0 0 0; font-size: 14px;"><strong>Business:</strong> ${business}</p>` : ''}
          </div>
          
          ${getCTAButton(calendlyUrl, 'Schedule Free Consultation')}
          
          <p style="color: #718096; margin: 30px 0 0 0; font-size: 14px; line-height: 1.6;">
            Best regards,<br>
            The AdvisoryAI Team
          </p>
        </div>
        
        ${getEmailFooter()}
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

Schedule a free consultation: ${calendlyUrl}

Best regards,
The AdvisoryAI Team

© ${new Date().getFullYear()} AdvisoryAI. All rights reserved.
  `;

  return { html, text };
}

/**
 * Generate newsletter welcome email template
 * @param {Object} params - Newsletter data
 * @returns {Object} Email template with HTML and text
 */
export function generateNewsletterWelcomeTemplate({ name }) {
  const displayName = name || 'there';
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/hayden-capitalaiadvisors';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to AdvisoryAI Newsletter</title>
      ${getContentStyles()}
    </head>
    <body>
      <div class="email-container">
        ${getEmailHeader()}
        
        <div class="content">
          <h2 style="color: #1a202c; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Welcome to our newsletter, ${displayName}!</h2>
          
          <p style="color: #4a5568; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
            You're now part of our community of Tulsa business owners who are unlocking growth with practical AI automation.
          </p>
          
          <div style="background-color: #f7fafc; border-radius: 12px; padding: 30px; margin: 30px 0;">
            <h3 style="color: #2d3748; margin: 0 0 20px 0; font-size: 20px; font-weight: 600; text-align: center;">What to expect:</h3>
            
            <div class="feature-grid">
              <div class="feature-item">
                <div class="feature-icon">
                  <span>🤖</span>
                </div>
                <h4 class="feature-title">AI Insights</h4>
                <p class="feature-desc">Latest automation strategies</p>
              </div>
              
              <div class="feature-item">
                <div class="feature-icon">
                  <span>📊</span>
                </div>
                <h4 class="feature-title">Case Studies</h4>
                <p class="feature-desc">Real Tulsa business results</p>
              </div>
              
              <div class="feature-item">
                <div class="feature-icon">
                  <span>⚡</span>
                </div>
                <h4 class="feature-title">Quick Tips</h4>
                <p class="feature-desc">Actionable automation advice</p>
              </div>
              
              <div class="feature-item">
                <div class="feature-icon">
                  <span>🎯</span>
                </div>
                <h4 class="feature-title">Early Access</h4>
                <p class="feature-desc">New tools and features first</p>
              </div>
            </div>
          </div>
          
          ${getCTAButton(calendlyUrl, 'Schedule Free Consultation')}
          
          <p style="color: #718096; margin: 30px 0 0 0; font-size: 14px; line-height: 1.6;">
            Ready to get started?<br>
            The AdvisoryAI Team
          </p>
        </div>
        
        ${getEmailFooter()}
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

Schedule a free consultation: ${calendlyUrl}

Ready to get started?
The AdvisoryAI Team

© ${new Date().getFullYear()} AdvisoryAI. All rights reserved.
  `;

  return { html, text };
}
