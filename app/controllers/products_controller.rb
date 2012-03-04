class ProductsController < ApplicationController
  def index
    @products = Product.all
  end
  #new products
  def new
    @product = Product.new
  end
  #create products
  def create
    @product = Product.new(params[:product])
    if @product.valid?
      @product.save
      flash[:notice] = "Successfully Product Created"
      redirect_to root_url
    else
      render "new"
    end
  end
  #edit products
  def edit
    @product = Product.find(params[:id])
  end
  #update products
  def update
    @product = Product.find(params[:id])
    if @product.update_attributes(params[:product])
      flash[:notice] = "Successfully Product Edited"
      redirect_to root_url
    else
      render :action => 'edit'
    end
  end

  def show
    puts "==========================================product destroy"
  end
  #delete products
  def destroy
    @product = Product.find(params[:id])
    if @product.destroy
      flash[:notice] = "Successfully Product Deleted"
      redirect_to root_url
    end
  end
end
