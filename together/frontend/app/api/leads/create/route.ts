import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      customerName,
      phone,
      whatsapp,
      city,
      interestedProduct,
      quantity,
      requirementDate,
      notes,
      leadSource,
      leadStatus,
    } = body;

    // Validation
    if (!customerName || !phone) {
      return NextResponse.json(
        { error: 'Customer name and phone are required' },
        { status: 400 }
      );
    }

    // In a real app, save to database
    // const lead = await db.leads.create({
    //   customerName,
    //   phone,
    //   whatsapp,
    //   city,
    //   interestedProduct,
    //   quantity,
    //   requirementDate,
    //   notes,
    //   leadSource,
    //   leadStatus,
    //   createdAt: new Date(),
    // });

    const newLead = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      customerName,
      phone,
      whatsapp,
      city,
      interestedProduct,
      quantity,
      requirementDate,
      notes,
      leadSource,
      leadStatus,
      createdAt: new Date().toISOString(),
    };

    // Log the lead (in production, save to database)
    console.log('New lead created:', newLead);

    return NextResponse.json(
      {
        success: true,
        message: 'Lead created successfully',
        leadId: newLead.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}
