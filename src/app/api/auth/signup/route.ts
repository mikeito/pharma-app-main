// import prisma from 'src/lib/prisma';
// import bcrypt from 'bcrypt'
// import { NextRequest, NextResponse } from 'next/server';
// import { generateIdFromEntropySize } from 'lucia';
// import connectMongo from 'src/lib/mongodb';
// import { hashPassword } from 'src/lib/hash';


// export async function POST(req: NextRequest) {
//   await connectMongo();
//   const { username, email, password, phoneNumber } = await req.json();

//   const userId = generateIdFromEntropySize(10);
//   const passwordHash = await bcrypt.hash(password, 10);

//   try {
//     const existingUsername = await prisma.user.findFirst({
//         where: {
//           username: {
//             equals: username,
//             mode: "insensitive",
//           },
//         },
//       });
//       if (existingUsername) {
//         return NextResponse.json({
//             error: 'User already exists'
//          }),{status:409};
//       }

      
//     const existingEmail = await prisma.user.findFirst({
//         where: {
//           email: {
//             equals: email,
//             mode: "insensitive",
//           },
//         },
//       });
  
//       if (existingEmail) {
//         return NextResponse.json({
//             error: 'User already exists'
//          }),{status:409};
//       }
   
//     const user = await prisma.user.create({
//       data: {
//         id: userId,
//         username,
//         displayName: username,
//         phoneNumber,
//         email,
//         passwordHash,
//         role: "USER"
//       },
//     });
  
//     return NextResponse.json({
//         user,
//          message: 'User created',
//      }),{status:201};
//   } catch (error:any) {
//     return NextResponse.json({message:error.message}),{status:500}
//   }
// }

// // export async function POST(req: NextRequest) {
// //   try {
// //     const { username, email, password } = await req.json();

// //     // Check if the user already exists
// //     const existingUser = await prisma.user.findUnique({ where: { email } });
// //     if (existingUser) {
// //       return NextResponse.json({ error: 'User already exists' }, { status: 400 });
// //     }

// //     // Hash the password and save the user
// //     const hashedPassword = await hashPassword(password);
// //     const newUser = await prisma.user.create({
// //       data: { username, email, passwordHash: hashedPassword } as any,
// //     });

// //     return NextResponse.json({ message: 'User registered successfully', user: newUser }, { status: 201 });
// //   } catch (error) {
// //     return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
// //   }
// // }
