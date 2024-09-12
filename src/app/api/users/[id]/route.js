import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
//import { lowerCaseCompare } from "@/utils/helpers/apiHelpers";
//import { validateitemsData } from "@/utils/helpers/apiHelpers";

/* format på User:
model User {
  id           Int    @id @default(autoincrement())
  email        String @unique
  name         String
  password     String
}
*/

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "error fetching user",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error updating user",
      },
      { status: 400 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      {
        message: "User deleted",
      },
      {
        status: 204,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error deleteing user",
      },
      {
        status: 400,
      }
    );
  }
}
