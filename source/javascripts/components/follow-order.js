class FollowOrder {
  constructor () {
    this.keyword = 'order'
    this.ask = document.getElementById(`follow-${this.keyword}-ask`)
    this.form = document.getElementById(`follow-${this.keyword}-form`)
    if (this.form != null) {
      this.order = this.form.querySelector("input[name='id']")
      this.response = document.getElementById(`follow-${this.keyword}-response`)
      this.responseProduct = this.response.querySelector('table.products tbody')
      this.form.addEventListener('submit', this.getOrder.bind(this))
    }
  }
  getOrder () {
    event.preventDefault()
    fetch(`https://capsule-admin.herokuapp.com/order/${this.order.value}.json`).then((response) => {
      response.json().then((json) => {
        this.pageLayout(json)
      })
    })
  }
  pageLayout (json) {
    this.ask.classList.add('hide')
    this.response.classList.remove('hide')

    let dataOrder = this.response.querySelectorAll(`[data-${this.keyword}]`)

    this.productList(json['products'])

    for (let i = 0; i < dataOrder.length; i++) {
      let keys = Object.keys(dataOrder[i].dataset)
      for (let j = 0; j < keys.length; j++) {
        let data = this.getData(json, this.dataLayout(keys[j]))
        if (keys[j].length > this.keyword.length && data != null && keys[j] != 'orderTrackingUrl') {
          dataOrder[i].innerHTML = data
        } else if (keys[j] == 'orderTrackingUrl' && data != null) {
          dataOrder[i].href = data
        }
      }
    }
  }
  dataLayout (k) {
    let result = k.replace('order', '')
                  .replace(/([A-Z])/g, '-$1')
                  .substr(1)
                  .toLowerCase()
                  .split("-")

    for (let i = 0; i < result.length; i++) {
      result[i] = [result[i]]
    }

    return result
  }
  getData (json, k) {
    let data = json
    for (let i = 0; i < k.length; i++) {
      data = data[k[i]]
    }
    return data
  }
  productList (products) {
    let el = this.responseProduct.querySelector('tr')
    for (let k in products) {
      if (parseInt(k) > 0) {
        el = this.addProduct()
      }
      this.productLayout(products[k], el)
    }
  }
  addProduct () {
    let el = this.responseProduct.querySelector('tr').cloneNode(true)
    // el.querySelector('[data-name]').innerHTML
    this.responseProduct.appendChild(el)
    return el
  }
  productLayout (p, el) {
    let lines = el.querySelectorAll('[data-product]')
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].dataset.product == 'image') {
        lines[i].src = p[lines[i].dataset.product]
      } else if (lines[i].dataset.product == 'name') {
        lines[i].innerHTML = p['name']
        for (let k = 0; k < p['custom'].length; k++) {
          lines[i].innerHTML += ' - ' + Object.values(p['custom'][k])
        }
      } else {
        lines[i].innerHTML = p[lines[i].dataset.product]
      }
    }
  }
}

export default new FollowOrder
