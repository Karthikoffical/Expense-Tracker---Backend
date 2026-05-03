const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const { authenticateToken } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authenticateToken);

// Get budget for a specific month
router.get('/', budgetController.getBudgetByMonth);

// Get all budgets
router.get('/all', budgetController.getAllBudgets);

// Create or update budget
router.post('/', budgetController.setBudget);

// Delete budget
router.delete('/', budgetController.deleteBudget);

module.exports = router;
