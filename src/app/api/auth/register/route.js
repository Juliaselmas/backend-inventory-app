// src/app/api/auth/register/route.js
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { email, password, name } = await req.json();

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            },
        });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return NextResponse.json({ token, user });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
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