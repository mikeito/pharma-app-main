import { NextRequest, NextResponse } from "next/server";
import prisma from "src/lib/prisma";

// Update an organisation
export async function PUT(req: NextRequest) {
    try {
      const body = await req.json();
      const { id, ...updateData } = body;
  
      const updatedOrganisation = await prisma.organisation.update({
        where: { id },
        data: updateData,
      });
  
      return NextResponse.json(updatedOrganisation, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to update organisation' }, { status: 400 });
    }
  }

  // Delete an organisation
export async function DELETE(req: NextRequest) {
    try {
      const id = req.nextUrl.searchParams.get('id');
      if (!id) {
        return NextResponse.json({ error: 'Organisation ID is required' }, { status: 400 });
      }
  
      await prisma.organisation.delete({ where: { id } });
      return NextResponse.json({ message: 'Organisation deleted successfully' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to delete organisation' }, { status: 500 });
    }
  }