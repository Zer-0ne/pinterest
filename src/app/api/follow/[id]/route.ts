import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { AuthOptions } from '@/utils/AuthOptions';
import connect from '../../database/db';
import User, { UserDocument } from '../../Models/User';
import { Schema } from 'mongoose';

interface FollowUser {
    user: {
        id: string | undefined | null;
    };
}

export const POST = async (request: NextRequest, { params }: any) => {
    const session = await getServerSession(AuthOptions) as FollowUser;

    if (!session?.user?.id) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = params;
    const loggedInUserId = session.user.id;
    if(loggedInUserId===id){
        return NextResponse.json({message:'You can not follow yourself'}, { status: 400 })
    }

    try {
        await connect();
        const loggedInUser = await User.findById(loggedInUserId) as UserDocument;
        const followedUser = await User.findById(id)

        if (!loggedInUser || !followedUser) {
            return NextResponse.json({ message: 'User not found' });
        }

        const isAlreadyFollowing = loggedInUser.followings.some((follow: any) => follow.userId?.toString() === id);

        if (isAlreadyFollowing) {
            const followingIndex = loggedInUser.followings.findIndex((follow: any) => follow.userId?.toString() === id);

            if (followingIndex === -1) {
                return NextResponse.json({ message: 'Not following' });
            }

            loggedInUser.followings.splice(followingIndex, 1);
            followedUser.followers.splice(followingIndex, 1);
            await loggedInUser.save();
            await followedUser.save();
            return NextResponse.json({ message: 'User unfollowed successfully' });
        }

        loggedInUser.followings.push({ userId: id });
        followedUser.followers.push({ userId: loggedInUserId });
        await loggedInUser.save();
        await followedUser.save();

        return NextResponse.json({ message: 'User followed successfully' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message });
    }
};
