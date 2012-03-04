class CreateInvoices < ActiveRecord::Migration
  def change
    create_table :invoices do |t|
      t.float      :total
      t.integer    :status_id
      t.datetime   :due_date
      t.timestamps
    end
  end
end