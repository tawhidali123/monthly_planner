class CreateExpenses < ActiveRecord::Migration[5.2]
  def change
    create_table :expenses do |t|
      t.belongs_to :income, foreign_key: true
      t.string :category
      t.integer :amount

      t.timestamps
    end
  end
end
