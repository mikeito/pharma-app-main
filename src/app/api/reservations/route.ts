import { NextRequest, NextResponse } from 'next/server';
import connectMongo from 'src/lib/mongodb';
import prisma from 'src/lib/prisma';

// GET: Fetch all reservations
export async function GET(req: NextRequest) {
  await connectMongo();

  try {
    // Fetch reservations with associated drug details
    const reservations = await prisma.reservation.findMany({
      include: {
        drugs: {
          include: {
            drug: true, // Include drug details
          },
        },
      },
    });

    // Return the fetched reservations data
    return NextResponse.json({
      data: reservations,
      message: 'Reservations retrieved successfully',
    }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      message: `Error retrieving reservations: ${error.message}`,
    }, { status: 500 });
  }
}

// POST: Create a new reservation
export async function POST(req: NextRequest) {
  await connectMongo();

  // Extract the reservation data from the request body
  const { quantity, date, code, drugIds } = await req.json();

  try {
    // Create a new reservation with associated drugs
    const reservation = await prisma.reservation.create({
      data: {
        quantity,
        date: new Date(date), // Ensure the date is properly formatted
        code,
        drugs: {
          create: drugIds.map((drugId: number) => ({
            drug: { connect: { id: drugId } }, // Associate each drug by ID
            assignedBy: 'admin', // Example of how drugs can be assigned
          })),
        },
      },
    });

    // Return the created reservation data
    return NextResponse.json({
      data: reservation,
      message: 'Reservation created successfully',
    }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      message: `Error creating reservation: ${error.message}`,
    }, { status: 500 });
  }
}

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const newReservation = await prisma.reservation.create({ data: body });
//     return NextResponse.json(newReservation, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to create reservation' }, { status: 400 });
//   }
// }