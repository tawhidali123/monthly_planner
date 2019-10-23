class IncomeSerializer < ActiveModel::Serializer
  attributes :id, :name, :yearly, :monthly, :weekly, :daily
  has_many :expenses
end
