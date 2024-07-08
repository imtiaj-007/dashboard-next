import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/app/lib/utils";
import Order from "@/app/models/orders";


// Handling GET requests
export const GET = async (req, res) => {
    try {
        await connectToDB();
        const { pathname } = new URL(req.url);

        const orderID = pathname.split('/').pop();
        const singleOrder = await Order.findById(orderID);

        if(!singleOrder) {
            return NextResponse.json({
                message: "Product Not Found",                
            });
        }

        return NextResponse.json({ singleOrder })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Internal server error!",
            error
        });
    }
}