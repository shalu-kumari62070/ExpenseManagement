const formExpense = document.querySelector(".formExpense")
const expenselist = document.querySelector("#expenselist tbody")

let expenses = JSON.parse(localStorage.getItem("expense")) || []

let changeindex = null;

function renderExpenses(){
    expenselist.innerHTML = "";
    expenses.forEach( (expense, index) =>{
        const createrow = document.createElement("tr");

        createrow.innerHTML = `
            <td>${expense.title} </td>
            <td>${expense.amount} </td>
            <td>${expense.category} </td>
            <td>${expense.date} </td>
            <td> 
                <button class= "update-btn" onclick = "updateExpense(${index})"> Update </button>
                <button class= "delete-btn" onclick = "deleteExpense(${index})"> Delete </button>
            </td>
        `;

        expenselist.appendChild(createrow);
    } );
}

// Add and update expense

formExpense.addEventListener("submit", (e)=>{
    e.preventDefault();

    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("Category").value;
    const date = document.getElementById("date").value;

    const newExpense = {title, amount, category, date};

    if(changeindex === null) expenses.push(newExpense);
    else expenses[changeindex] = newExpense;
    changeindex = null;

    localStorage.setItem("expense", JSON.stringify(expenses));
    renderExpenses();
    formExpense.reset();
})


// update function
function updateExpense(index){
    const expense = expenses[index]
    document.getElementById("title").value  =expense.title
    document.getElementById("amount").value =expense.amount
    document.getElementById("Category").value =expense.category
    document.getElementById("date").value =expense.date
    
    changeindex = index;
}

// Delete funciton
function deleteExpense(index){
    expenses.splice(index, 1);
    localStorage.setItem("expense", JSON.stringify(expenses));
    renderExpenses();
}

// firstly render
renderExpenses();