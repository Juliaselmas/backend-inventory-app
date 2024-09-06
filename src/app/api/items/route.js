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