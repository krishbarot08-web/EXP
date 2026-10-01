import { useState } from "react";
import { observer } from "mobx-react-lite";
import expenseStore from "../stores/expenseStore";

const CATEGORIES = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
    "Other"
];

const ExpenseForm = observer(() => {

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");
    const [message, setMessage] = useState(null);

    const handleSubmit = async (event) => {

        event.preventDefault();

        setMessage(null);

        if (title.trim() === "" || Number(amount) <= 0) {
            setMessage({
                type: "error",
                text: "Add a name and an amount above zero."
            });
            return;
        }

        try {

            await expenseStore.addExpense(title.trim(), amount, category);

            setTitle("");
            setAmount("");

            setMessage({ type: "success", text: "Added to the ledger." });

        } catch {

            setMessage({
                type: "error",
                text: "Couldn't save that expense. Try again."
            });
        }
    };

    return (
        <section className="entry" aria-label="Add expense">

            <h2 className="entry__title">Add an expense</h2>

            <form className="entry__form" onSubmit={handleSubmit}>

                <label className="field">
                    <span className="field__label">What was it for</span>
                    <input
                        type="text"
                        className="field__input"
                        placeholder="e.g. Pizza with friends"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </label>

                <div className="entry__row">

                    <label className="field field--amount">
                        <span className="field__label">Amount</span>
                        <span className="field__amount">
                            <span className="field__prefix">₹</span>
                            <input
                                type="number"
                                className="field__input"
                                placeholder="0"
                                value={amount}
                                onChange={(event) =>
                                    setAmount(event.target.value)
                                }
                            />
                        </span>
                    </label>

                    <label className="field field--category">
                        <span className="field__label">Category</span>
                        <select
                            className="field__input"
                            value={category}
                            onChange={(event) =>
                                setCategory(event.target.value)
                            }
                        >
                            {CATEGORIES.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </label>

                    <button type="submit" className="btn btn--primary entry__submit">
                        Add
                    </button>

                </div>

            </form>

            {message && (
                <p className={`banner banner--${message.type}`} role="status">
                    {message.text}
                </p>
            )}

        </section>
    );
});

export default ExpenseForm;
