module ApplicationHelper

  # Inspired by https://github.com/thoughtbot/middleman-aria_current
  def nav_link(*arguments, aria_current: "page", **options, &block)
    if block_given?
      text = capture(&block)
      path = arguments[0]
    else
      text = arguments[0]
      path = arguments[1]
    end

    options = options.with_indifferent_access
    current_path = current_page.url.to_s
    current_path.gsub!('/', '') unless current_path == '/'

    if current_path == path
      if options[:class] != nil
        options[:class] += " active"
      else
        options.merge!("class" => "active")
      end
    end

    link_to(text, path, options)
  end

  def is_current_path?(*args)
    args.each do |arg|
      if current_page.url.to_s == arg
        return true
      end
    end
    return false
  end
end
