import { NextRequest, NextResponse } from "next/server";
import connect from "../database/db";
import bcrypt from 'bcrypt'
import Otp from "../Models/Otp";
import nodemailer from 'nodemailer';
export const POST = async (request: NextRequest, { params }: any) => {
    try {
        const {
            email,
        } = await request.json()
        await connect();
        const otp = generateOTP(4);
        const existingUser = await Otp.findOne({ email })
        const salt = await bcrypt.genSalt(10);
        const hasOtp = await bcrypt.hash(otp, salt);
        if (existingUser) {
            const id = await existingUser.id
            const otpResend = {
                otp: hasOtp
            }
            const updatedOtp = await Otp.findByIdAndUpdate(
                id,
                { $set: otpResend },
                { new: true }
            )

            // Create a transporter using Gmail SMTP
            const transporter = nodemailer.createTransport({
                // service: 'Gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'zer.0n3.sys@gmail.com',
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            // Define the email options
            const mailOptions = {
                from: 'zer.0n3.sys@gmail.com',
                to: email,
                subject: 'OTP Verification',
                text: `
            Your OTP for verification is: ${otp}
            Please use this OTP to complete your verification process.
            Thank you!
            `,
            };

            // Send the email
            await transporter.sendMail(mailOptions);

            return NextResponse.json({ mesage: 'otp resend seccussfully' })
        }
        const OTP = new Otp({
            email,
            otp: hasOtp
        })
        await OTP.save()

        // Create a transporter using Gmail SMTP
        const transporter = nodemailer.createTransport({
            // service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'zer.0n3.sys@gmail.com',
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Define the email options
        const mailOptions = {
            from: 'zer.0n3.sys@gmail.com',
            to: email,
            subject: 'OTP Verification',
            text: `
            Your OTP for verification is: ${otp}
            Please use this OTP to complete your verification process.
            Thank you!
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ mesage: 'otp send seccussfully' })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message });
        }
        return NextResponse.json({ message: 'An error occurred' });
    }
}
const generateOTP = (length: number) => {
    const digits = '0123456789';
    let otp = '';

    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
    }

    return otp;
};