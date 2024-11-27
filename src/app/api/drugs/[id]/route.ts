import { NextRequest, NextResponse } from 'next/server';
import prisma from 'src/lib/prisma';

// GET: Retrieve a drug by its ID
export async function GET(req: NextRequest) {
    const id = req.nextUrl.pathname.split('/').pop(); // Extract the ID from the URL

  try {
    // Retrieve the drug by its ID
    const drug = await prisma.drug.findUnique({
      where: {
        id: String(id),  // Ensure the id is treated as a string
      },
    });

    // If the drug is not found
    if (!drug) {
      return NextResponse.json({
        message: 'Drug not found',
      }, { status: 404 });
    }

    // Return the drug details if found
    return NextResponse.json({
      data: drug,
      message: 'Drug retrieved successfully',
    }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      message: `Error retrieving drug: ${error.message}`,
    }, { status: 500 });
  }
}

// PUT: Update a drug by its ID
export async function PUT(req: NextRequest) {
    const id = req.nextUrl.pathname.split('/').pop(); // Extract the ID from the URL

  // Get the updated data from the request body
  const { name, description, quantity, price, organisationId, userId } = await req.json();

  try {
    // Find the drug by ID and update it with the new data
    const updatedDrug = await prisma.drug.update({
      where: {
        id: String(id),  // Ensure the id is treated as a string
      },
      data: {
        name,
        description,
        quantity,
        price,
        organisation: { connect: { id: organisationId } },
        user: { connect: { id: userId } },
      },
    });

    // Return the updated drug data
    return NextResponse.json({
      data: updatedDrug,
      message: 'Drug updated successfully',
    }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      message: `Error updating drug: ${error.message}`,
    }, { status: 500 });
  }
}

// export async function PUT(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { id, ...updateData } = body;

//     const updatedDrug = await prisma.drug.update({
//       where: { id },
//       data: updateData,
//     });

//     return NextResponse.json(updatedDrug, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to update drug' }, { status: 400 });
//   }
// }

// Delete a drug
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Drug ID is required' }, { status: 400 });
    }

    await prisma.drug.delete({ where: { id } });
    return NextResponse.json({ message: 'Drug deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete drug' }, { status: 500 });
  }
}