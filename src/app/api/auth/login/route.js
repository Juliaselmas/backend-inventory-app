import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { signJWT } from "@/utils/helpers/authHelpers";

const prisma = new PrismaClient();

export async function POST(req) {
  let body;

  // Försöker parsa request-bodyn och hanterar eventuella fel
  try {
    body = await req.json();
    if (!body.email || !body.password) {
      throw new Error("Email and password are required");
    }
  } catch (error) {
    return NextResponse.json(
      { message: "A valid login request has to be provided" },
      { status: 400 }
    );
  }

  try {
    // Hämta användaren från databasen med hjälp av e-postadressen
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    // Kontrollera om användaren inte finns eller om lösenordet inte matchar
    if (!user) {
      throw new Error("Invalid login credentials");
    }

    // Jämför hashat lösenord med bcrypt
    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
      throw new Error("Invalid login credentials");
    }

    // Om användaren och lösenordet matchar, skapa en JWT-token
    const token = await signJWT({
      userId: user.id,
      email: user.email,
    });

    // Returnera användare och token
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    console.log("Login error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 401 } // Returnera 401 vid felaktiga inloggningsuppgifter
    );
  }
}
