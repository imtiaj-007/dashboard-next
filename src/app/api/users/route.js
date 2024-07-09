import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/app/lib/utils";
import User from "@/app/models/users";


// Handling GET requests for users
export const GET = async(req, res)=> {
    try {
        await connectToDB();
        const users = await User.find({});
        return NextResponse.json({ users });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Something went wrong!",
            error
        });
    }
}

// Handling POST requests for users
export const POST = async(req, res)=> {
    try {
        await connectToDB();
        const data = await req.json();
        const users = await User.insertMany(data);
        return NextResponse.json({ users });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Something went wrong!",
            error
        });
    }
}

