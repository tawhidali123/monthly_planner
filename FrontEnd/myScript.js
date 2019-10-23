let cardSelector = document.querySelector(".examples");
let viewSelector = document.querySelector(".allItems");
let backEnd = document.querySelector(".send");
let iDoNotWantIt = document.querySelector(".delete");

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
})




// SUBMIT FORM
backEnd.addEventListener("submit", (evt) => {
    evt.preventDefault();

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

        cardMaker(res);

    })


})








// TOGGLE class to show and hide  all examples
viewSelector.addEventListener("click", () => {
    cardSelector.classList.toggle("hide");
})



// DELETE something
iDoNotWantIt.addEventListener("click", () => {
    fet
})








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



// POST fetch
// fetch("http://localhost:3000/incomes", {
//     method: "POST",
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(goesToApi)
// })








// convert DAILY FOOD EXPENSE
let dailyFood = (dailyAmount) => {
    let yearly = Math.round(dailyAmount * 365);
    let monthly = Math.round(yearly / 12);
    let weekly = Math.round(yearly / 52);


    console.log(yearly, monthly, weekly)
}




//FUNCTION to make INCOME/EXPENSE card
let cardMaker = (jsonRes) => {
    cardSelector.innerHTML +=
     `
        <div class="card card-1">
            <div class="row">
                <div class="col">
                    <br>
                    <h5>INCOME</h5>
                    <br>
                    <h6> Name: ${jsonRes.name}</h6>
                    <h6>Yearly: $ ${jsonRes.yearly}</h6>
                    <h6>Monthly: $ ${jsonRes.monthly}</h6>
                    <h6>Weekly: $ ${jsonRes.weekly}</h6>
                    <h6>Daily: $ ${jsonRes.daily}</h6>
                </div>

                <div class="col">
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
        </div>
        `;

}


