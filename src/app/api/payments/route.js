import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/app/lib/utils";
import Order from "@/app/models/orders"
import Transaction from "@/app/models/transactions";
import mongoose from "mongoose";


// Handling GET requests
export const GET = async (req, res) => {
    try {
        await connectToDB();

        const { searchParams } = new URL(req.url);
        const orderID = searchParams.get('orderID');        
        const page = parseInt(searchParams.get('page')) || 1;
        const sort = searchParams.get('sort') || '-transactionDate';

        const pageNum = parseInt(page) || 1;        
        const totalOrders = await Transaction.countDocuments();
        const totalPages = Math.ceil(totalOrders / 10);  
        
        const skip = Math.max(0, (pageNum - 1) * 10);

        const payments = await Transaction.find({})
            .sort(sort)
            .skip(skip)
            .limit(10)
            

        const refundOrders = await Order.find({
            paymentMethod: { $in: ['Credit/Debit Card', 'UPI'] },
            orderStatus: 'Cancelled'
        })

        const refundAmt = refundOrders.reduce((sum, order)=> sum + (order.price * order.qty), 0);

        const pendingOrders = await Order.find({
            paymentMethod: 'Cash on Delivery',
            orderStatus: { $in: ['Processing', 'Shipped'] }
        });

        const amtPending = pendingOrders.reduce((sum, order) => sum + (order.price * order.qty), 0);

        const paidOrders = await Order.find({
            $or: [
                { paymentMethod: { $in: ['Credit/Debit Card', 'UPI'] } },
                { $and: [
                    { paymentMethod: 'Cash on Delivery' },
                    { orderStatus: 'Delivered' }
                ]}                    
            ]
        });

        const recievedAmt = paidOrders.reduce((sum, order) => sum + (order.price * order.qty), 0);
        
        const cards = [
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
            let payments = await Transaction.find({ orderID })
            return NextResponse.json({ 
                payments,
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
            payments,
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
        const payments = await Transaction.insertMany(data);        
        return NextResponse.json({ payments });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Something went wrong!",
            error
        });
    }
}

