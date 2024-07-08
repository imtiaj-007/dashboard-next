import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/app/lib/utils";
import Order from "@/app/models/orders";
import mongoose from "mongoose";


// Handling GET requests
export const GET = async (req, res) => {
    try {
        await connectToDB();

        const { searchParams } = new URL(req.url);
        const orderID = searchParams.get('orderID');        
        const page = parseInt(searchParams.get('page')) || 1;
        const sort = searchParams.get('sort') || '-createdAt';

        const pageNum = parseInt(page) || 1;        
        const totalOrders = await Order.countDocuments();
        const totalPages = Math.ceil(totalOrders / 10);  
        
        const skip = Math.max(0, (pageNum - 1) * 10);

        const orders = await Order.find({})
            .sort(sort)
            .skip(skip)
            .limit(10)
            

        const refundOrders = await Order.find({
            paymentMethod: { $in: ['Credit/Debit Card', 'UPI'] },
            orderStatus: 'Cancelled'
        })

        let refundAmt = refundOrders.reduce((sum, order)=> sum + (order.price * order.qty), 0);
        refundAmt = refundAmt * 36.12;

        const pendingOrders = await Order.find({
            paymentMethod: 'Cash on Delivery',
            orderStatus: { $in: ['Processing', 'Shipped'] }
        });

        let amtPending = pendingOrders.reduce((sum, order) => sum + (order.price * order.qty), 0);
        amtPending = amtPending * 36.12;

        const paidOrders = await Order.find({
            $or: [
                { paymentMethod: { $in: ['Credit/Debit Card', 'UPI'] } },
                { $and: [
                    { paymentMethod: 'Cash on Delivery' },
                    { orderStatus: 'Delivered' }
                ]}                    
            ]
        });

        let recievedAmt = paidOrders.reduce((sum, order) => sum + (order.price * order.qty), 0);
        recievedAmt = recievedAmt * 36.12;
        
        let cards = [
            {
                heading: 'Next Payout',
                amount: refundAmt,
                quantity: refundOrders.length,
            },
            {
                heading: 'Amount Pending',
                amount: amtPending,
                quantity: pendingOrders.length,
            },
            {
                heading: 'Amount Recieved',
                amount: recievedAmt,
                quantity: paidOrders.length,
            }
        ]

        if(orderID && mongoose.Types.ObjectId.isValid(orderID)) {
            let orders = await Order.find({ _id: orderID })
            return NextResponse.json({ 
                orders,
                meta: {
                    totalOrders,
                    totalPages,
                    currentPage: pageNum,
                    pageSize: 10,
                    card: cards
                },
            });
        }

        return NextResponse.json({
            orders,
            meta: {
                totalOrders,
                totalPages,
                currentPage: pageNum,
                pageSize: 10,
                card: cards
            },
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Internal server error!",
            error
        });
    }
}

// Handling POST requests
export const POST = async (req, res) => {
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

