const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    month: {
        type: String,
        required: [true, 'Please provide a month in format YYYY-MM']
    },
    budgetAmount: {
        type: Number,
        required: [true, 'Please provide a budget amount'],
        min: [0, 'Budget cannot be negative']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Create compound unique index on userId and month
budgetSchema.index({ userId: 1, month: 1 }, { unique: true });

module.exports = mongoose.model('Budget', budgetSchema);
