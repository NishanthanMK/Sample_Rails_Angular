class VisitorsController < ApplicationController
  # respond_to :json
  def index
    respond_to do |format|
      format.json { render json: Visitor.all }
      format.html
    end
  end

  def create
    @visitor = Visitor.new(visitor_params)
    respond_to do |format|
      if @visitor.save
        format.json { render json: @visitor, status: :created }
        format.html
      else
        format.json { render json: @visitor.errors, status: :unprocessable_entity }
        format.html
      end
    end
  end

  def update
    @visitor = Visitor.find(params[:id])
    @visitor.update_attributes(visitor_params)
    respond_to do |format|
      format.json { render json: @visitor }
      format.html
    end
  end

  def destroy
    @visitor = Visitor.destroy(params[:id])
    respond_to do |format|
      format.json { render json: @visitor }
      format.html
    end
  end

  private
  def visitor_params
    params.require(:visitor).permit(:first_name, :last_name, :reason)
  end
end
