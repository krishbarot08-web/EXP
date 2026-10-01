import Dashboard from "./components/Dashboard";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {

    return (
        <div>

            <h1>💰 Expense Tracker</h1>

            <Dashboard />

            <ExpenseForm />

            <ExpenseList />

        </div>
    );
}

export default App;