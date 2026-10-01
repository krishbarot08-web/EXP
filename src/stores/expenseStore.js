import {
    makeAutoObservable,
    runInAction
} from "mobx";

import { api } from "../api";

class ExpenseStore {

    expenses = [];

    budget = 30000;

    selectedCategory = "All";

    loading = false;

    error = "";

    constructor() {
        makeAutoObservable(this);
    }

    async loadData() {

        this.loading = true;
        this.error = "";

        try {

            const [
                expenseData,
                budgetData
            ] = await Promise.all([
                api.getExpenses(),
                api.getBudget()
            ]);

            runInAction(() => {

                this.expenses =
                    expenseData.expenses;

                this.budget =
                    Number(budgetData.amount);

                this.loading = false;
            });

        } catch (error) {

            runInAction(() => {

                this.error =
                    error.message;

                this.loading = false;
            });
        }
    }

    async addExpense(
        title,
        amount,
        category
    ) {

        const data =
            await api.addExpense({
                title,
                amount,
                category
            });

        runInAction(() => {

            this.expenses.unshift(
                data.expense
            );
        });
    }

    async deleteExpense(id) {

        await api.deleteExpense(id);

        runInAction(() => {

            this.expenses =
                this.expenses.filter(
                    expense =>
                        expense.id !== id
                );
        });
    }

    async setBudget(amount) {

        await api.updateBudget(amount);

        runInAction(() => {

            this.budget =
                Number(amount);
        });
    }

    setCategory(category) {

        this.selectedCategory =
            category;
    }

    get totalExpenses() {

        return this.expenses.reduce(
            (total, expense) =>
                total + Number(expense.amount),
            0
        );
    }

    get remainingBudget() {

        return (
            this.budget -
            this.totalExpenses
        );
    }

    get filteredExpenses() {

        if (
            this.selectedCategory ===
            "All"
        ) {
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
                    (
                        result[
                            expense.category
                        ] || 0
                    ) +
                    Number(expense.amount);

                return result;

            },
            {}
        );
    }
}

const expenseStore =
    new ExpenseStore();

export default expenseStore;