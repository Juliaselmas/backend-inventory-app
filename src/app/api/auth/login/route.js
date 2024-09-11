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
                email: body.email
            }
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
            email: user.email
        });

        // Returnera användare och token
        return NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            },
            token
        });
    } catch (error) {
        console.log("Login error:", error);
        return NextResponse.json(
            { error: error.message },
            { status: 401 } // Returnera 401 vid felaktiga inloggningsuppgifter
        );
    }
}

/*
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { signJWT } from "@/utils/helpers/authHelpers";

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET; // Se till att du har en hemlig nyckel för JWT

export async function POST(request) {
  const { email, password } = await request.json();
  console.log("Login attempt with email:", email);

 
  const user = await prisma.user.findUnique({
      where: { email }
  });

  if (!user) {
    console.log("No user found with that email");
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  // Verifiera lösenord
  const isMatch = await bcrypt.compare(password, user.password);
  console.log("Password match:", isMatch);

  if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  // Skapa JWT-token genom signJWT från helpers
  const token = await signJWT({ id: user.id, email: user.email });

  return NextResponse.json({ token });
}
*/

/*
import { NextResponse } from "next/server";

import { signJWT } from "@/utils/helpers/authHelpers";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


export async function POST(req) {
    let body;
    try {
      body = await req.json();
      console.log(body)
     if(!body.email || !body.password){
      throw new Error()
     } 
    } catch (error) {
      return NextResponse.json(
        {
          message: "A valid new user object has to be provided",
        },
        {
          status: 400,
        }
      );
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: body.email
        }
      })

      if(!user || user.password !== body.password){ //TODO: replace with more safe check
        throw new Error("Invalid login credentials")
      }

      const token = await signJWT({
        userId: user.id
      })

      return NextResponse.json({
        user,
        token
      })
    } catch (error) {
      console.log(error)
      return NextResponse.json({
        error: error.message
      }, {
        status: 400
      })
    }
}
*/