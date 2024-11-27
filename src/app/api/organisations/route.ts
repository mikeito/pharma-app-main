import { NextRequest, NextResponse } from 'next/server';
import prisma from 'src/lib/prisma';

// GET: Fetch all organisations
export async function GET() {
  try {
    // Fetch all organisations from the database
    const organisations = await prisma.organisation.findMany({
      include: {
        user: true,  // This will fetch the related user details for each organisation
      },
    });    
    // Return the fetched data
    return NextResponse.json({
      message: 'Organisations retrieved successfully',
      success:true,
      data: organisations,
    }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      message: `Error retrieving organisations: ${error.message}`,
    }, { status: 500 });
  }
}

// POST: Create a new organisation
export async function POST(req: NextRequest) {
  try {
    // Extract organisation details from the request body
 
    const body = await req.json();
    const newOrganisation = await prisma.organisation.create({ data: body });


    // Return the newly created organisation data
    return NextResponse.json(
      {
        success: true,
        data: newOrganisation,
        message: 'Organisation created successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: `Error creating organisation: ${error.message}`,
      },
      { status: 500 }
    );
  }
}


// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const newOrganisation = await prisma.organisation.create({ data: body });
//     return NextResponse.json(newOrganisation, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to create organisation' }, { status: 400 });
//   }
// }