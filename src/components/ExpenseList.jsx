import { observer } from "mobx-react-lite";
import expenseStore from "../stores/expenseStore";
import ExpenseItem from "./ExpenseItem";

const CATEGORIES = [
    "All",
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
    "Other"
];

const ExpenseList = observer(() => {

    const expenses = expenseStore.filteredExpenses;

    return (
        <section className="log" aria-label="Expense list">

            <div className="log__head">

                <h2 className="entry__title">Expenses</h2>

                <div className="pills" role="group" aria-label="Filter by category">
                    {CATEGORIES.map((category) => {

                        const active = expenseStore.selectedCategory === category;

                        return (
                            <button
                                key={category}
                                type="button"
                                className={`pill ${active ? "pill--active" : ""}`}
                                aria-pressed={active}
                                onClick={() => expenseStore.setCategory(category)}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>

            </div>

            {expenses.length === 0 ? (
                <p className="log__empty">
                    {expenseStore.selectedCategory === "All"
                        ? "Nothing logged yet — add your first expense above."
                        : `No ${expenseStore.selectedCategory.toLowerCase()} expenses yet.`}
                </p>
            ) : (
                <ul className="log__list">
                    {expenses.map((expense) => (
                        <ExpenseItem key={expense.id} expense={expense} />
                    ))}
                </ul>
            )}

        </section>
    );
});

export default ExpenseList;
