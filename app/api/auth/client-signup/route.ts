import { NextRequest, NextResponse } from 'next/server';

interface ClientSignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  countryCode: string;
  phone: string;
  industry: string;
  projectDescription: string;
  budget: string;
  timeline: string;
  agreeToTerms: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body: ClientSignupRequest = await request.json();

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.companyName || 
        !body.phone || !body.industry || !body.projectDescription || !body.budget || !body.timeline) {
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

    // TODO: Save to database
    // For now, we'll just log it
    console.log('Client signup:', {
      name: `${body.firstName} ${body.lastName}`,
      email: body.email,
      company: body.companyName,
      industry: body.industry,
      budget: body.budget,
      timeline: body.timeline,
    });

    return NextResponse.json({
      success: true,
      message: 'Client signup successful',
      data: {
        name: `${body.firstName} ${body.lastName}`,
        email: body.email,
      },
    });
  } catch (error) {
    console.error('Client signup error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to sign up',
      },
      { status: 500 }
    );
  }
}
