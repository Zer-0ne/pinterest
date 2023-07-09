import Pins from "@/app/api/Models/Pins";
import connect from "@/app/api/database/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: any) => {
    try {
        await connect();
        const { id } = params
        const pins = await Pins.find({ authorId: id })
        return NextResponse.json({ pins })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Internal server error' })
    }
}