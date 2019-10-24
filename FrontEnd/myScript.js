// ALL INCOME/EXPENSE CARDS GO HERE
let cardSelector = document.querySelector(".examples");

// SHOW/HIDE ALL CARDS
let viewSelector = document.querySelector(".allItems");

// FORM
let backEnd = document.querySelector(".send");
// let iDoNotWantIt = document.querySelector(".delete");

// MODAL
let editModal = document.querySelector("#popup1");

console.log(backEnd)



// display all users who chose to use their income and expenses as examples
fetch("http://localhost:3000/incomes")
.then(r => r.json())
.then(res => {
    // console.log(res)
    let responses = res

    for (const response of responses) {
        // console.log(response.expenses);

        cardMaker(response);

    }
    updateCard();
})




// SUBMIT FORM
backEnd.addEventListener("submit", (evt) => {
    evt.preventDefault();
    console.log(evt.target.parentElement)
    debugger

    // INCOME
    let name = document.querySelector("#name");
    let yrSalary = document.querySelector(".yrSalary");

    let incomeObject = calculate(yrSalary.value, name.value);
    // console.log(name.value, yrSalary.value);


    // EXPENSE
    let foodExpense = document.querySelector(".foodExpense");
    let travelExpense = document.querySelector(".travelExpense");
    let otherExpense = document.querySelector(".otherExpense");
    // console.log(foodExpense.value, travelExpense.value, otherExpense.value);

    let allExpenses = [
        {
            category: "food",
            amount: foodExpense.value
        },
        {
            category: "travel",
            amount: travelExpense.value
        },
        {
            category: "other",
            amount: otherExpense.value
        }
    ]



    // POST fetch INCOME && EXPENSES
    fetch("http://localhost:3000/incomes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            income: incomeObject,
            expense: allExpenses
        })
    })
    .then(r => r.json())
    .then(res => {
        console.log(res)

        // make another card
        cardMaker(res);
        // make another edit event listener for newly made card
        updateCard();



    })


})





// TOGGLE class to show and hide  all examples
viewSelector.addEventListener("click", () => {
    cardSelector.classList.toggle("hide");
})







// Make EDIT eventListener for each card made
let updateCard = () => {
    let cardClicks = document.querySelectorAll(".card-1");

    for (const cardClick of cardClicks) {
        cardClick.addEventListener("click", (evt) => {
            // console.log(evt.target.parentElement.parentElement.parentElement.dataset.id)

            let id = evt.target.parentElement.parentElement.parentElement.dataset.id;
            let selectedBox = evt.target.parentElement.parentElement.parentElement

            console.log(selectedBox)

            editModal.classList.add("overlay")

            fetch(`http://localhost:3000/incomes/${id}`)
            .then(r => r.json())
            .then(res => {
                console.log(res)

                // make Modal form
                createEditForm(res);

                // select Edit Submit button
                let newSubmitForEdit = document.querySelector(".sendEdit");

                
                
                
                // EDIT SUBMIT is Clicked
                newSubmitForEdit.addEventListener("submit", (evt) => {
                    evt.preventDefault();
                    
                    // select INCOME Edit
                    let name = document.querySelector("#nameEdit");
                    let yrSalary = document.querySelector(".yrSalaryEdit");
                    console.log(yrSalary.value, name.value)
                    

                    let incomeObject = calculate(yrSalary.value, name.value);
                    // console.log(name.value, yrSalary.value);


                    // select EXPENSE Edit
                    let foodExpense = document.querySelector(".foodExpenseEdit");
                    let travelExpense = document.querySelector(".travelExpenseEdit");
                    let otherExpense = document.querySelector(".otherExpenseEdit");
                    // console.log(foodExpense.value, travelExpense.value, otherExpense.value);

                    let allExpenses = [
                        {
                            category: "food",
                            amount: foodExpense.value
                        },
                        {
                            category: "travel",
                            amount: travelExpense.value
                        },
                        {
                            category: "other",
                            amount: otherExpense.value
                        }
                    ]


                    fetch(`http://localhost:3000/incomes/${id}`, {
                        method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            income: incomeObject,
                            expense: allExpenses
                        })
                    })
                    .then(updateRes => {
                        editModal.innerHTML = ``;
                        editModal.classList.remove("overlay");

                        selectedBox.innerHTML = ``;

                        selectedBox.innerHTML = `
                                <div class="row">
                                    <div class="col incomeSection">
                                        <br>
                                        <h5>INCOME</h5>
                                        <br>
                                        <h6> Name: ${incomeObject.name}</h6>
                                        <h6>Yearly: $ ${incomeObject.yearly}</h6>
                                        <h6>Monthly: $ ${incomeObject.monthly}</h6>
                                        <h6>Weekly: $ ${incomeObject.weekly}</h6>
                                        <h6>Daily: $ ${incomeObject.daily}</h6>
                                    </div>

                                    <div class="col expenseSection">
                                        <br>
                                        <h5>EXPENSE </h5>
                                        <br>
                                        <h6>Category: ${allExpenses[0].category}</h6>
                                        <h6>Amount: ${allExpenses[0].amount}</h6>
                                        <br>
                                        <h6>Category: ${allExpenses[1].category}</h6>
                                        <h6>Amount: ${allExpenses[1].amount}</h6>
                                        <br>
                                        <h6>Category: ${allExpenses[2].category}</h6>
                                        <h6>Amount: ${allExpenses[2].amount}</h6>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col">
                                        <a class="button" href="#popup1">Edit</a>
                                    </div>
                                </div> 
                        `;

                        
                    })
                    

                })

            })


        })
    }


}








