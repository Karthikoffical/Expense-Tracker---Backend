const Budget = require('../models/Budget');

// Get budget for a specific month (only user's budgets)
exports.getBudgetByMonth = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.status(400).json({
                success: false,
                message: 'Please provide month in format YYYY-MM'
            });
        }

        const budget = await Budget.findOne({
            month,
            userId: req.userId
        });

        if (!budget) {
            return res.status(404).json({
                success: false,
                message: 'Budget not found for this month'
            });
        }

        res.status(200).json({
            success: true,
            data: budget
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Create or update budget
exports.setBudget = async (req, res) => {
    try {
        const { month, budgetAmount } = req.body;

        if (!month || !budgetAmount) {
            return res.status(400).json({
                success: false,
                message: 'Please provide month and budgetAmount'
            });
        }

        const budget = await Budget.findOneAndUpdate(
            {
                userId: req.userId,
                month
            },
            {
                budgetAmount,
                updatedAt: new Date()
            },
            {
                upsert: true,
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: 'Budget saved successfully',
            data: budget
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete budget
exports.deleteBudget = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month) {
            return res.status(400).json({
                success: false,
                message: 'Please provide month in format YYYY-MM'
            });
        }

        const budget = await Budget.findOneAndDelete({
            month,
            userId: req.userId
        });

        if (!budget) {
            return res.status(404).json({
                success: false,
                message: 'Budget not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Budget deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get all budgets (only user's budgets)
exports.getAllBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find({ userId: req.userId }).sort({ month: -1 });
        res.status(200).json({
            success: true,
            count: budgets.length,
            data: budgets
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
