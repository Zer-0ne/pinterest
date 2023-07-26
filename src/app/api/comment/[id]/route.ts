import { NextRequest, NextResponse } from "next/server";
import connect from "../../database/db";
import Pins from "../../Models/Pins";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/utils/AuthOptions";
import { SessionsProps } from "@/utils/constant";

export const DELETE = async (request: NextRequest, { params }: any) => {
    const session = await getServerSession(AuthOptions) as SessionsProps
    if (!session) {
        return NextResponse.json({ message: 'please login first' }, { status: 401 })
    }
    try {
        await connect()
        // sessionUser.isAdmin
        // Pins.comments._id === sessionUser.user.id
        // pinId
        const { id } = params;
        const post = await Pins.findOne({ "comments._id": id });

        if (!post) {
            return NextResponse.json({ message: 'Pin not found' });
        }
        const comment = post.comments.id(id);
        if (!comment) {
            return NextResponse.json({ message: 'Comment not found' });
        }
        await comment.deleteOne();

        // Save the changes to the post
        await post.save();
        return NextResponse.json({ message: 'Comment deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message });

    }
}

export const PUT = async (request: NextRequest, { params }: any) => {
    const session = await getServerSession(AuthOptions) as SessionsProps
    if (!session) {
        return NextResponse.json({ message: 'please login first' })
    }
    try {
        await connect();
        const { pinId, commentId } = params;
        const { comment, userId } = await request.json();

        const updatedPin = await Pins.findOneAndUpdate(
            { _id: pinId, "comments._id": commentId },
            { $set: { "comments.$.comment": comment } },
            { new: true }
        );

        if (!updatedPin) {
            return NextResponse.json({ message: 'Pin or Comment not found' });
        }

        return NextResponse.json({ message: 'Comment updated successfully' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message });
    }
};