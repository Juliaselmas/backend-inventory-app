import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

//import { validateitemsData } from "@/utils/helpers/apiHelpers";
//import { lowercaseCompare } from "@/utils/helpers/apiHelpers";
//import { validateLoggedInUser } from "@/utils/helpers/apiHelpers";

/* Format på item:
model Item {
  id           Int    @id @default(autoincrement())
  name         String
  description  String
  quantity     Int
  category     String
  userId       Int 
}
*/

const prisma = new PrismaClient();

export async function GET(req) {
    const userId = req.headers.get("userId");

    try {
        const items = await prisma.item.findMany({
            where: { userId: Number(userId) }
        });

        return NextResponse.json(items, { status: 200 });
    }catch (error) {
        return NextResponse.json({
            message: "Error fetching items"
        },{
            status: 500
        });
    }
}

export async function POST(req) {
    const userId = req.headers.get("userId");

    try {
        const body = await req.json();
        const newItem = await prisma.item.create({
            data: {
                name: body.name,
                description: body.description,
                quantity: body.quantity,
                category: body.category,
                userId: Number(userId)
            },
        });

        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Error creating item"
        },{
            status: 400
        })
    }
}