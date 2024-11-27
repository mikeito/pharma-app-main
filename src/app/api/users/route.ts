import { NextRequest, NextResponse } from 'next/server';
import prisma from 'src/lib/prisma'; // adjust your path
import bcrypt from 'bcrypt';
import connectMongo from 'src/lib/mongodb';
import { z } from 'zod';

// Define your schema
const createUserSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  passwordHash: z.string().min(8, 'Password must be at least 8 characters'),
  phoneNumber: z.string().optional(),
  avatarUrl: z.string().url('Invalid URL').optional(),
  displayName: z.string().optional(),
  bio: z.string().optional(),
  googleId: z.string().optional(),
});


// export async function POST(req: NextRequest) {
//   await connectMongo();
//   const data = await req.json();
//   const parsed = createUserSchema.parse(data);
//   const passwordHashed = await bcrypt.hash(parsed.passwordHash, 10);

//   try {
//     const existingUsername = await prisma.user.findFirst({
//       where: {
//         username: {
//           equals: parsed.username,
//           mode: 'insensitive',
//         },
//       },
//     });
//     if (existingUsername) {
//       return NextResponse.json(
//         { error: 'User already exists' },
//         { status: 409 }
//       );
//     }

//     const existingEmail = await prisma.user.findFirst({
//       where: {
//         email: {
//           equals: parsed.email,
//           mode: 'insensitive',
//         },
//       },
//     });

//     if (existingEmail) {
//       return NextResponse.json(
//         { error: 'User already exists' },
//         { status: 409 }
//       );
//     }

//     const newUser = await prisma.user.create({
//       data: {
//         ...data,
//         passwordHash: passwordHashed,
//       },
//     });

//     return NextResponse.json(
//       { newUser, message: 'User created successfully' },
//       { status: 201 }
//     );
//   } catch (error: any) {
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }

export async function POST(req: NextRequest) {
  await connectMongo();

  try {
    const body = await req.json();
    const newUser = await prisma.user.create({ data: body });
    return NextResponse.json({
      success:true,
      data: newUser,
      message: 'User created successfully',
    }, { status: 201 });  } catch (error:any) {
    return NextResponse.json({ error: 'Failed to create user',message:error.message }, { status: 400 });
  }
}


export async function GET(req: NextRequest) {
  await connectMongo();

  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ message: 'Users retrieved successfully', success:true,
      data:users
    },
    { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: `Error getting users: ${error.message}` },
      { status: 500 }
    );
  }
}
