import Vue from 'vue/dist/vue.js'
import App from './components/App.vue'

// Set snipcart default currency
Snipcart.api.cart.currency('usd');

new Vue({
  render: h => h(App)
}).$mount('#app')
