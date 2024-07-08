import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/app/lib/utils";
import Order from "@/app/models/orders";


// Handling GET requests
export const GET = async(req, res)=> {
    try {
        await connectToDB();
        const orders = await Order.find({});
        return NextResponse.json({ orders });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Something went wrong!",
            error
        });
    }
}

// Handling POST requests
export const POST = async(req, res)=> {
    try {
        await connectToDB();
        const data = await req.json();
        const orders = await Order.insertMany(data);
        return NextResponse.json({ orders });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Something went wrong!",
            error
        });
    }
}

