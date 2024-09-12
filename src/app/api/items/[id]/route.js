import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  const userId = req.headers.get("userId");

  try {
    const items = await prisma.item.findMany({
      where: { userId: Number(userId) },
    });

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching items" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  try {
    const updatedItem = await prisma.item.update({
      where: { id: Number(id) },
      data: {
        name: body.name,
        description: body.description,
        quantity: body.quantity,
        category: body.category,
      },
    });

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error updating item",
      },
      {
        status: 400,
      }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await prisma.item.delete({
      where: { id: Number(id) },
    });

    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error deleting item" },
      { status: 400 }
    );
  }
}
