import { NextRequest, NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/mailer';

interface DeveloperSignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  experienceLevel: string;
  availability: string;
  selectedTechStacks: string[];
  portfolio?: string;
  bio: string;
  agreeToTerms: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body: DeveloperSignupRequest = await request.json();

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.phone || 
        !body.experienceLevel || !body.availability || body.selectedTechStacks.length === 0 || !body.bio) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!body.agreeToTerms) {
      return NextResponse.json(
        { error: 'You must agree to the terms' },
        { status: 400 }
      );
    }

    // Send welcome email to developer
    await sendWelcomeEmail({
      name: `${body.firstName} ${body.lastName}`,
      email: body.email,
    });

    // TODO: Save to database
    // For now, we'll just log it
    console.log('Developer signup:', {
      name: `${body.firstName} ${body.lastName}`,
      email: body.email,
      experience: body.experienceLevel,
      availability: body.availability,
      techStacks: body.selectedTechStacks,
      portfolio: body.portfolio,
    });

    return NextResponse.json({
      success: true,
      message: 'Developer signup successful',
      data: {
        name: `${body.firstName} ${body.lastName}`,
        email: body.email,
        techStacks: body.selectedTechStacks,
      },
    });
  } catch (error) {
    console.error('Developer signup error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to sign up',
      },
      { status: 500 }
    );
  }
}
