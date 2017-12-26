module SnipcartHelper

  def snipcart_button (p, text)
    args = {
      :"class" => "snipcart-add-item",
      :"data-item-id" => p.id,
      :"data-item-price" => p.price.to_json,
      :"data-item-name" => p[locale].name,
      :"data-item-max-quantity" => p.max_quantity,
      :"data-item-url" => p[locale].path,
      :"data-item-image" => p.image
    }

    content_tag :button, args do
      text
    end
  end

end
