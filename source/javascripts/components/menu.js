class Menu {
  constructor () {
    this.button = document.getElementById('menu')
    this.nav = document.querySelector('nav')
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
    console.log('show')
  }
  hide () {
    document.body.style.overflow = 'inherit'
    this.nav.classList.remove('visible')
    this.footer.classList.remove('visible')
    console.log('hide')
  }
}

export default new Menu
