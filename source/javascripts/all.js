import 'whatwg-fetch'
import Radio from './components/radio.js'
import Counter from './components/counter.js'
import FollowOrder from './components/follow-order.js'
import Product from './components/product.js'
import ProductImage from './components/product-image.js'
import Faq from './components/faq.js'

// Set snipcart default currency
Snipcart.api.cart.currency('eur')

var slider = tns({
  container: '#team',
  items: 3,
  mouseDrag: true,
  gutter: 40,
  edgePadding: 100,
  slideBy: 'page',
  lazyload: true,
  controls: false,
  nav: false
});
