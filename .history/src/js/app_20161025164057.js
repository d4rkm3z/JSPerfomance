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
    this.elapsed = new Date().getTime() - this._start;
    return this.elapsed;
  }
  start() { 
    this._start = new Date().getTime();
  }
}
class CalculateResults {
  constructor(mediator) {
    this.mediator = mediator;
    this.calculates = this.mediator.model.getCalculates();
    this._mean = [];
  }
  getPerfectScript(){
    for (let i in this.calculates) {
      this._mean[i] = this.calculates[i] / 1000;
    }

    let result = this._mean.indexOf(Math.max(this._mean));
    return result;
  }
}
class TestCode {
  constructor(mediator) {
    this.mediator = mediator;
    this.calculateTime = CalculateTime();
  }
  addCalculate(obj) {
    this.mediator.addCalculate(obj);
  }
  runTest(fragmentCodes) {
    for (let i in fragmentCodes) {
      for (let j = 0; j <= 1000; j++) {
        this.calculateTime.start();
        this.runCalculate(fragmentCodes[i]);
        let workedTime = this.calculateTime.getWorkedTime();
        console.log(workedTime);
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
    self.setResult(self.calculateResults.getPerfectScript());
  }
  addCalculate(obj) {
    self.model.addCalculate(obj)
  }
  setResult(){
    self.view.setResults(self.result);
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
      this.calculates[id] = [];
    }
    console.log(id,value);
    this.calculates[id] = Number(value) + Number(this.calculates[id]);
  }
  getCalculates() {
    return this.calculates;
  }
}

var app = new Controller();
$('#calculate').on('click', app.runCompare);