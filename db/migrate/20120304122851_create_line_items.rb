class CreateLineItems < ActiveRecord::Migration
  def change
    create_table :line_items do |t|
      t.integer    :invoice_id
      t.integer    :product_id
      t.integer    :quantity
      t.string     :description
      t.float      :unitprice
      t.float      :amount
      t.float      :tax
      t.float      :total_amount
      t.timestamps
    end
  end
end