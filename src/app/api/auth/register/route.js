import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { signJWT } from "@/utils/helpers/authHelpers";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
    let body;

    // Försök att parsa inkommande JSON och validera input
    try {
        body = await req.json();
        console.log(body);
        if (!body.email || !body.password || !body.name) {
            throw new Error("Email, password, and name are required");
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
        // Kontrollera om användaren redan finns i databasen
        const existingUser = await prisma.user.findUnique({
            where: { email: body.email },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        // Hasha lösenordet
        const hashedPassword = await bcrypt.hash(body.password, 10);

        // Skapa ny användare i databasen
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
                name: body.name,
            },
        });

        console.log("User registered: ", user);

        // Skapa JWT-token
        const token = await signJWT({
            userId: user.id,
            email: user.email,
        });

        // Returnera användare och token som svar
        return NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
            token,
        });
    } catch (error) {
        console.log("Registration error:", error);
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}


/*
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { signJWT } from "@/utils/helpers/authHelpers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request) {
  const { email, password, name } = await request.json();

  // Hasha lösenordet
  const hashedPassword = await bcrypt.hash(password, 10);

  // Skapa ny användare
  const user = await prisma.user.create({
      data: {
          email,
          password: hashedPassword,
          name,
      }
  });

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
     if(!body.email || !body.password || !body.name){
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
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.name
        }
      })

      console.log("User registered: ", user)

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