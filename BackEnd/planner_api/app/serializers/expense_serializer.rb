class ExpenseSerializer < ActiveModel::Serializer
  attributes :id, :category, :amount
end
