
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import connect from "@/app/api/database/db";
import { NextAuthOptions } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/api/Models/User";
import { Data, SessionsProps, } from "./constant";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
export const AuthOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET
        // }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'username', type: 'string' },
                password: { label: 'Password', type: 'pasword' }
            },
            async authorize(credentials) {

                try {
                    const { username, password } = credentials as {
                        username: string;
                        password: string
                    };
                    // Find user by email
                    await connect()
                    const user = await User.findOne<any>({ username });

                    if (!user) {
                        return NextResponse.json({ message: 'user not found' });
                    }

                    // Compare passwords
                    const isPasswordValid = await bcrypt.compare(password, user.password);
                    if (!isPasswordValid) {
                        return NextResponse.json({ message: 'password is incorrect'});
                    }

                    // Add user information to the token
                    return user;
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        return NextResponse.json({ message: error.message });
                    }
                    return NextResponse.json({ message: 'An error occurred' });
                }
            },
        }),
    ],
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    callbacks: {
        async jwt({ token, user }) {
            // Access the user information stored in the token
            // console.log(user);
            if (user) {
                // Update the token with the user information
                token.id = user.id;
                // token.isAdmin = user?.isAdmin
                // token.username = user?.username
                // token.followers = user?.followers
                // token.followings = user?.followings
                // token.saved = user?.saved
            }

            return token;
        },
        async session({ session, token }) {
            session.user = session.user ?? {};
            (session.user as any).id = token?.id;
            // (session.user as any).isAdmin = token?.isAdmin;
            // (session.user as any).username = token?.username;
            // (session.user as any).followers = token?.followers;
            // (session.user as any).followings = token?.followings;
            // (session.user as any).saved = token?.saved;
            return session;
        },
    },
};
