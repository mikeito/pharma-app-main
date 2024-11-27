import { NextRequest, NextResponse } from 'next/server';
import prisma from 'src/lib/prisma'; // adjust your path
import { z } from 'zod';

export async function PUT(req: NextRequest) {
    const id = req.nextUrl.pathname.split('/').pop(); // Extract the ID from the URL
  
    // Extract the updated reservation data from the request body
    const { quantity, date, code, drugIds } = await req.json();
  
    try {
      // Update the reservation with the new data
      const updatedReservation = await prisma.reservation.update({
        where: {
          id: String(id), // Ensure the id is treated as a string
        },
        data: {
          quantity,
          date: new Date(date), // Ensure the date is properly formatted
          code,
          drugs: {
            deleteMany: {}, // Optionally delete the existing drugs related to the reservation
            create: drugIds.map((drugId: number) => ({
              drug: { connect: { id: drugId } },
              assignedBy: 'admin', // Assign drugs (optional logic)
            })),
          },
        },
      });
  
      // Return the updated reservation data
      return NextResponse.json({
        data: updatedReservation,
        message: 'Reservation updated successfully',
      }, { status: 200 });
    } catch (error: any) {
      console.error(error);
      return NextResponse.json({
        message: `Error updating reservation: ${error.message}`,
      }, { status: 500 });
    }
  }
  
  // Update a reservation
// export async function PUT(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { id, ...updateData } = body;

//     const updatedReservation = await prisma.reservation.update({
//       where: { id },
//       data: updateData,
//     });

//     return NextResponse.json(updatedReservation, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to update reservation' }, { status: 400 });
//   }
// }


  export async function GET() {
    try {
      const reservations = await prisma.reservation.findMany();
      return NextResponse.json(reservations, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 });
    }
  }

  // Delete a reservation
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Reservation ID is required' }, { status: 400 });
    }

    await prisma.reservation.delete({ where: { id } });
    return NextResponse.json({ message: 'Reservation deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete reservation' }, { status: 500 });
  }
}