import { useEffect } from "react";

import Dashboard from "./components/Dashboard";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

import { observer } from "mobx-react-lite";

import expenseStore from "./stores/expenseStore";

const App = observer(() => {

    useEffect(() => {

        expenseStore.loadData();

    }, []);

    return (
        <div className="page">

            <main className="receipt">

                <header className="receipt__header">
                    <p className="receipt__mark">✦</p>
                    <h1 className="receipt__title">Expense Ledger</h1>
                    <p className="receipt__subtitle">
                        Track what you spend, keep what you plan.
                    </p>
                </header>

                {expenseStore.error && (
                    <p className="banner banner--error" role="alert">
                        Something went wrong — {expenseStore.error}
                    </p>
                )}

                {expenseStore.loading ? (
                    <p className="receipt__status">
                        Fetching your ledger…
                    </p>
                ) : (
                    <>
                        <Dashboard />

                        <hr className="divider" />

                        <ExpenseForm />

                        <hr className="divider" />

                        <ExpenseList />
                    </>
                )}

            </main>

        </div>
    );
});

export default App;
