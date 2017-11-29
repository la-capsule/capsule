# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions
activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

# External pipeline
activate :external_pipeline,
  name: :webpack,
  command: build? ? './node_modules/webpack/bin/webpack.js --bail' : './node_modules/webpack/bin/webpack.js --watch -d',
  source: ".tmp/dist",
  latency: 1

# Pretty URLs
activate :directory_indexes
# Localization
activate :i18n, :mount_at_root => :fr
# Using asset helpers
activate :asset_hash

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false
page 'sitemap.xml', layout: false

# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

# Helpers
# Requires all helpers
Dir["helpers/*.rb"].each {|file| require file }
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/
helpers ApplicationHelper

# Middleman i18n can't convert page URL to another language. This is the solution.
require "lib/url_middleware"
helpers URLHelper

# Middleman fails to reload on helpers edit. This is the solution.
Dir['helpers/*'].each(&method(:load))


# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

configure :development do
  config[:host] = "http://localhost:4567"
  activate :livereload
  activate :scss_lint
end

configure :build do

  # "Ignore" JS so webpack has full control.
  ignore { |path| path =~ /\/(.*)\.js$/ && $1 != 'all' }
  activate :relative_assets

  config[:host] = "https://bastienrobert.fr"

  activate :minify_html
  activate :minify_css
  activate :minify_javascript
  activate :imageoptim
  activate :gzip
  activate :critical

  # SEO
  activate :sitemap, :gzip => false, :hostname => config[:host]
  # Robots
  activate :robots,
    :rules => [
      {:user_agent => '*', :allow => %w(/)}
    ],
    :sitemap => config[:host] + "/sitemap.xml"
end

configure :server do
  ready do
    files.on_change :source do |changed|
      changed_js = changed.select do |f|
        f[:full_path].extname === '.js' && !f[:full_path].to_s.include?('.tmp')
      end

      if changed_js.length > 0
        puts "== Linting Javascript"

        changed_js.each do |file|
          puts `./node_modules/eslint/bin/eslint.js #{file[:full_path]}`
        end
      end
    end
  end
end
