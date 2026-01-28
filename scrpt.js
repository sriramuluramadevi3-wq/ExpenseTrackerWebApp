document.getElementById("expenseForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const expense = {
    category: document.getElementById("category").value,
    amount: document.getElementById("amount").value,
    date: document.getElementById("date").value
  };

  fetch("http://localhost:8080/api/expenses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense)
  })
  .then(res => res.json())
  .then(data => {
    addExpenseToTable(data);
  });
});

function addExpenseToTable(expense) {
  const table = document.querySelector("#expenseTable tbody");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${expense.category}</td>
    <td>${expense.amount}</td>
    <td>${expense.date}</td>
  `;
  table.appendChild(row);
}

// Load existing expenses
fetch("http://localhost:8080/api/expenses")
  .then(res => res.json())
  .then(data => {
    data.forEach(addExpenseToTable);
  });
