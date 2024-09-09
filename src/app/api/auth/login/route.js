// src/app/api/auth/login/route.js
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

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