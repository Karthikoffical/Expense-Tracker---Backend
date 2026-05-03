# Expense Tracker Backend

A Node.js + Express + MongoDB backend API for the Personal Expense Tracker application.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Navigate to the backend directory:**
   ```bash
   cd c:\Users\Dhanalakshmi\expense-tracker-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Edit `.env` file with your MongoDB URI and port
   - Default: `mongodb://localhost:27017/expense-tracker`

4. **Start the server:**
   ```bash
   npm start          # Production mode
   npm run dev        # Development mode with nodemon
   ```

The server will run on `http://localhost:5000` (or the port specified in `.env`)

---

## API Endpoints

### Health Check
- **GET** `/api/health`
  - Check if the server is running

### Expenses

#### Get All Expenses
- **GET** `/api/expenses`
- Query parameters (optional):
  - `category`: Filter by category (Food, Travel, Bills, Shopping, Health, Other)
  - `month`: Filter by month (format: YYYY-MM)
- Response:
  ```json
  {
    "success": true,
    "count": 5,
    "data": [...]
  }
  ```

#### Get Expense by ID
- **GET** `/api/expenses/:id`
- Response:
  ```json
  {
    "success": true,
    "data": { expense object }
  }
  ```

#### Create Expense
- **POST** `/api/expenses`
- Request body:
  ```json
  {
    "title": "Grocery shopping",
    "amount": 1250,
    "category": "Food",
    "date": "2026-04-23",
    "notes": "Weekly groceries"
  }
  ```

#### Update Expense
- **PUT** `/api/expenses/:id`
- Request body: Same as create (any fields to update)

#### Delete Expense
- **DELETE** `/api/expenses/:id`

#### Get Monthly Summary
- **GET** `/api/expenses/summary?month=2026-04`
- Response:
  ```json
  {
    "success": true,
    "month": "2026-04",
    "totalExpense": 12450,
    "expenseCount": 8,
    "categoryBreakdown": {
      "Food": 3500,
      "Travel": 2000,
      ...
    },
    "data": [...]
  }
  ```

### Budgets

#### Get Budget by Month
- **GET** `/api/budgets?month=2026-04`
- Response:
  ```json
  {
    "success": true,
    "data": {
      "month": "2026-04",
      "budgetAmount": 20000,
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
  ```

#### Get All Budgets
- **GET** `/api/budgets/all`

#### Set/Create Budget
- **POST** `/api/budgets`
- Request body:
  ```json
  {
    "month": "2026-04",
    "budgetAmount": 20000
  }
  ```

#### Delete Budget
- **DELETE** `/api/budgets?month=2026-04`

---

## Project Structure

```
expense-tracker-backend/
├── models/              # Database schemas
│   ├── Expense.js
│   └── Budget.js
├── controllers/         # Business logic
│   ├── expenseController.js
│   └── budgetController.js
├── routes/             # API routes
│   ├── expenseRoutes.js
│   └── budgetRoutes.js
├── middleware/         # Middleware functions (expandable)
├── server.js           # Main server file
├── .env                # Environment variables
├── package.json        # Dependencies
└── README.md           # This file
```

---

## Technologies Used

- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **Nodemon** - Development auto-restart (dev dependency)

---

## Next Steps

### Connect Frontend to Backend
Update your frontend JavaScript to call these endpoints:

```javascript
// Example: Fetch all expenses
fetch('http://localhost:5000/api/expenses')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### Future Enhancements
- User authentication (JWT)
- Role-based access control
- Data validation middleware
- Request logging
- API rate limiting
- Export data (CSV, PDF)
- Monthly reports

---

## Troubleshooting

- **MongoDB not connecting?** Check your MONGODB_URI in .env
- **Port already in use?** Change PORT in .env
- **Dependencies not installing?** Try `npm install --legacy-peer-deps`

---

## Author
Personal Expense Tracker Backend
