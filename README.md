Personal expense tracker with budget management, built with React, Vite and MobX, backed by a PHP REST API.

# ExpenseFlow

A personal expense tracker where you can add, view and delete expenses,
set a budget, and see a dashboard summary. The frontend is built with
React + MobX and talks to a PHP backend.

## Tech Stack
- React.js (Vite)
- MobX for state management
- JavaScript (ES6+), HTML5, CSS3
- PHP backend (XAMPP/WAMP)

## Features
- Add and delete expenses
- Expense list with a dashboard overview
- Set and update a budget
- Clean redesigned UI

## How it works
```
React UI --> MobX store --> src/api.js --> PHP API (localhost/expense-api)
```

## Getting Started
```bash
git clone https://github.com/krishbarot08-web/expenseflow.git
cd expenseflow
npm install
npm run dev
```

## Backend
Frontend `src/api.js` mein `API_BASE` ke through ye PHP endpoints use karta hai:
`expenses/get.php`, `expenses/add.php`, `expenses/delete.php`,
`budget/get.php`, `budget/update.php`

Backend ko `htdocs/expense-api/` mein rakho aur Apache start karo.
