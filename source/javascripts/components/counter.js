class Counter {
  constructor () {
    this.counters = document.getElementsByClassName('component__product-how-many')
    let product = document.getElementById('product')
    if (product != null) {
      let productId = product.dataset.itemId
      let buyButton = product.querySelector('#buy-' + productId)
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
        })
      }
    }
  }
  process (el, c) {
    let n = c.querySelector('span'),
        a = parseInt(n.innerHTML)
    if (el.classList == 'more' && a < parseInt(this.maxQuantity)) {
      n.innerHTML = a + 1
    } else if (el.classList == 'less' && a > 1) {
      n.innerHTML = a - 1
    }
  }
}

export default new Counter
