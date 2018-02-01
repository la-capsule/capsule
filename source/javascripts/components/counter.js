class Counter {
  constructor () {
    this.counters = document.getElementsByClassName('component__product-how-many')
    let product = document.getElementById('product')
    if (product != null) {
      let productId = product.dataset.itemId
      let buyButton = product.querySelector('#buy-' + productId)
      this.lastEl
      this.maxQuantity = buyButton.dataset.itemMaxQuantity
    }
    this.addEvent()
  }
  addEvent () {
    for (let i = 0; i < this.counters.length; i++) {
      let counter = this.counters[i],
          buttons = counter.getElementsByTagName('button')
      for (let j = 0; j < buttons.length; j++) {
        buttons[j].addEventListener('click', (e) => {
          e.preventDefault()
          this.process(e.target, counter)
          this.opacity(e.target, counter)
        })
      }
    }
  }
  process (el, c) {
    let n = c.querySelector('span'),
        a = parseInt(n.innerHTML)
    if (el.classList.contains('more') && a < parseInt(this.maxQuantity)) {
      n.innerHTML = a + 1
    } else if (el.classList.contains('less') && a > 1) {
      n.innerHTML = a - 1
    }
  }
  opacity (el, c) {
    c = parseInt(c.querySelector('span').innerHTML)
    this.lastEl == null ? this.lastEl = el : false
    if (el != this.lastEl && this.lastEl.classList.contains('max')) {
      this.lastEl.classList.remove('max')
    } else if (c <= 1 || c >= this.maxQuantity) {
      el.classList.add('max')
    }
    this.lastEl = el
  }
}

export default new Counter
