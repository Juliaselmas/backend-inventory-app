import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { lowerCaseCompare } from "@/utils/helpers/apiHelpers";
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

export async function GET(req) {
    //const url = new URL(req.url);
    //const username = url.searchParams.get("username");
    //const password = url.searchParams.get("password");

    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users, { status: 200 });
      } catch (error) {
        console.log("Error fetching users:", error);  // Logga ut fel
        return NextResponse.json({
          message: "Error fetching users"
        }, { status: 500 });
      }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const user = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                password: body.password
            },
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.log("post request failed");
        return NextResponse.json({
            message: "Error creating user"
        }, {
             status: 400
        })
    }
    
}
    
