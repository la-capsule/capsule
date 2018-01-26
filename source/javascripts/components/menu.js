class Menu {
  constructor () {
    this.button = document.getElementById('menu')
    this.nav = document.querySelector('nav')
    this.header = document.querySelector('header')
    this.footer = document.querySelector('footer')
    this.button.addEventListener('click', this.onClick.bind(this))
  }
  onClick () {
    this.button.classList.toggle('visible') ? this.show() : this.hide()
  }
  show () {
    document.body.style.overflow = 'hidden'
    this.nav.classList.add('visible')
    this.footer.classList.add('visible')
    this.header.classList.add('white')
    console.log('show')
  }
  hide () {
    document.body.style.overflow = 'inherit'
    this.nav.classList.remove('visible')
    this.footer.classList.remove('visible')
    this.header.classList.remove('white')
    console.log('hide')
  }
}

export default new Menu
