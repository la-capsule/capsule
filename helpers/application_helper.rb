module ApplicationHelper
  def product_definition(p, v)
    begin
      if locale == :fr
        p[v]
      else
        p.en[v]
      end
    rescue
      p[v]
    end
  end
end
