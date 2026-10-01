import { observer } from "mobx-react-lite";
import expenseStore from "../stores/expenseStore";
import { formatCurrency } from "../utils/format";

const ExpenseItem = observer(({ expense }) => {

    return (
        <li className="line-item">

            <div className="line-item__info">
                <p className="line-item__title">{expense.title}</p>
                <span className="tag">{expense.category}</span>
            </div>

            <div className="line-item__right">
                <span className="line-item__amount">
                    {formatCurrency(expense.amount)}
                </span>

                <button
                    type="button"
                    className="line-item__delete"
                    aria-label={`Delete ${expense.title}`}
                    onClick={() => expenseStore.deleteExpense(expense.id)}
                >
                    ×
                </button>
            </div>

        </li>
    );
});

export default ExpenseItem;
