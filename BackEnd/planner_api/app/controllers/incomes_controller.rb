class IncomesController < ApplicationController

    def index
        @incomes = Income.all
        render json: @incomes, include: "**"
    end

    def show
        @income = Income.find(params[:id])
        render json: @income, include: "**"
    end

    def create
        
        @income = Income.create(params.require("income").permit(:name, :yearly, :monthly, :weekly, :daily))
        
        params[:expense].each do |expenseParam|
            @income.expenses.create(expenseParam.permit(:category, :amount))
        end

        render json: @income
    end

    def update 
        @income = Income.find(params[:id])
        @income.update(income_params)
    end

    def destroy
        @income = Income.find(params[:id])
        @income.destroy
    end


    # private

    # def income_params
    #     params.permit(:name, :yearly, :monthly, :weekly, :daily)
    # end




end
