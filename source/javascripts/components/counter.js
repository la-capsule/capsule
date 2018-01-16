class Counter {
  constructor () {
    this.counters = document.getElementsByClassName('component__product-how-many')
    this.addEvent()
  }
  addEvent () {
    for (let i = 0; i < this.counters.length; i++) {
      let counter = this.counters[i],
          buttons = counter.getElementsByTagName('button')
      for (let j = 0; j < buttons.length; j++) {
        buttons[j].addEventListener('click', (e) => {
          this.process(e.target, counter)
        })
      }
    }
  }
  process (el, c) {
    let n = c.getElementsByTagName('span')[0],
        a = parseInt(n.innerHTML)
    if (el.classList == 'more') {
      n.innerHTML = a + 1
    } else if (a > 1) {
      n.innerHTML = a - 1
    }
  }
}

export default new Counter
