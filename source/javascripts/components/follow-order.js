class FollowOrder {
  constructor () {
    this.keyword = 'order'
    this.ask = document.getElementById(`follow-${this.keyword}-ask`)
    this.form = document.getElementById(`follow-${this.keyword}-form`)
    if (this.form != null) {
      this.order = this.form.querySelector("input[name='id']")
      this.response = document.getElementById(`follow-${this.keyword}-response`)
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
}

export default new FollowOrder
