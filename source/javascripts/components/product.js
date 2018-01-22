class Product {
  // This class is going to edit snipart buy button, to change the data-item-customX-value
  // It's going to tell to Snipcart the good option (size, color...)
  constructor () {
    this.product = document.getElementById('product')
    if (this.product != null) {
      this.productId = this.product.dataset.itemId
      this.buyButton = product.querySelector('#buy-' + this.productId)
      this.buyButtonData = this.buyButton.dataset
      this.pickers = this.product.querySelectorAll('form.picker')
      this.buyButtonDataCustom = this.componentsConstructor()
      this.init()
    }
  }
  componentsConstructor () {
    let forms = this.product.getElementsByTagName('form')
    let customData = {}
    for (let k in this.buyButtonData) {
      if (k.includes('itemCustom') == true) {
        customData[k] = this.buyButtonData[k]
      }
    }
    return customData
  }
  init () {
    for (let i = 0; i < this.pickers.length; i++) {
      this.pickers[i].addEventListener('change', () => {
        let values = this.serializeForm(this.pickers[i])
        this.detectEditItem(values)
      })
    }
  }
  serializeForm (form) {
    var els = form.elements
    var obj = {}
    for(let i = 0; i < els.length; i++){
        var item = els.item(i)
        if (typeof(item.checked) !== 'undefined' && item.checked == true) {
          obj[form.id] = item.value
        } else if (typeof(item.checked) === 'undefined') {
          obj[form.id] = item.value
        }
    }
    return JSON.stringify(obj)
  }
  detectEditItem (value) {
    value = JSON.parse(value)
    for (let k = 0; k < (Object.keys(this.buyButtonDataCustom).length / 3); k++) {
      for (let v in value) {
        if (this.buyButtonDataCustom['itemCustom' + k + 'Name'].toLowerCase() == v.toLowerCase()) {
          this.setValues(value[v], k)
        }
      }
    }
  }
  setValues (value, custom) {
    this.buyButtonData['itemCustom' + custom + 'Value'] = value
  }
}

export default new Product
