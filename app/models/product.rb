class Product < ActiveRecord::Base

  attr_accessible :name, :description, :price

  validates :name,  :presence => { :message => "Product name is required" }
  validates :name, :uniqueness => { :case_sensitive => false }
  validates :description,  :presence => { :message => "Description is required" }
  validates :price, :presence => { :message => "Price is required" }
  validates :price, :numericality => { :message => "Please enter only Decimal number" }
end
