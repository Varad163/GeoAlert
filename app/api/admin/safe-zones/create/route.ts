import {prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {name,lat,lng}=await request.json();

    if (!name || !lat || !lng){
        return NextResponse.json({error:"Missing Fields"},{status:400});
    }

    const zone= await prisma.safeZone.create({
        data:{name,lat,lng},
    });

    return NextResponse.json({zone});
}