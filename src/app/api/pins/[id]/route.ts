import { NextRequest, NextResponse } from "next/server";
import connect from "../../database/db";
import Pins from "../../Models/Pins";
import { v4 as uuidv4 } from 'uuid';
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/utils/AuthOptions";
import { deleteObject, getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "../../database/firebase";
import User from "../../Models/User";
import { SessionsProps, } from "@/utils/constant";
interface Routes {
    user: {
        name: string;
        id: string;
        image: string;
        username: string;
        saved: [];
        posts: [];
        isAdmin: boolean;
        followers: [];
        followings: [];
    }
}
export const GET = async (request: NextRequest, { params }: any) => {
    await connect();
    const { id } = params
    const Pin = await Pins.findById(id);
    const user = await User.findById(Pin.authorId)
    const response: Routes = {
        user: {
            name: user.name,
            image: user.image,
            username: user.username,
            saved: user.saved || [],
            posts: user.posts || [],
            isAdmin: user.isAdmin,
            followers: user.followers || [],
            followings: user.followings || [],
            id: user.id
        },
    };
    return NextResponse.json({
        Pin,
        ...response,
    });
}
export const DELETE = async (request: NextRequest, { params }: any) => {
    const session = await getServerSession(AuthOptions) as SessionsProps
    if (!session) {
        return NextResponse.json({ message: 'please login first' }, { status: 401 })
    }
    try {
        await connect()
        const SessionUser = await User.findById(session.user.id)
        const id = params.id
        const deletePin = await Pins.findByIdAndDelete(id)
        if (!deletePin) {
            return NextResponse.json({ message: 'Pin not found!' })
        }
        if (deletePin.authorId.toString() === session.user?.id || SessionUser.isAdmin) {
            const storageRef = ref(storage, deletePin.imageid);
            await deleteObject(storageRef);
            return NextResponse.json({ message: 'Pin deleted seccussfully' })
        }
        return NextResponse.json({ message: 'Unauthorized' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message })
    }
}

// edit pins
export const PUT = async (request: NextRequest, { params }: any) => {
    const session = await getServerSession(AuthOptions) as Routes
    if (!session) {
        return NextResponse.json({ message: 'please login first' }, { status: 401 })
    }
    try {
        await connect()
        const SessionUser = await User.findById(session.user.id)
        const {
            title,
            Description,
            tag,
            image,
        } = await request.json()
        const { id } = params

        const post = await Pins.findById(id);
        if (post?.authorId.toString() == session.user?.id || SessionUser.isAdmin) {
            if (image) {
                await deleteObject(ref(storage, post.imageid));
                const postUUID = uuidv4();
                const storageRef = ref(storage, postUUID);
                const snapshot = await uploadString(storageRef, image, 'data_url');
                const imageURL = await getDownloadURL(snapshot.ref);
                const updatedPin = {
                    title,
                    Description,
                    image: imageURL,
                    imageid: postUUID,
                    tag,
                }
                const updatePins = await Pins.findByIdAndUpdate(
                    id,
                    { $set: updatedPin },
                    { new: true }
                )
                if (!updatePins) {
                    return NextResponse.json({ message: 'Pins not found' }, { status: 400 })
                }
            }
            const updatedPin = {
                title,
                Description,
                tag,
            }
            const updatePins = await Pins.findByIdAndUpdate(
                id,
                { $set: updatedPin },
                { new: true }
            )
            if (!updatePins) {
                return NextResponse.json({ message: 'Pins not found' }, { status: 400 })
            }
            return NextResponse.json({ message: 'Pins updated successfully' })
        }
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        // const
    } catch (error: any) {
        return NextResponse.json({ message: error.message })

    }
}
export const POST = async (request: NextRequest, { params }: { params: any }) => {
    const session = await getServerSession(AuthOptions) as SessionsProps
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const { id } = params;
    const loggedInUserId = session.user.id
    try {
        await connect();
        const loggedInUser = await User.findById(loggedInUserId)
        const pins = await Pins.findById(id)
        if (!loggedInUser || !pins) {
            return NextResponse.json({ message: 'user or pin are not found!' }, { status: 400 });
        }
        const isAlreadySaved = loggedInUser.saved.some((save: any) => save.toString() === id);
        if (isAlreadySaved) {
            const savedIndex = loggedInUser.saved.findIndex((save: any) => save.toString() === id)
            if (savedIndex === -1) {
                return NextResponse.json({ message: 'Not Saved' })
            }
            loggedInUser.saved.splice(savedIndex, 1)
            await loggedInUser.save()
            return NextResponse.json({ message: "Pin Unsaved" })
        }
        loggedInUser.saved.push(id)
        await loggedInUser.save()
        return NextResponse.json({ message: 'Pins saved' })
    } catch (error: any) {
        console.log('Error', error)
    }
}