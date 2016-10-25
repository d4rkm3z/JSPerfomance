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
  constructor(mediator) {
    this.mediator = mediator;
    this.calculateTime = new CalculateTime();
  }
  addCalculate(id, workedTime){
    this.mediator.addCalculate();
  }
  runTest(fragmentCodes) {
    for (let i in fragmentCodes) {
      calculateTime.start();
      let workedTime = calculateTime.getWorkedTime();
      this.addCalculate(id, workedTime);
    }
  }
}
class Mediator{

}
class Controller {
  constructor() {
    this.view = new View();
    this.fragmentCodes = this.view.getFragmentCodes();
    this.model = new Model(this.fragmentCodes.length);

    this.calculateResults = new CalculateResults();
    this.testCode = new TestCode();
  }
  runCalculates() {
    this.testCode.runTest(fragmentCodes);
  }
  addCalculate(obj){
    this.model.addCalculate(obj)
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