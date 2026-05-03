const Expense = require('../models/Expense');

// Get all expenses with optional filters (only user's expenses)
exports.getAllExpenses = async (req, res) => {
    try {
        const { category, month } = req.query;
        const userId = req.userId; // From authentication middleware

        let query = { userId };

        if (category) {
            query.category = category;
        }

        if (month) {
            const [year, monthNum] = month.split('-');
            const startDate = new Date(year, monthNum - 1, 1);
            const endDate = new Date(year, monthNum, 0, 23, 59, 59);
            query.date = { $gte: startDate, $lte: endDate };
        }

        const expenses = await Expense.find(query).sort({ date: -1 });
        res.status(200).json({
            success: true,
            count: expenses.length,
            data: expenses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get single expense by ID (only if it belongs to user)
exports.getExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: 'Expense not found'
            });
        }
        res.status(200).json({
            success: true,
            data: expense
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Create new expense
exports.createExpense = async (req, res) => {
    try {
        const { title, amount, category, date, notes } = req.body;

        if (!title || !amount || !category || !date) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        const expense = await Expense.create({
            userId: req.userId,
            title,
            amount,
            category,
            date,
            notes
        });

        res.status(201).json({
            success: true,
            message: 'Expense created successfully',
            data: expense
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Update expense (only if it belongs to user)
exports.updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findOneAndUpdate(
            { _id: id, userId: req.userId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: 'Expense not found or access denied'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Expense updated successfully',
            data: expense
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete expense (only if it belongs to user)
exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findOneAndDelete({
            _id: id,
            userId: req.userId
        });

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: 'Expense not found or access denied'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Expense deleted successfully',
            data: expense
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get monthly summary (only user's expenses)
exports.getMonthlySummary = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.status(400).json({
                success: false,
                message: 'Please provide month in format YYYY-MM'
            });
        }

        const [year, monthNum] = month.split('-');
        const startDate = new Date(year, monthNum - 1, 1);
        const endDate = new Date(year, monthNum, 0, 23, 59, 59);

        const expenses = await Expense.find({
            userId: req.userId,
            date: { $gte: startDate, $lte: endDate }
        });

        const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);

        const categoryBreakdown = {};
        expenses.forEach(exp => {
            categoryBreakdown[exp.category] = (categoryBreakdown[exp.category] || 0) + exp.amount;
        });

        res.status(200).json({
            success: true,
            month,
            totalExpense,
            expenseCount: expenses.length,
            categoryBreakdown,
            data: expenses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
