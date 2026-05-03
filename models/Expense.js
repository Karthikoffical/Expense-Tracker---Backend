const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    title: {
        type: String,
        required: [true, 'Please provide an expense title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    amount: {
        type: Number,
        required: [true, 'Please provide an amount'],
        min: [0, 'Amount cannot be negative']
    },
    category: {
        type: String,
        enum: ['Food', 'Travel', 'Bills', 'Shopping', 'Health', 'Other'],
        required: [true, 'Please select a category']
    },
    date: {
        type: Date,
        required: [true, 'Please provide a date'],
        default: Date.now
    },
    notes: {
        type: String,
        trim: true,
        maxlength: [500, 'Notes cannot be more than 500 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Expense', expenseSchema);
