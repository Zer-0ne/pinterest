import { NextRequest, NextResponse } from "next/server";
import connect from "../database/db";
import Pins from "../Models/Pins";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/utils/AuthOptions";
import { SessionsProps } from "@/utils/constant";
import { revalidatePath } from "next/cache";

export const POST = async (request: NextRequest) => {
    const session = await getServerSession(AuthOptions) as SessionsProps
    if (!session) {
        return NextResponse.json({ message: 'please login first' })
    }
    try {
        await connect()
        const {
            pinId,
            comment,
            userId
        } = await request.json()
        const pin = await Pins.findById<any>(pinId)
        if (!pin) {
            return NextResponse.json({ message: 'Pin not found' })
        }
        pin.comments.push({
            comment,
            userId,
        })
        await pin.save()
        const path = request.nextUrl.searchParams.get('path') || '/api/comment'
        revalidatePath(path)
        return NextResponse.json({ message: 'Comment created successfully' })
    } catch (error: any) {
        return NextResponse.json({ message: error.message })
    }
}