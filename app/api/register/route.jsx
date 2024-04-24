import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt'
import User from "@/models/user";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        // console.log("Email ", email)
        // console.log("Password ", password)

        const hashedPassword = await hash(password, 10)

        await connectToDB();

        //check if a user already exists
        const userExists = await User.findOne({
            email: email
        })

        // Handle existing user
        if (userExists) {
            return NextResponse.json({ message: "User already exists with this email ID." }, { status: 400 });
        } else {
            // Create user only if email is unique
            // await User.create({
            //     email,
            //     password: hashedPassword,
            // })

            const newUser = await User.create({
                email,
                password: hashedPassword,
            })

            return NextResponse.json({ message: "User registered.", user: newUser }, { status: 201 });
        }

    } catch (error) {
        return NextResponse.json({ message: "An error occurred while registering the user.", error }, { status: 500 });
    }
}
