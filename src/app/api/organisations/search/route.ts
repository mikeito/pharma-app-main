import { NextRequest, NextResponse } from 'next/server';
import prisma from 'src/lib/prisma';

export async function GET(req: Request) {
  try {
    const { search, type, email } = Object.fromEntries(new URL(req.url).searchParams);

    const organisations = await prisma.organisation.findMany({
      where: {
        AND: [
          search
            ? {
                OR: [
                  { name: { contains: search, mode: 'insensitive' } },
                  { address: { contains: search, mode: 'insensitive' } },
                  { description: { contains: search, mode: 'insensitive' } },
                ],
              }
            : {},
          type ? { type: { equals: type, mode: 'insensitive' } } : {},
          email ? { email: { equals: email, mode: 'insensitive' } } : {},
        ],
      },
      include: {
        user: true, 
      },
    });

    return NextResponse.json({
      message: 'Organisations retrieved successfully',
      success: true,
      data: organisations,
    });
  } catch (error: any) {
    console.error('Error searching organisations:', error);
    return NextResponse.json(
      {
        message: `Error searching organisations: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  const { type, term } = await req.json();
  console.log("here api")
  try {
    const results = await prisma.organisation.findMany({
      where: {
        type: type,
        address: {
          contains: term, // Adjust based on your search requirements
        }
      }
    });

    return NextResponse.json({
      data: results,
      message: 'Organisation(s) found successfully',
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
// POST: Search for organisations based on type and address
// export async function POST(req: NextRequest) {
//   try {
//     // Extract search parameters from the request body
//     const { type, term } = await req.json();

//     // Perform search in the database using the provided type and address term
//     const results = await prisma.organisation.findMany({
//       where: {
//         type,  // Match organisation type
//         address: {
//           contains: term,  // Search address for the term (case-insensitive by default)
//           mode: 'insensitive',  // Optional: Make the search case-insensitive
//         },
//       },
//     });

//     // Return the search results
//     return NextResponse.json({
//       data: results,
//       message: 'Organisations found successfully',
//     }, { status: 200 });
//   } catch (error: any) {
//     // Handle errors during the search operation
//     console.error(error);
//     return NextResponse.json({
//       message: `Error searching organisations: ${error.message}`,
//     }, { status: 500 });
//   }
// }


// export async function GET(req: NextRequest) {
//   try {
//     const name = req.nextUrl.searchParams.get('name') || '';
//     const type = req.nextUrl.searchParams.get('type') || '';
//     const email = req.nextUrl.searchParams.get('email') || '';

//     const organisations = await prisma.organisation.findMany({
//       where: {
//         AND: [
//           { name: { contains: name, mode: 'insensitive' } },
//           { type: { contains: type, mode: 'insensitive' } },
//           { email: { contains: email, mode: 'insensitive' } },
//         ],
//       },
//     });

//     return NextResponse.json(organisations, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to search organisations' }, { status: 500 });
//   }
// }
