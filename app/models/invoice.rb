class Invoice < ActiveRecord::Base
  has_many :line_items , :dependent => :destroy, :autosave => true

  accepts_nested_attributes_for :line_items , :reject_if => lambda { |a| (a[:quantity].blank? || a[:description].blank? ) }, :allow_destroy => true
end
