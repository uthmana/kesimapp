export default class KesimApp {
  constructor(element, kesimView) {
    this.element = element;
    this.kesimView = kesimView;
  }

  static init() {
    console.log("Kesim app starting......");
    this.element.innerHTML = this.kesimView;
  }

  //    this.init()
}
