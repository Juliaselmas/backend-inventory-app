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
        return NextResponse.json({
            message: "Error fetching users"
        }, {
            status: 500
        });
    }

    //return NextResponse.json({})
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


export async function PUT(req) {


    return NextResponse.json({})
}


export async function DELETE(req) {


    return NextResponse.json({})

    /*
    export async function DELETE(req, options) {
    const id = options.params.id
    
    try {
        await prisma.book.delete({
            where: { id: Number(id) }
        })
        return new Response(null, {
            status: 204
        })
    }catch (error) {
        return object404Respsonse(NextResponse, "Book")
    }
}
    */
}