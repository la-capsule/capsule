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

    if (p.colors.inStocks)
      colors = snipcart_array_it(p.colors.inStocks)
      args["data-item-custom1-name"] = t('snipcart.colors')
      args["data-item-custom1-options"] = colors
      args["data-item-custom1-value"] = '#696969'
    end

    if (p.sizes.inStocks)
      sizes = snipcart_array_it(p.sizes.inStocks)
      args["data-item-custom2-name"] = t('snipcart.sizes')
      args["data-item-custom2-options"] = sizes
      args["data-item-custom2-value"] = 'S'
    end

    content_tag :button, args do
      text
    end
  end

  def snipcart_array_it(a)
    a.to_s.tr('[]', '').tr(',', '|').tr('""', '').tr(' ', '')
  end

end
