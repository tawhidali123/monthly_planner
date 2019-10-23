class CreateIncomes < ActiveRecord::Migration[5.2]
  def change
    create_table :incomes do |t|
      t.integer :yearly
      t.integer :monthly
      t.integer :weekly
      t.integer :daily
      t.string :name

      t.timestamps
    end
  end
end
