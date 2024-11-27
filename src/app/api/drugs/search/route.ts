import { NextRequest, NextResponse } from 'next/server';
import prisma from 'src/lib/prisma';



export async function GET(req: Request) {
  try {
    // Extract search term from the query parameters
    const { term } = Object.fromEntries(new URL(req.url).searchParams);

    // If no search term is provided, return an empty result instead of all drugs
    if (!term) {
      return NextResponse.json({
        message: 'No search term provided',
        success: false,
        data: [],
      });
    }

    // Fetch drugs that match the search term
    const drugs = await prisma.drug.findMany({
      where: {
        OR: [
          { name: { contains: term, mode: 'insensitive' } },
          { description: { contains: term, mode: 'insensitive' } },
        ],
      },
      include: {
        organisation: {
          include: {
            user: true,
          },
        },
      },
    });

    // Return the matching drugs
    return NextResponse.json({
      message: 'Drug(s) retrieved successfully',
      success: true,
      data: drugs,
    });
  } catch (error: any) {
    console.error('Error searching drugs:', error);

    // Return an error response
    return NextResponse.json(
      {
        message: `Error searching drugs: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

