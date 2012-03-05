class InvoicesController < ApplicationController
  def index
    @invoices = Invoice.all
  end
  # new invoice
  def new
    @invoice = Invoice.new
    5.times{ @invoice.line_items.build }
  end
  # create invoice
  def create
    puts "=================================#{params[:invoice]}"
    @invoice = Invoice.new(params[:invoice])
    if @invoice.save
      flash[:notice] = "Successfully Invoice Created"
      redirect_to root_url
    else
      render "new"
    end
  end
  # edit invoice
  def edit
    @invoice = Invoice.find(params[:id])
  end
  # update invoice
  def update
    puts "=======================#{params[:invoice][:line_items_attributes]}"
    @invoice = Invoice.find(params[:id])
    if @invoice.update_attributes(params[:invoice])
      flash[:notice] = "Successfully Invoice Edited"
      redirect_to root_url
    else
      render :action => 'edit'
    end
  end
  # delete invoice
  def destroy
    @invoice = Invoice.find(params[:id])
    if @invoice.destroy
      flash[:notice] = "Successfully Invoice Deleted"
      redirect_to root_url
    end
  end

  def change
    if !params[:id].blank?
      @products = Product.find(params[:id])
      puts "==============#{params[:id]}"
      render :text => @products.to_json
    else
      render :text => ""
    end
  end

  def show
    @invoice = Invoice.find(params[:id])
    puts "==========================#{@invoice}"
    render :layout => false
  end

 
end
