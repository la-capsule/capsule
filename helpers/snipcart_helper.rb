module SnipcartHelper

  def snipcart_product_url(p)
    return config[:host] +
           (locale != I18n.default_locale ? '/' + lang.to_s : '') + '/' +
           t("paths.catalog") + '/' +
           p[locale].path
  end

  def snipcart_button (p, text)
    args = {
      :"class" => "snipcart-add-item",
      :"data-item-id" => p.id,
      :"data-item-price" => p.price.to_json,
      :"data-item-name" => p[locale].name,
      :"data-item-max-quantity" => p.max_quantity,
      :"data-item-url" => snipcart_product_url(p),
      :"data-item-image" => p.image
    }

    content_tag :button, args do
      text
    end
  end

end
