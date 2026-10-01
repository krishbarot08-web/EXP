const API_BASE =
    "http://localhost/expense-api/api";

async function request(endpoint, options = {}) {

    const response = await fetch(
        `${API_BASE}/${endpoint}`,
        {
            headers: {
                "Content-Type": "application/json"
            },
            ...options
        }
    );

    const data = await response.json();

    if (!response.ok || data.success === false) {
        throw new Error(
            data.message || "API request failed"
        );
    }

    return data;
}

export const api = {

    getExpenses: () =>
        request("expenses/get.php"),

    addExpense: (expense) =>
        request(
            "expenses/add.php",
            {
                method: "POST",
                body: JSON.stringify(expense)
            }
        ),

    deleteExpense: (id) =>
        request(
            "expenses/delete.php",
            {
                method: "DELETE",
                body: JSON.stringify({ id })
            }
        ),

    getBudget: () =>
        request("budget/get.php"),

    updateBudget: (amount) =>
        request(
            "budget/update.php",
            {
                method: "POST",
                body: JSON.stringify({ amount })
            }
        )
};