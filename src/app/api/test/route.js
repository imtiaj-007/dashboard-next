import { NextRequest, NextResponse } from "next/server";


export const GET = async(req, res)=> {
    // Logic for handling GET requests
    return NextResponse.json({ message: 'GET request received' });
}

export const POST = async(req, res)=> {
    // Logic for handling POST requests
    return NextResponse.json({ message: 'POST request received', data: req.body });
}

export const PUT = async(req, res)=> {
    // Logic for handling PUT requests
    return NextResponse.json({ message: 'PUT request received', data: req.body });
}

export const PATCH = async(req, res)=> {
    // Logic for handling PATCH requests
    return NextResponse.json({ message: 'PATCH request received', data: req.body });
}

export const DELETE = async(req, res)=> {
    // Logic for handling DELETE requests
    return NextResponse.json({ message: 'DELETE request received' });
}