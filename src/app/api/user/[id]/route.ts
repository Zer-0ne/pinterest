import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import connect from "../../database/db";
import User from "../../Models/User";
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
    try {
        await connect()
        const { id } = params
        const user = await User.findById(id)
        if (!user) {
            return NextResponse.json({ message: 'User not found!' });
        }
        const data: Routes = {
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
        return NextResponse.json({ data })
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' })
    }
}