import { NextRequest, NextResponse } from 'next/server';
import prisma from 'src/lib/prisma'; // adjust your path
import { z } from 'zod';


// Schema for validation of the update request body (optional)
const updateUserSchema = z.object({
  username: z.string().min(3).optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  displayName: z.string().optional(),
  bio: z.string().optional(),
});

// Handle PUT request for updating a user by ID
export async function PUT(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop(); // Extract the ID from the URL
  const body = await req.json();
  console

  if (!id) {
    return NextResponse.json(
      { message: 'ID is required' },
      { status: 400 }
    );
  }

  // Parse the request body (assumes the body is JSON)
  const data = await req.json();

  try {
    // Validate the data using zod (optional but recommended)
    const parsedData = updateUserSchema.parse(data);

    // Attempt to update the user in the database
    const updatedUser = await prisma.user.update({
      where: { id: String(id) }, // Ensure the ID is in the correct format
      data: parsedData, // Pass the validated data
    });

    if (!updatedUser) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        { user: updatedUser, message: 'User updated successfully' },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: `Error updating user: ${error.message}` },
      { status: 500 }
    );
  }
}

// export async function PUT(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { id, ...updateData } = body;

//     const updatedUser = await prisma.user.update({
//       where: { id },
//       data: updateData,
//     });

//     return NextResponse.json(updatedUser, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to update user' }, { status: 400 });
//   }
// }


// Handle PATCH request for partial update (optional, depending on your use case)
export async function PATCH(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop(); // Extract the ID from the URL

  if (!id) {
    return NextResponse.json(
      { message: 'ID is required' },
      { status: 400 }
    );
  }

  const data = await req.json();

  try {
    // Validate the data using zod (optional)
    const parsedData = updateUserSchema.parse(data);

    const updatedUser = await prisma.user.update({
      where: { id: String(id) },
      data: parsedData,
    });

    if (!updatedUser) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        { user: updatedUser, message: 'User updated successfully' },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: `Error updating user: ${error.message}` },
      { status: 500 }
    );
  }
}

// Handle GET request
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id'); // Use get() to retrieve the query parameter

  if (!id) {
    return NextResponse.json(
      { message: 'ID is required' },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: String(id) }, // Ensure the id is in the correct format
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        { user, message: 'User returned successfully' },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: `Error getting user: ${error.message}` },
      { status: 500 }
    );
  }
}

// Delete a user
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}