const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const { authenticateToken } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authenticateToken);

// Get all expenses with optional filters
router.get('/', expenseController.getAllExpenses);

// Get monthly summary
router.get('/summary', expenseController.getMonthlySummary);

// Get single expense
router.get('/:id', expenseController.getExpenseById);

// Create new expense
router.post('/', expenseController.createExpense);

// Update expense
router.put('/:id', expenseController.updateExpense);

// Delete expense
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
