module SnipcartHelper

  def snipcart_product_url(p)
    return config[:host] +
           (locale != I18n.default_locale ? '/' + lang.to_s : '') + '/' +
           t("paths.catalog") + '/' +
           p[locale].path
  end

  def snipcart_button (p, text)
    args = {
      "class" => "snipcart-add-item snipcart__buy-button",
      "data-item-id" => p.id,
      "data-item-price" => p.price.to_json.to_s,
      "data-item-name" => p[locale].name,
      "data-item-max-quantity" => p.max_quantity,
      "data-item-url" => snipcart_product_url(p),
      "data-item-image" => p.image
    }

    p.options.each_with_index do |option, i|
      data = snipcart_array_it(option[1].inStocks)
      args["data-item-custom#{i}-name"] = t("snipcart.#{option[0]}")
      args["data-item-custom#{i}-options"] = data
      args["data-item-custom#{i}-value"] = ''
    end

    content_tag :button, args do
      text
    end
  end

  def snipcart_array_it(a)
    s = ""
    if a.is_a?(Hash)
      a.each_with_index do |(k, v), i|
        if i == a.length - 1
          s += k
        else
          s += (k + "|")
        end
      end
    else
      a.each_with_index do |v, i|
        if i == a.length - 1
          s += v
        else
          s += (v + "|")
        end
      end
    end
    return s
  end

end
