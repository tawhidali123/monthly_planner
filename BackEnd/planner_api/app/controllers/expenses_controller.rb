class ExpensesController < ApplicationController

    def index
        @expenses = Expense.all
        render json: @expenses
    end

    def show 
        @expense = Expense.all     
    end






end
