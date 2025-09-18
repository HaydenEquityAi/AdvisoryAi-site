import { NextRequest, NextResponse } from 'next/server';
import { triggerNewsletterWorkflow } from '@/lib/services/n8n';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, source } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email is required' 
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email format' 
        },
        { status: 400 }
      );
    }

    // Prepare data for n8n workflow
    const newsletterData = {
      name: name?.trim() || null,
      email: email.trim().toLowerCase(),
      source: source || 'newsletter_signup'
    };

    // Trigger n8n workflow
    const n8nResult = await triggerNewsletterWorkflow(newsletterData);

    if (!n8nResult || !(n8nResult as { success?: boolean; error?: string }).success) {
      console.error('Newsletter n8n workflow failed:', (n8nResult as { success?: boolean; error?: string })?.error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'We encountered an issue subscribing you to our newsletter. Please try again.' 
        },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json({
      success: true,
      message: 'Welcome to our newsletter! We\'ll keep you updated with the latest AI insights.',
      data: {
        workflowTriggered: true,
        source: newsletterData.source
      }
    });
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
