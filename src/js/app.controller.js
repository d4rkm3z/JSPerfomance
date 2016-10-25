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
    console.log(calculates);
    let mean = [];

    for (let i in calculates) {
      mean[i] = calculates[i] / 1000;
    }

    let result = mean.indexOf(Math.min(...mean));
    return `Snippet ${result+1} is fastest`;
  }
}
class TestCode {
  constructor(mediator) {
    this.mediator = mediator;
    this.calculateTime = mediator.calculateTime;
    this.loopSteps = mediator.loopSteps;
  }
  addCalculate(obj) {
    this.mediator.addCalculate(obj);
  }
  runTest(fragmentCodes) {
    for (let i in fragmentCodes) {
      let workedTime = 0;

      for (let j = 0; j <= 1000; j++) {
        this.calculateTime.start();
        this._runCalculate(fragmentCodes[i]);
        workedTime += this.calculateTime.getWorkedTime();
      }
      this.addCalculate({
        id: i,
        value: workedTime
      });
    }
  }
  _runCalculate(code) {
    try{
      eval(code);
    } catch(e){
      this.mediator.result = e.message;
    }
  }
}
class PrintResult{
  setRusult(){}
  setError(){}
  setprogressBar(){}
}
class Controller {
  constructor() {
    self = this;
    self.view = new View();
    self.model = new Model();
    self.loopSteps = 1000;

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