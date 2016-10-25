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
    return this.elapsed;
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
      for (let j = 1000; j >= 0; j--) {
        this.calculateTime.start();
        this.runCalculate(fragmentCodes[i]);
debugger;
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
    self.view = new View();
    self.model = new Model();

    self.calculateTime = new CalculateTime();
    self.calculateResults = new CalculateResults(self);
    self.testCode = new TestCode(self);
  }
  runCompare() {
    self.fragmentCodes = self.view.getFragmentCodes();
    self.model.setLengthCalculate(self.fragmentCodes.length);
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
  setLengthCalculate(length){
    this.calculates = new Array(length);
  }
  addCalculate(obj) {
    let id = Number(obj.id);
    let value = obj.value;
    if (this.calculates[id] === undefined){
      this.calculates[id] = 
    }
    this.calculates[id].push(value);
  }
  getCalculates() {
    return this.calculates;
  }
}

var app = new Controller();
$('#calculate').on('click', app.runCompare);