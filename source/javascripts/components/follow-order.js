class FollowOrder {
  constructor () {
    this.form = document.getElementById('follow-order')
    if (this.form != null) {
      this.order = this.form.querySelector("input[name='id']")
      this.result = document.getElementById('follow-order-reponse')
      this.form.addEventListener('submit', this.getOrder.bind(this))
    }
  }
  getOrder () {
    event.preventDefault()
    fetch("https://capsule-admin.herokuapp.com/order/" + this.order.value + ".json").then((response) => {
      response.json().then((json) => {
        this.layout(json)
      })
    })
  }
  layout (json) {
    this.result.innerHTML = JSON.stringify(json)
  }
}

export default new FollowOrder
