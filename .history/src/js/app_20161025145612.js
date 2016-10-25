//view
class View {
  setResults(result) {
    $('#result').text(result);
  }
  getFragmentCodes() {
    let codes = $('.span-snippets textarea').map(function (k, v) {
      return $(v).val();
    })
    return codes;
  }
}

//controller
class CalculateTime {
  constructor(){
  }
  getWorkedTime() {
    this.elapsed = Date.getTime() - this._start;
  }
  start() {
    this._start = Date.getTime();
  }
}
class CalculateResults {
  constructor() {}
  getMeanValue() {

  }
}
class TestCode {
  constructor() {}
  runTest() {
    for (let i in this.fragmentCodes) {
      calculateTime.start();
      let workedTime = calculateTime.getWorkedTime();
      this.model(id, workedTime);
    }
  }
}
class Controller {
  constructor() {
    this.view = new View();
    this.fragmentCodes = this.view.getFragmentCodes();
    this.model = new Model(this.fragmentCodes.length);

    this.calculateTime = new CalculateTime();
    this.calculateResults = new Calculate
    this.testCode = new TestCode();
  }
  runCalculates() {

  }
}

//model
class Model {
  constructor(length) {
    this.calculates = new Array(length);
  }
  addCalculate(id, value) {
    this.calculates[id].push(value);
  }
}

var app = new Controller();