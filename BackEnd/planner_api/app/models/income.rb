class Income < ApplicationRecord
    has_many :expenses, dependent: :destroy
end
