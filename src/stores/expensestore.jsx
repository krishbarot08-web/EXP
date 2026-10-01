import { makeAutoObservable } from "mobx";

class ExpenseStore {
    expenses = [];

    budget = 30000;

    selectedCategory = "All";

    constructor() {
        makeAutoObservable(this);
    }

    addExpense(title, amount, category) {
        this.expenses.push({
            id: Date.now(),
            title: title,
            amount: Number(amount),
            category: category
        });
    }

    deleteExpense(id) {
        this.expenses = this.expenses.filter(
            expense => expense.id !== id
        );
    }

    setBudget(amount) {
        this.budget = Number(amount);
    }

    setCategory(category) {
        this.selectedCategory = category;
    }

    get totalExpenses() {
        return this.expenses.reduce(
            (total, expense) =>
                total + expense.amount,
            0
        );
    }

    get remainingBudget() {
        return this.budget - this.totalExpenses;
    }

    get filteredExpenses() {

        if (this.selectedCategory === "All") {
            return this.expenses;
        }

        return this.expenses.filter(
            expense =>
                expense.category ===
                this.selectedCategory
        );
    }

    get categoryTotals() {

        return this.expenses.reduce(
            (result, expense) => {

                result[expense.category] =
                    (result[expense.category] || 0)
                    + expense.amount;

                return result;

            },
            {}
        );
    }
}

const expenseStore = new ExpenseStore();

export default expenseStore;