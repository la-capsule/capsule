class Faq {
  constructor () {
    this.faq = document.getElementById('faq')
    if (this.faq != null) {
      this.questions = this.faq.getElementsByClassName('question')
      this.active = this.faq.querySelector('.question.more')
      this.init()
    }
  }
  init () {
    for (let i = 0; i < this.questions.length; i++) {
      this.questions[i].addEventListener('click', () => {
        this.active = this.questions[i]
        this.event()
      })
    }
  }
  event () {
    this.active.classList.replace('less', 'more')
    for (let i = 0; i < this.questions.length; i++) {
      this.questions[i] != this.active ? this.questions[i].classList.replace('more', 'less') : false
    }
  }
}

export default new Faq
