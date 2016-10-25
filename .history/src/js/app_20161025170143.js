//view
class View {
  setResults(result) {
    $('#result').text(result);
  }
  getFragmentCodes() {
    let codes = [];
    let textareas = $('.span-snippets textarea');
    for (let i of textareas){
      codes.push(i.value);
    }
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
  }
  getPerfectScript() {
    let calculates = this.mediator.model.getCalculates();
    let mean = [];

    for (let i in calculates) {
      mean[i] = calculates[i] / 100;
    }

    let result = mean.indexOf(Math.max(mean));
    return result;
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
      let workedTime = 0;

      for (let j = 0; j <= 100; j++) {
        this.calculateTime.start();
        this.runCalculate(fragmentCodes[i]);
        workedTime += this.calculateTime.getWorkedTime();
      }

      this.addCalculate({
        id: i,
        value: workedTime
      });
    }
  }
  runCalculate() {
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
    self.testCode.runTest(self.fragmentCodes);
    self.setResult(self.calculateResults.getPerfectScript());
  }
  addCalculate(obj) {
    self.model.addCalculate(obj)
  }
  setResult(result) {
    self.view.setResults(self.result);
  }
}

//model
class Model {
  constructor() {
    this.calculates = [];
  }
  setLengthCalculate(length) {
    this.calculates = new Array(length);
  }
  addCalculate(obj) {
    console.log(obj);
    let id = Number(obj.id);
    let value = obj.value;
    if (this.calculates[id] === undefined) {
      this.calculates[id] = [];
    }
    console.log(id, value);
    this.calculates[id] = Number(value) + Number(this.calculates[id]);
  }
  getCalculates() {
    return this.calculates;
  }
}

var app = new Controller();
$('#calculate').on('click', app.runCompare);