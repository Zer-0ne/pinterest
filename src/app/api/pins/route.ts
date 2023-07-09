import connect from "../database/db"
// import cloudinary from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import { NextRequest, NextResponse } from "next/server";
import Pins from "../Models/Pins";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/utils/AuthOptions";
import { storage } from "../database/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { SessionsProps } from "@/utils/constant";

export const GET = async () => {
    await connect();
    const Pin = await Pins.find({});
    return NextResponse.json({
        Pin,
    });
}

// create pins
export const POST = async (request: NextRequest) => {
    const session = await getServerSession(AuthOptions) as SessionsProps
    if (!session) {
        return NextResponse.json({ message: 'please login first' })
    }
    try {
        await connect()
        const {
            title,
            Description,
            tag,
            image
        } = await request.json()
        const postUUID = uuidv4();
        const storageRef = ref(storage, postUUID);
        const snapshot = await uploadString(storageRef, image, 'data_url')
        const imageURL = await getDownloadURL(snapshot.ref);
        const newPost = new Pins({
            title,
            Description,
            image: imageURL,
            imageid: postUUID,
            tag,
            authorId: session?.user?.id,
        });

        // Save the new post to the database
        await newPost.save();
        return NextResponse.json({ message: 'created secussfully' })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ message: error.message })

    }

}