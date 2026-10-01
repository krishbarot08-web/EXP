import { useState } from "react";
import { observer } from "mobx-react-lite";
import expenseStore from "../stores/expenseStore";
import { formatCurrency } from "../utils/format";

const Dashboard = observer(() => {

    const [editing, setEditing] = useState(false);
    const [draftBudget, setDraftBudget] = useState(expenseStore.budget);

    const usedPercent =
        expenseStore.budget > 0
            ? Math.min(
                  100,
                  Math.round(
                      (expenseStore.totalExpenses / expenseStore.budget) * 100
                  )
              )
            : 0;

    const overBudget = expenseStore.remainingBudget < 0;

    const handleSave = async () => {
        if (Number(draftBudget) > 0) {
            await expenseStore.setBudget(draftBudget);
        }
        setEditing(false);
    };

    return (
        <section className="ledger" aria-label="Budget summary">

            <div className="ledger__row">
                <span className="ledger__label">Budget</span>

                {editing ? (
                    <span className="ledger__edit">
                        <input
                            type="number"
                            className="ledger__input"
                            value={draftBudget}
                            onChange={(event) =>
                                setDraftBudget(event.target.value)
                            }
                            autoFocus
                        />
                        <button className="link-btn" onClick={handleSave}>
                            Save
                        </button>
                    </span>
                ) : (
                    <span className="ledger__value">
                        {formatCurrency(expenseStore.budget)}
                        <button
                            className="link-btn"
                            onClick={() => {
                                setDraftBudget(expenseStore.budget);
                                setEditing(true);
                            }}
                        >
                            Edit
                        </button>
                    </span>
                )}
            </div>

            <div className="ledger__row">
                <span className="ledger__label">Spent</span>
                <span className="ledger__value">
                    {formatCurrency(expenseStore.totalExpenses)}
                </span>
            </div>

            <div
                className="ledger__bar"
                role="progressbar"
                aria-valuenow={usedPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Budget used"
            >
                <div
                    className={`ledger__bar-fill ${
                        overBudget ? "ledger__bar-fill--over" : ""
                    }`}
                    style={{ width: `${usedPercent}%` }}
                />
            </div>

            <div className="ledger__row ledger__row--total">
                <span className="ledger__label">
                    {overBudget ? "Over budget by" : "Remaining"}
                </span>
                <span
                    className={`ledger__value ledger__value--strong ${
                        overBudget ? "text-stamp" : "text-moss"
                    }`}
                >
                    {formatCurrency(Math.abs(expenseStore.remainingBudget))}
                </span>
            </div>

        </section>
    );
});

export default Dashboard;
