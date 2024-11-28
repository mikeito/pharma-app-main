import prisma from 'src/lib/prisma';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import connectMongo from 'src/lib/mongodb';
import { verifyPassword } from 'src/lib/hash';
import { generateToken } from 'src/lib/jwt';


export async function POST(req: NextRequest) {
    await connectMongo();
  try {
    const { email, password } = await req.json();

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