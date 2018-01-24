class ProductImage {
  constructor () {
    this.els = document.getElementsByClassName('product-image')
    if (this.els != null) {
      for (let i = 0; i < this.els.length; i++) {
        let el = this.els[i]
        this.imgList = el.getElementsByTagName('img')
        this.dots = []
        this.addSelector(el)
        this.process(el)
      }
    }
  }
  process (el) {
    let select = el.querySelector('#select')
    for (let i = 0; i < this.imgList.length; i++) {
      this.addDots(i, select)
    }
  }
  addSelector (el) {
    el.appendChild(document.createElement('div')).setAttribute("id", "select")
  }
  addDots (i, select) {
    let el = document.createElement('span')
    select.appendChild(el)
          .setAttribute('class', 'dot')
    this.dots.push(el)
    el.addEventListener('mouseover', () => {
      this.event(i, el)
    })
  }
  event (i, dot) {
    for (let j = 0; j < this.imgList.length; j++) {
      if (j == i) {
        this.imgList[j].classList.add('select')
        this.dots[j].classList.add('select')
      } else {
        this.imgList[j].classList.remove('select')
        this.dots[j].classList.remove('select')
      }
    }
  }
}

export default new ProductImage
