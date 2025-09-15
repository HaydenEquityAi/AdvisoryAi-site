import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/services/resend';

interface EmailResult {
  success: boolean;
  data?: unknown;
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, html, text, from } = body;

    // Validate required fields
    if (!to || !subject || !html) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: to, subject, html' 
        },
        { status: 400 }
      );
    }

    // Send email
    const result = await sendEmail({
      to,
      subject,
      html,
      text,
      from
    }) as EmailResult;

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Email sent successfully',
        data: result.data
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: result.error 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
