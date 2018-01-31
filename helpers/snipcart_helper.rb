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
      "id" => "buy-" + p.id.to_s,
      "data-item-id" => p.id,
      "data-item-price" => p.price.to_json.to_s,
      "data-item-name" => p[locale].name,
      "data-item-max-quantity" => p.max_quantity,
      "data-item-url" => snipcart_product_url(p),
      "data-item-image" => p.image['face'],
      "data-item-quantity" => 1,
      "data-item-weight" => p.shipping.weight,
      "data-item-width" => p.shipping.width,
      "data-item-length" => p.shipping.length,
      "data-item-height" => p.shipping.height
    }

    if p.options
      p.options.each_with_index do |option, i|
        data = snipcart_array_it(option[1].inStocks)
        args["data-item-custom#{i}-name"] = option[0]
        args["data-item-custom#{i}-options"] = data
        args["data-item-custom#{i}-value"] = ''
      end
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
