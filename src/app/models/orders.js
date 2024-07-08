import mongoose from "mongoose";

const ShippingSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
}, { _id: false });

const OrderSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    productName: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    shippingAddress: {
        type: ShippingSchema,
        require: true,
    },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
    paymentMethod: {
        type: String,
        enum: ['Credit/Debit Card', 'UPI', 'Cash on Delivery'],
        default: 'Cash on Delivery',
        required: true,
    },
}, { timestamps: true });


export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
