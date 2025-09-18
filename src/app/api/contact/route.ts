import { NextRequest, NextResponse } from 'next/server';
import { triggerContactWorkflow, triggerContactWithNewsletterWorkflow } from '@/lib/services/n8n';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, business, message, subscribeNewsletter } = body || {};

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, email, message' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Prepare payload
    const contactData = {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      business: business ? String(business).trim() : '',
      message: String(message).trim(),
      subscribeNewsletter: Boolean(subscribeNewsletter),
    };

    // Trigger n8n workflow
    const n8nResult = contactData.subscribeNewsletter
      ? await triggerContactWithNewsletterWorkflow(contactData)
      : await triggerContactWorkflow(contactData);

    if (!n8nResult || !(n8nResult as { success?: boolean; error?: string }).success) {
      console.error('n8n workflow failed:', (n8nResult as { success?: boolean; error?: string })?.error);
      return NextResponse.json(
        { success: false, error: 'We encountered an issue processing your message. Please try again.' },
        { status: 502 }
      );
    }

    // Success response
    return NextResponse.json({
      success: true,
      message: "Thanks! We've received your message and will get back to you within 1 business day.",
      data: {
        workflowTriggered: true,
        newsletterSubscribed: contactData.subscribeNewsletter,
      },
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}