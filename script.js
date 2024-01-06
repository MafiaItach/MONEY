let transactions = [];
let isBipulPaying = true; // Tracks whether Bipul or Subho is paying

const transactionForm = document.getElementById('transactionForm');
const transactionsDiv = document.getElementById('transactions');
const summaryDiv = document.getElementById('summary');
const payingPersonButton = document.getElementById('payingPerson');
// Load transactions from localStorage on page load
window.addEventListener('load', function () {
  if (localStorage.getItem('transactions')) {
    transactions = JSON.parse(localStorage.getItem('transactions'));
    updateDisplay();
  }
});

transactionForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const amount = parseFloat(document.getElementById('amount').value);

  if (isNaN(amount) || amount === 0) {
    alert('Please enter a valid amount.');
    return;
  }

  addTransaction(amount);
  updateDisplay();
});

payingPersonButton.addEventListener('click', function () {
  isBipulPaying = !isBipulPaying;
  payingPersonButton.textContent = isBipulPaying ? 'Bipul paying' : 'Subho paying';
});

function addTransaction(amount) {
  if (!isBipulPaying) {
    amount = -amount; // If Subho is paying, make the amount negative
  }
  transactions.push(amount);
    // Store transactions in localStorage
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function updateDisplay() {
  let html = '<h2>Transactions:</h2>';
  let total = 0;

  transactions.forEach((transaction, index) => {
    total += transaction;
    const person = index % 2 === 0 ? 'Bipul' : 'Subho';
    const status = index % 2 === 0 ? 'pay' : 'pay';
    html += `<p>${person} ${status} INR${Math.abs(transaction)}</p>`;
  });

  const balance = transactions.reduce((acc, cur) => acc + cur, 0);
  const balanceStatus = balance >= 0 ?'Subho will pay back ' : 'Bipul will pay back' ;
  const balanceAmount = Math.abs(balance);

  summaryDiv.innerHTML = `<h2>Summary:</h2>
    <p>${balanceStatus} INR ${balanceAmount}</p>`;

  transactionsDiv.innerHTML = html;
}
