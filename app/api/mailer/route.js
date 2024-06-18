import { NextResponse, NextRequest } from 'next/server'
const nodemailer = require('nodemailer');

export async function POST(request) {
    console.log(request)
    const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
    const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;
    const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;

    console.log(username)
    console.log(password)
    console.log(myEmail)

    const { name, email, message, subject } = await request.json()
    console.log(name)
    console.log(email)
    console.log(message)

    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        tls: {
            ciphers: "SSLv3",
            rejectUnauthorized: false,
        },

        auth: {

            user: username,
            pass: password
        }
    });

    console.log(transporter)

    try {

        const mail = await transporter.sendMail({
            from: username,
            to: email,
            replyTo: email,
            subject: subject,
            html: `
        <p>Message: ${message} </p>
        `,
        })

        console.log(mail)
        return NextResponse.json({ message: "Success: email was sent" })

    } catch (error) {
        console.log(error)
        NextResponse.status(500).json({ message: "COULD NOT SEND MESSAGE" })
    }

}
