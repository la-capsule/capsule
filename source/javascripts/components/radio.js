class RadioColor {
  constructor () {
    this.radioArray = this.getRadioArray()
    this.setRadioColors()
  }
  getRadioArray () {
    let inputs = document.getElementsByTagName('input')
    let radios = []
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].type == "radio") {
        radios.push(inputs[i])
      }
    }
    return radios
  }
  setRadioColors () {
    for (let i = 0; i < this.radioArray.length; i++) {
      let color = this.radioArray[i].dataset.color
      this.radioArray[i].style.backgroundColor = color
    }
  }
}

export default new RadioColor
