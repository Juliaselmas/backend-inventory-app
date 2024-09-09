import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET; // Se till att du har en hemlig nyckel för JWT

export async function POST(request) {
    const { email, password } = await request.json();

    // Hämta användare från databasen
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Verifiera lösenord
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Skapa JWT-token
    const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: "1h" });

    return NextResponse.json({ token });
}



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