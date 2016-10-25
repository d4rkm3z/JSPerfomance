//view
import { View }

//controller
class CalculateTime {
  constructor() {
    this._start = 0;
  }
  getWorkedTime() {
    let timeNow = new Date().getTime();
    let elapsed = timeNow - this._start;
    return elapsed;
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
      mean[i] = calculates[i] / 1000;
    }

    let result = mean.indexOf(Math.max(...mean));
    return `Snippet ${result+1} fastly`;
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

      for (let j = 0; j <= 1000; j++) {
        this.calculateTime.start();
        this.runCalculate(fragmentCodes[i]);
        workedTime += this.calculateTime.getWorkedTime();
      }
      console.log(workedTime);
      this.addCalculate({
        id: i,
        value: workedTime
      });
    }
  }
  runCalculate(code) {
    try{
      eval(code);
    } catch(e){
      this.mediator.result = e.message;
    }
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
    self.result = self.calculateResults.getPerfectScript();
    self.setResult();
  }
  addCalculate(obj) {
    self.model.addCalculate(obj)
  }
  setResult() {
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
    this.calculates[id] = Number(value) + Number(this.calculates[id]);
    console.log(this.calculates)
  }
  getCalculates() {
    return this.calculates;
  }
}

var app = new Controller();
$('#calculate').on('click', app.runCompare);