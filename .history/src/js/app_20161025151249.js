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
  constructor(mediator) {
    this.mediator = mediator;
    this.calculates = this.mediator.model.getCalculates();
    this._mean = [];
  }
  getMeanValue() {
    for (let i in this.calculates){
      this._mean[i] = this.calculates.reduce(function(a, b) {
  return a + b;
});
    }
  }
}
class TestCode {
  constructor(mediator) {
    this.mediator = mediator;
    this.calculateTime = mediator.calculateTime;
  }
  addCalculate(id, workedTime){
    this.mediator.addCalculate();
  }
  runTest(fragmentCodes) {
    for (let i in fragmentCodes) {
      calculateTime.start();
      let workedTime = calculateTime.getWorkedTime();
      this.addCalculate({i, workedTime});
    }
  }
}
class Controller {
  constructor() {
    this.view = new View();
    this.fragmentCodes = this.view.getFragmentCodes();
    this.model = new Model(this.fragmentCodes.length);

    this.calculateTime = new CalculateTime();
    this.calculateResults = new CalculateResults(this);
    this.testCode = new TestCode(this);
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
  getCalculates(){
    return this.calculates;
  }
}

var app = new Controller();