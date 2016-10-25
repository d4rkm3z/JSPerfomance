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
  constructor() {}
  getWorkedTime() {
    this.elapsed = new Date - this._start;
  }
  start() {
    this._start = new Date;
  }
}
class CalculateResults {
  constructor(mediator) {
    this.mediator = mediator;
    this.calculates = this.mediator.model.getCalculates();
    this._mean = [];
  }
  getMeanValue() {
    for (let i in this.calculates) {
      let fragmentCalculates = this.calculates[i];
      this._mean[i] = (fragmentCalculates.reduce(function (a, b) {
        return a + b;
      })) / fragmentCalculates.length;
    }

    return this._mean;
  }
}
class TestCode {
  constructor(mediator) {
    this.mediator = mediator;
    this.calculateTime = mediator.calculateTime;
  }
  addCalculate(obj) {
    this.mediator.addCalculate(obj);
  }
  runTest(fragmentCodes) {
    for (let i in fragmentCodes) {
      for (let i = 1000; i >= 0; i--) {
        this.calculateTime.start();
        this.runCalculate(fragmentCodes[i]);
        let workedTime = this.calculateTime.getWorkedTime();
        this.addCalculate({
          id: i,
          value: workedTime
        });
      }
    }
  }
  runCalculate(){
    eval(this.code);
  }
}
class Controller {
  constructor() {
    self = this;
    this.view = new View();
    this.model = new Model();

    this.calculateTime = new CalculateTime();
    this.calculateResults = new CalculateResults(this);
    this.testCode = new TestCode(this);
  }
  runCompare() {
    debugger;
    self.fragmentCodes = self.view.getFragmentCodes();
    self.result = self.testCode.runTest(self.fragmentCodes);
    self.setResult();
  }
  addCalculate(obj) {
    self.model.addCalculate(obj)
  }
  setResult(){
    self.view(self.result);
  }
}

//model
class Model {
  constructor() {
    this.calculates = [];
  }
  addCalculate(obj) {
    this.calculates[obj.id].push(obj.value);
  }
  getCalculates() {
    return this.calculates;
  }
}

var app = new Controller();
$('#calculate').on('click', app.runCompare);