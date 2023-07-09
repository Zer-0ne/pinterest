import { NextRequest, NextResponse } from "next/server"
import bcrypt from 'bcrypt'
import connect from "../../database/db"
import User from "../../Models/User"
import { storage } from "../../database/firebase"
import { getDownloadURL, ref, uploadString } from "firebase/storage"
import Otp from "../../Models/Otp"

export const POST = async (request: NextRequest) => {
    try {
        await connect()
        const {
            name,
            username,
            password,
            adminPassword,
            isAdmin,
            image,
            email,
            otp,
        } = await request.json()
        const existingUser = await User.findOne({ username })
        const OtpByEmail = await Otp.findOne({ email })
        // compare otp
        const isOtpValid = await bcrypt.compare(otp, OtpByEmail.otp)
        if (!isOtpValid) {
            return NextResponse.json({ message: 'otp not valid' })
        }
        if (existingUser) {
            return NextResponse.json({ message: 'User already register' })
        }
        console.log({
            name,
            username,
            password,
            adminPassword,
            isAdmin,
            image,
            email,
            otp,
        })
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const storageRef = ref(storage, username)
        const snapshot = await uploadString(storageRef, image, 'data_url')
        const imageUrl = await getDownloadURL(snapshot.ref)
        if (adminPassword === process.env.ADMIN_PASSWORD) {
            const user = new User({
                username,
                password: hashPassword,
                isAdmin: true,
                name,
                email,
                image: imageUrl
            });
            await user.save()
            // console.log(user);
            return NextResponse.json({ message: 'Adming User created successfully' })
        }
        if (adminPassword === password) {
            const user = new User({
                username,
                password: hashPassword,
                name,
                email,
                isAdmin: false,
                image: imageUrl
            });
            await user.save()
            return NextResponse.json({ message: 'User created sucessfully' })
        }
        return NextResponse.json({ message: 'password and confirm password are not same' })

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message });
        }
        return NextResponse.json({ message: 'An error occurred' });
    }
}