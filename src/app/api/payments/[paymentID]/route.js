import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/app/lib/utils";
import Transaction from "@/app/models/transactions";


// Handling GET requests
export const GET = async (req, res) => {
    try {
        await connectToDB();
        const { pathname } = new URL(req.url);

        const paymentID = pathname.split('/').pop();
        const singlePayment = await Transaction.findById(paymentID);

        if(!singlePayment) {
            return NextResponse.json({
                message: "Product Not Found",                
            });
        }

        return NextResponse.json({ singlePayment })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Internal server error!",
            error
        });
    }
}