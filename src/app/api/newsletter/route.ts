import { NextRequest, NextResponse } from 'next/server';
import { sendNewsletterWelcome } from '@/lib/services/resend';
import { triggerNewsletterWorkflow } from '@/lib/services/n8n';

interface ServiceResult {
  success: boolean;
  data?: unknown;
  error?: string;
}

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

    // Prepare data for parallel processing
    const newsletterData = {
      name: name?.trim() || null,
      email: email.trim().toLowerCase(),
      source: source || 'newsletter_signup'
    };

    // Execute email and n8n workflows in parallel
    const [emailResult, n8nResult] = await Promise.allSettled([
      // Send welcome email
      sendNewsletterWelcome(newsletterData),
      // Trigger n8n workflow
      triggerNewsletterWorkflow(newsletterData)
    ]);

    // Check results
    const emailSuccess = emailResult.status === 'fulfilled' && (emailResult.value as ServiceResult).success;
    const n8nSuccess = n8nResult.status === 'fulfilled' && (n8nResult.value as ServiceResult).success;

    // Log any errors for debugging
    if (!emailSuccess) {
      console.error('Newsletter email sending failed:', emailResult.status === 'rejected' ? emailResult.reason : (emailResult.value as ServiceResult).error);
    }
    if (!n8nSuccess) {
      console.error('Newsletter n8n workflow failed:', n8nResult.status === 'rejected' ? n8nResult.reason : (n8nResult.value as ServiceResult).error);
    }

    // Determine response based on results
    if (emailSuccess && n8nSuccess) {
      return NextResponse.json({
        success: true,
        message: 'Welcome to our newsletter! Check your email for a welcome message and exclusive content.',
        data: {
          emailSent: true,
          workflowTriggered: true,
          source: newsletterData.source
        }
      });
    } else if (emailSuccess) {
      // Email sent but n8n failed
      return NextResponse.json({
        success: true,
        message: 'Welcome to our newsletter! Check your email for a welcome message.',
        data: {
          emailSent: true,
          workflowTriggered: false,
          source: newsletterData.source
        }
      });
    } else if (n8nSuccess) {
      // n8n succeeded but email failed
      return NextResponse.json({
        success: true,
        message: 'You\'ve been subscribed to our newsletter! We\'ll keep you updated with the latest AI insights.',
        data: {
          emailSent: false,
          workflowTriggered: true,
          source: newsletterData.source
        }
      });
    } else {
      // Both failed
      return NextResponse.json(
        { 
          success: false, 
          error: 'We encountered an issue subscribing you to our newsletter. Please try again.' 
        },
        { status: 500 }
      );
    }
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
