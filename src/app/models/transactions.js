import mongoose from 'mongoose';

// Transaction Schema
const transactionSchema = new mongoose.Schema({
    orderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },    
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Cash on Delivery', 'Wallet'],
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        required: true
    },
    transactionDate: {
        type: Date,
        default: new Date().toISOString(),
        required: true
    },
    notes: {
        type: String,
        trim: true
    }
}, { timestamps: true });


export default mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
