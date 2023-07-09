import { NextResponse } from "next/server";
import connect from "./database/db";


export const GET = async () => {
    await connect();
    return NextResponse.json({'message':'hi'})
}