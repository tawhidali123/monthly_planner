# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)




# Income
income1 = Income.create(name: "BillyJean", yearly: 40000,monthly: 3333,weekly: 769,daily: 109)
income2 = Income.create(name: "Aibek", yearly: 55000,monthly: 4583,weekly: 1057,daily: 150)
income3 = Income.create(name: "Franky", yearly: 74000,monthly: 6166,weekly: 1423,daily: 202)
income4 = Income.create(name: "Eric", yearly: 110000,monthly: 9166,weekly: 2115,daily: 301)



# EXPENSE
Expense.create(income: income1, category: "food", amount: 25)
Expense.create(income: income1, category: "travel",amount: 128)
Expense.create(income: income1, category: "other", amount: 1200)

Expense.create(income: income2, category: "food", amount: 15)
Expense.create(income: income2, category: "travel", amount: 220)
Expense.create(income: income2, category: "other", amount: 1800)

Expense.create(income: income3, category: "food", amount: 40)
Expense.create(income: income3, category: "travel", amount: 300)
Expense.create(income: income3, category: "other", amount: 2200)

Expense.create(income: income4, category: "food", amount: 80)
Expense.create(income: income4, category: "travel", amount: 400)
Expense.create(income: income4, category: "other", amount: 4500)