//FUNCTION to make INCOME/EXPENSE card
let cardMaker = (jsonRes) => {
    cardSelector.innerHTML +=
     `
        <div class="card card-1" data-id="${jsonRes.id}">
            <div class="row">
                <div class="col incomeSection">
                    <br>
                    <h5>INCOME</h5>
                    <br>
                    <h6> Name: ${jsonRes.name}</h6>
                    <h6>Yearly: $ ${jsonRes.yearly}</h6>
                    <h6>Monthly: $ ${jsonRes.monthly}</h6>
                    <h6>Weekly: $ ${jsonRes.weekly}</h6>
                    <h6>Daily: $ ${jsonRes.daily}</h6>
                </div>

                <div class="col expenseSection">
                    <br>
                    <h5>EXPENSE </h5>
                    <br>
                    <h6>Category: ${jsonRes.expenses[0].category}</h6>
                    <h6>Amount: ${jsonRes.expenses[0].amount}</h6>
                    <br>
                    <h6>Category: ${jsonRes.expenses[1].category}</h6>
                    <h6>Amount: ${jsonRes.expenses[1].amount}</h6>
                    <br>
                    <h6>Category: ${jsonRes.expenses[2].category}</h6>
                    <h6>Amount: ${jsonRes.expenses[2].amount}</h6>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <a class="button" href="#popup1">Edit</a>
                </div>
            </div>
        </div>
        `;

}









// FUNCTION to make Edit modal
let createEditForm = (jsonRes) => {
    editModal.innerHTML = `
    <div class="popup">
        <h2>EDIT</h2>
        <a class="close" href="#">&times;</a>
        <div class="content">
            <div class="container">

                <form class="sendEdit">
            
                    <div class="row">
                        <div class="col">
                            <h3>Yearly Income</h3>
                            <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" id="nameEdit" placeholder="${jsonRes.name}" value="${jsonRes.name}">
                            </div>
                            <div class="form-group">
                            <label for="yearlySalary">How Much do you make a Year?</label>
                            <input type="number" class="form-control yrSalaryEdit" id="yearlySalary" placeholder="${jsonRes.yearly}" value="${jsonRes.yearly}">
                            <small id="emailHelp" class="form-text text-muted">We will Transform this into Monthly, Weekly, and Daily Cash you have Available</small>
                            </div> 
                        </div>
                
                        <div class="col">
                            <h3>Expenses</h3>
                            <div class="form-group">
                            <label for="foodExpense">How much do you spend on <strong>FOOD</strong> in a <strong>DAILY</strong> Basis</label>
                            <input type="number" class="form-control foodExpenseEdit" id="foodExpense" placeholder="${jsonRes.expenses[0].amount}" value="${jsonRes.expenses[0].amount}">
                            </div>
                            <div class="form-group">
                            <label for="travelExpense">How much do you spend on <strong>TRAVEL</strong> in a <strong>MONTHLY</strong> Basis</label>
                            <input type="number" class="form-control travelExpenseEdit" id="travelExpense" placeholder="${jsonRes.expenses[1].amount}" value="${jsonRes.expenses[1].amount}">
                            </div>
                            <div class="form-group">
                            <label for="other">What are your <strong>OTHER EXPENSES</strong> in a <strong>MONTHLY</strong> Basis</label>
                            <input type="number" class="form-control otherExpenseEdit" id="other" placeholder="${jsonRes.expenses[2].amount}" value="${jsonRes.expenses[2].amount}">
                            <small id="emailHelp" class="form-text text-muted">Other Expenses include total amount for credit card payments, Insurance, Rent, etc.</small>
                            </div> 
                        </div>
                    </div>
            
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form> 
            
            
            </div>
        </div>
    </div>`;
}






// ********************** CALCULATIONS *************************************

// convert YEARLY SALARY 
let calculate = (yearly, name) => {
    let yearSal = yearly
    let monthly = Math.round(yearSal / 12);
    let weekly = Math.round(yearSal / 52);
    let daily = Math.round(yearSal / 365);
     console.log(monthly, weekly, daily); 
    
    makeIntoObj = {
        name: name,
        yearly: yearSal,
        weekly: weekly,
        daily: daily,
        monthly: monthly
    } 

    return makeIntoObj;
}





// convert DAILY FOOD EXPENSE
let dailyFood = (dailyAmount) => {
    let yearly = Math.round(dailyAmount * 365);
    let monthly = Math.round(yearly / 12);
    let weekly = Math.round(yearly / 52);


    console.log(yearly, monthly, weekly)
}

