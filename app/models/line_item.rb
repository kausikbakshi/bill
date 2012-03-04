class LineItem < ActiveRecord::Base
  belongs_to :invoice
  attr_accessible :quantity ,:invoice_id, :product_id, :description, :unitprice, :amount, :tax, :total_amount
  
end
