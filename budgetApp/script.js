class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }

  submitBudgetForm(){
    let budgetValue = this.budgetInput.value;
    
    // If value is empty or less than zero, send feedback to user
    if(budgetValue === "" || budgetValue < 0) {
      this.budgetFeedback.innerHTML = "<p>Please enter a budget of at least 0.</p>";
      this.budgetFeedback.classList.add('showItem');

      // Hide alert after 3 seconds
      setTimeout(() => {
        this.budgetFeedback.classList.remove('showItem');
      }, 3000);
    } else {
      this.budgetAmount.innerText = budgetValue;
      // Reset budget input
      this.budgetInput.value = '';
      // Calculate balance
      this.calculateBalance(budgetValue);
    }
  }

  calculateBalance(){
    const expense = this.totalExpense();
    const total = parseInt(this.budgetAmount.innerText) - expense;
    this.balanceAmount.innerText = total;

    if(total < 0) {
      this.balanceAmount.classList.remove('showGreen', 'showBlack');
      this.balanceAmount.classList.add('showRed');
    }

    if(total === 0){
      this.balanceAmount.classList.remove('showGreen', 'showRed');
      this.balanceAmount.classList.add('showBlack');
    }

    if(total > 0){
      this.balanceAmount.classList.remove('showBlack', 'showRed');
      this.balanceAmount.classList.add('showGreen');
    }

  }

  totalExpense(){
    let total = 0;

    if(!this.itemList) return total;

    // Total all amounts in itemList
    total = this.itemList.reduce((acc, curr) => acc + curr.amount, 0);

    this.expenseAmount.innerText = total;

    return total;
  }

  submitExpenseForm(){
    const expenseTitle = this.expenseInput.value;
    const expenseAmount = this.amountInput.value;

    // If values are empty or less than zero, send feedback to user
    if(expenseTitle === "" || expenseAmount === '' || expenseAmount < 0) {
      this.expenseFeedback.innerHTML = "<p>Expense values cannot be empty or negative.</p>";
      this.expenseFeedback.classList.add('showItem');
      // Hide alert after 3 seconds
      setTimeout(() => {
        this.expenseFeedback.classList.remove('showItem');
      }, 3000);
    } else {
      let amount = parseInt(expenseAmount);
      // Clear fields
      this.amountInput.value = '';
      this.expenseInput.value = '';

      let expense = {
        id: this.itemID,
        title: expenseTitle,
        amount: amount,
      }

      this.itemList.push(expense);
      // Increment itemID to pass a unique one next time
      this.itemID++;

      // Create html for item
      this.addExpense(expense);

      // Calculate balance
      this.calculateBalance();
    }
  }

  addExpense(expense){
    const div = document.createElement('div');
    div.classList.add('expense');
    div.innerHTML = `
     <div class="expense-item d-flex justify-content-between align-items-baseline">
         <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
         <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>
         <div class="expense-icons list-item">
          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
           <i class="fa fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${expense.id}">
           <i class="fa fa-trash"></i>
          </a>
         </div>
        </div>
    `;

    this.expenseList.appendChild(div);
  }

  editExpense(parent, id){
    const ancestor = parent.closest('.expense');
    // Grab this element's data from the itemList
    const item = this.itemList.filter(item => item.id === id);

    // Remove this element from the itemList
    this.itemList = this.itemList.filter(item => item.id !== id);
    // Remove item from DOM
    this.expenseList.removeChild(ancestor);
    // Recalculate expenses
    this.calculateBalance();

    // Reset the form with previous title & amount
    this.expenseInput.value = item[0].title;
    this.amountInput.value = item[0].amount;

  }

  deleteExpense(parent, id){
    let ancestor = parent.closest('.expense');
    // Remove item from DOM
    this.expenseList.removeChild(ancestor);
    // Remove this element from the itemList
    this.itemList = this.itemList.filter(item => item.id !== id);

     // Recalculate expenses
     this.calculateBalance();
  }
}

function eventListeners(){
  const budgetForm = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');
  const ui = new UI();

  // Budget form submit
  budgetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    ui.submitBudgetForm();
  })

  // Expense form submit
  expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    ui.submitExpenseForm();
  })

  // Expense form click
  expenseList.addEventListener('click', (e) => {
   let parent = e.target.parentNode;
   let dataID = parseInt(parent.getAttribute('data-id'));

   if(parent.classList.contains('edit-icon')) {
     ui.editExpense(parent, dataID);
   }

   if(parent.classList.contains('delete-icon')) {
     ui.deleteExpense(parent, dataID);
   }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  eventListeners();
});