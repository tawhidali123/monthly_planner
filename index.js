
// ALL INCOME/EXPENSE CARDS GO HERE
let cardSelector = document.querySelector(".examples");

// SHOW/HIDE ALL CARDS
let viewSelector = document.querySelector(".allItems");

// FORM
let backEnd = document.querySelector(".send");
// let iDoNotWantIt = document.querySelector(".delete");

// MODAL
let editModal = document.querySelector("#popup1");

// Calculate Modal
let calcModal = document.getElementById("calculateModal");


// TOGGLE class to show and hide  all examples
viewSelector.addEventListener("click", () => {
    cardSelector.classList.toggle("hide");
})




// display all users who used their income and expenses as examples
fetch("https://powerful-oasis-31059.herokuapp.com/incomes")
.then(r => r.json())
.then(res => {
    // console.log(res)
    let responses = res

    for (const response of responses) {
        // console.log(response.expenses);

        cardMaker(response);

    }
    updateCard();
    calculateButton()



})







// SUBMIT FORM
backEnd.addEventListener("submit", (evt) => {
    evt.preventDefault();
    console.log(evt.target.parentElement)

    let selectedForm = evt.target.parentElement;
    // debugger

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
    fetch("https://powerful-oasis-31059.herokuapp.com/incomes", {
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

        let refreshForm  = selectedForm.firstElementChild.firstElementChild

        emptyForm(refreshForm)

        console.log(backEnd)

        calculateButton()

    })

})









