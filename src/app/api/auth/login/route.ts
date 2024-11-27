import prisma from 'src/lib/prisma';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import connectMongo from 'src/lib/mongodb';
import { verifyPassword } from 'src/lib/hash';
import { generateToken } from 'src/lib/jwt';

// export async function POST(req: NextRequest) {
//   await connectMongo();
//   const { email, password } = await req.json();
//   if (!email || !password) {
//     return NextResponse.json({
//        error: 'Email and password are required'         
//      }, { status: 400 });
//   }

//   try {
//     const existingUser = await prisma.user.findFirst({
//         where: {
//           email: {
//             equals: email,
//             mode: "insensitive",
//           },
//         },
//       });
//     if (!existingUser || !existingUser.passwordHash) {
//       return NextResponse.json({
//           error: 'Incorrect email or password'         
//         }, { status: 404 });
//     }    
//     const isPasswordValid = await bcrypt.compare(password, existingUser.passwordHash);
//     if (!isPasswordValid) {
//       return NextResponse.json({
//           error: 'Incorrect email or password'         
//         }, { status: 404 });
//     }
  
//     return NextResponse.json({
//         data:existingUser,
//         message: 'Login successful',
//      }, { status: 201 });
//   } catch (error: any) {
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 401 });
    }
    console.log({user})
    console.log({password})

    const isValidPassword = await verifyPassword(password, user.passwordHash);
    
    if (!isValidPassword) {
      return NextResponse.json({ error: 'password' }, { status: 401 });
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });

    return NextResponse.json({ message: 'Login successful', success:true,
       data:{     
      token: token,
      user:user,
    }},
     { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}