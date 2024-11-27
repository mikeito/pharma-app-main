import { NextRequest, NextResponse } from 'next/server';
import connectMongo from 'src/lib/mongodb'; 
import prisma from 'src/lib/prisma'; 

export async function GET() {
  try {
    await connectMongo();
    const drugs = await prisma.drug.findMany({
      include: {
        organisation: {
          include: {
            user: true,  },
        },
      },
    });
    return NextResponse.json({
      message: 'Drugs retrieved successfully',
      success:true,
      data: drugs,
    }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      message: `Error fetching drugs: ${error.message}`,
    }, { status: 500 });
  }
}

// Create a new drug
export async function POST(req: NextRequest) {
  try {
    // Ensure MongoDB is connected
    await connectMongo();

    // Parse the incoming request body
    const { name, description, quantity, price, organisationId, userId } = await req.json();

    // Ensure quantity and price are integers
    const quantityInt = parseInt(quantity, 10);
    const priceInt = parseInt(price, 10);

    // Check if the conversion was successful
    if (isNaN(quantityInt) || isNaN(priceInt)) {
      return NextResponse.json({
        message: 'Quantity and price must be valid numbers.',
      }, { status: 400 });
    }

    // Create the drug record
    const drug = await prisma.drug.create({
      data: {
        name,
        description,
        quantity: quantityInt,  // Use the parsed integer value
        price: priceInt,        // Use the parsed integer value
        organisation: {
          connect: { id: organisationId },  // Connect the drug to an existing organisation by ID
        },
        user: {
          connect: { id: userId },  // Connect the drug to an existing user by ID
        },
      },
    });

    return NextResponse.json({
      success:true,
      data: drug,
      message: 'Drug created successfully',
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({
      message: `Error creating drug: ${error.message}`,
    }, { status: 500 });
  }
}