// Make EDIT eventListener for each card made
let updateCard = () => {
    let cardClicks = document.querySelectorAll(".card-1");

    for (const cardClick of cardClicks) {
        cardClick.addEventListener("click", (evt) => {
            // console.log(evt.target.parentElement.parentElement.parentElement.dataset.id)

            let id = evt.target.parentElement.parentElement.parentElement.dataset.id;
            let selectedBox = evt.target.parentElement.parentElement.parentElement

            // console.log(selectedBox)

            editModal.classList.add("overlay")

            fetch(`https://powerful-oasis-31059.herokuapp.com/incomes/${id}`)
            .then(r => r.json())
            .then(res => {
                // console.log(res)

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


                    // select EXPENSE Edit
                    let foodExpense = document.querySelector(".foodExpenseEdit");
                    let travelExpense = document.querySelector(".travelExpenseEdit");
                    let otherExpense = document.querySelector(".otherExpenseEdit");

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


                    fetch(`https://powerful-oasis-31059.herokuapp.com/incomes/${id}`, {
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
                                        <h6 class="food">Category: ${allExpenses[0].category}</h6>
                                        <h6 class="fAmount">Amount: ${allExpenses[0].amount}</h6>
                                        <br>
                                        <h6 class="travel">Category: ${allExpenses[1].category}</h6>
                                        <h6 class="tAmount">Amount: ${allExpenses[1].amount}</h6>
                                        <br>
                                        <h6 class="other">Category: ${allExpenses[2].category}</h6>
                                        <h6 class="othAmount">Amount: ${allExpenses[2].amount}</h6>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <a class="button" href="#popup1">Edit</a>
                                        <button type="button" class="btn btn-outline-success updated" data-toggle="modal" data-target="#calculateModal">
                                            Calculate
                                        </button>

                                    </div>
                                </div> 
                        `;
                        
                        // calculateButton()
                        // cardSelector.addEventListener("click", (evt) => {
                        //     console.log(evt.target.parentElement.parentElement.parentElement)
                        // })
                        let updatedCalculations = document.querySelectorAll('.updated')

                        for (const updateCalc of updatedCalculations) {
                            // console.log(calcButton)
                            updateCalc.addEventListener("click", (evt) => {
                                let calcBox = evt.target.parentElement.parentElement.parentElement;
                                // console.log(calcBox);
                    
                                let dailyFoodAmount = calcBox.querySelector(".fAmount");
                                let monthlyTravelAmount = calcBox.querySelector(".tAmount");
                                let monthlyOtherAmount = calcBox.querySelector(".othAmount");
                                // console.log(dailyFoodAmount)
                            
                                
                                let foodNumberInside = parseInt(dailyFoodAmount.innerText.slice(8));
                                let travelNumberInside = parseInt(monthlyTravelAmount.innerText.slice(8));
                                let otherNumberInside = parseInt(monthlyOtherAmount.innerText.slice(8));
                                // console.log(numberInside)
                    
                                let convertedFoodExpenses = dailyFood(foodNumberInside);
                                let convertedTravelExpenses = monthlyTravel(travelNumberInside);
                                let convertedOtherExpenses = monthlyOther(otherNumberInside);
                                // console.log(convertedFoodExpenses)
                                // console.log(convertedTravelExpenses)
                                // console.log(convertedOtherExpenses)
                    
                                createCalcModal(convertedFoodExpenses, convertedTravelExpenses, convertedOtherExpenses)
                               
                                
                            }) 
                    
                        }
                        
                        
                    })
                    

                })

            })

        })

        
    }


}





let calculateButton = () => {
    let calcButtons = document.querySelectorAll(".calculate");
 

    for (const calcButton of calcButtons) {
        // console.log(calcButton)
        calcButton.addEventListener("click", (evt) => {
            let calcBox = evt.target.parentElement.parentElement.parentElement;
            // console.log(calcBox);

            let dailyFoodAmount = calcBox.querySelector(".fAmount");
            let monthlyTravelAmount = calcBox.querySelector(".tAmount");
            let monthlyOtherAmount = calcBox.querySelector(".othAmount");
            // console.log(dailyFoodAmount)
        
            
            let foodNumberInside = parseInt(dailyFoodAmount.innerText.slice(9));
            let travelNumberInside = parseInt(monthlyTravelAmount.innerText.slice(9));
            let otherNumberInside = parseInt(monthlyOtherAmount.innerText.slice(9));
            // console.log(numberInside)

            let convertedFoodExpenses = dailyFood(foodNumberInside);
            let convertedTravelExpenses = monthlyTravel(travelNumberInside);
            let convertedOtherExpenses = monthlyOther(otherNumberInside);
            // console.log(convertedFoodExpenses)
            // console.log(convertedTravelExpenses)
            // console.log(convertedOtherExpenses)

            createCalcModal(convertedFoodExpenses, convertedTravelExpenses, convertedOtherExpenses)
           
            
        }) 

    }


}















//************************** */ INNER HTML'S *****************************************



// EMPTY FORM
let emptyForm =  (form) => {
    form.innerHTML = `
        <div class="row">
            <div class="col">
            <h3>Yearly Income</h3>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter Name">
            </div>
            <div class="form-group">
                <label for="yearlySalary">How Much do you make a Year?</label>
                <input type="number" class="form-control yrSalary" id="yearlySalary" placeholder="Yearly Salary" value="">
                <small id="emailHelp" class="form-text text-muted">We will Transform this into Monthly, Weekly, and Daily Cash you have Available</small>
            </div> 
            </div>

            <div class="col">
            <h3>Expenses</h3>
            <div class="form-group">
                <label for="foodExpense">How much do you spend on <strong>FOOD</strong> in a <strong>DAILY</strong> Basis</label>
                <input type="number" class="form-control foodExpense" id="foodExpense" placeholder="Enter Amount">
            </div>
            <div class="form-group">
                <label for="travelExpense">How much do you spend on <strong>TRAVEL</strong> in a <strong>MONTHLY</strong> Basis</label>
                <input type="number" class="form-control travelExpense" id="travelExpense" placeholder="Enter Amount">
            </div>
            <div class="form-group">
                <label for="other">What are your <strong>OTHER EXPENSES</strong> in a <strong>MONTHLY</strong> Basis</label>
                <input type="number" class="form-control otherExpense" id="other" placeholder="Enter Amount">
                <small id="emailHelp" class="form-text text-muted">Other Expenses include total amount for credit card payments, Insurance, Rent, etc.</small>
            </div> 
            </div>
        </div>  
    `;

}








// Make INCOME/EXPENSE card HTML/JSON Response
let cardMaker = (jsonRes) => {
    cardSelector.innerHTML +=
     `
        <div class="card card-1 animated flipInX" data-id="${jsonRes.id}">
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
                    <h6 class="food">Category: ${jsonRes.expenses[0].category}</h6>
                    <h6 class="fAmount">Amount: $${jsonRes.expenses[0].amount}</h6>
                    <br>
                    <h6 class="travel">Category: ${jsonRes.expenses[1].category}</h6>
                    <h6 class="tAmount">Amount: $${jsonRes.expenses[1].amount}</h6>
                    <br>
                    <h6 class="other">Category: ${jsonRes.expenses[2].category}</h6>
                    <h6 class="othAmount">Amount: $${jsonRes.expenses[2].amount}</h6>
                </div>
            </div>
            <div class="btn-group">
                <div class="col">
                    <a class="button" href="#popup1">Edit</a>
                    
                    <button type="button" class="btn btn-outline-success calculate" data-toggle="modal" data-target="#calculateModal">
                        Calculate
                    </button>
                </div>
            </div>
        </div>
        `;



}









// Edit modal HTML
let createEditForm = (jsonRes) => {
    editModal.innerHTML = `
    <div class="popup animated rubberBand">
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



// Calculation Modal
let createCalcModal = (convertedFoodExpenses, convertedTravelExpenses, convertedOtherExpenses) => {
    calcModal.innerHTML = `
                <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Deeper Insight into Expenses</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <h2>Food Expense BreakDown</h2>
                                <ul>
                                    <li>Daily Food: $${convertedFoodExpenses.daily}</li>
                                    <li>Weekly Food: $${convertedFoodExpenses.weeklyAmount}</li>
                                    <li>Monthly Food: $${convertedFoodExpenses.monthlyAmount}</li>
                                    <li>Yearly Food: $${convertedFoodExpenses.yearlyAmount}</li>
                                </ul>
                        </div>  

                        <div>
                            <h2>Travel Expense BreakDown</h2>
                                <ul>
                                    <li>Daily Travel: $${convertedTravelExpenses.dailyAmount}</li>
                                    <li>Weekly Travel: $${convertedTravelExpenses.weeklyAmount}</li>
                                    <li>Monthly Travel: $${convertedTravelExpenses.monthly}</li>
                                    <li>Yearly Travel: $${convertedTravelExpenses.yearlyAmount}</li>
                                </ul>
                        </div> 

                        <div>
                            <h2>Other Expense BreakDown</h2>
                                <ul>
                                    <li>Daily Other: $${convertedOtherExpenses.dailyAmount}</li>
                                    <li>Weekly Other: $${convertedOtherExpenses.weeklyAmount}</li>
                                    <li>Monthly Other: $${convertedOtherExpenses.monthly}</li>
                                    <li>Yearly Other: $${convertedOtherExpenses.yearlyAmount}</li>
                                </ul>
                        </div>    
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>

                </div>
                </div>
            `
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
    let dAmount = dailyAmount
    let yearly = Math.floor(dAmount * 365);
    let monthly = Math.floor(yearly / 12);
    let weekly = Math.floor(yearly / 52);


    // console.log(yearly, monthly, weekly, dAmount)

    dailyAmountObj = {
        daily: dAmount,
        yearlyAmount: yearly,
        monthlyAmount: monthly,
        weeklyAmount: weekly
    }

    return dailyAmountObj;
}


// convert MONTHLY TRAVEL EXPENSE
let monthlyTravel = (monthlyAmount) => {
    let mAmount = monthlyAmount;
    let yearly = Math.round(mAmount * 12);
    let weekly = Math.round(yearly / 52);
    let daily = Math.round(yearly / 365);

    // console.log(yearly, weekly, daily, mAmount)

    monthlyAmountObj = {
        monthly: mAmount,
        yearlyAmount: yearly,
        weeklyAmount: weekly,
        dailyAmount: daily
    }

    return monthlyAmountObj;
}



// convert MONTHLY OTHER EXPENSE
let monthlyOther = (monthlyOther) => {
    let mOtherAmount = monthlyOther;
    let yearly = Math.round(mOtherAmount * 12);
    let weekly = Math.round(yearly / 52);
    let daily = Math.round(yearly / 365);

    // console.log(yearly, weekly, daily, mAmount)

    monthlyOtherAmountObj = {
        monthly: mOtherAmount,
        yearlyAmount: yearly,
        weeklyAmount: weekly,
        dailyAmount: daily
    }

    return monthlyOtherAmountObj;
}

