//view
class View{
  setResults(result){
    $('#result').text(result);
  }
  getFragmentCodes(){
    let codes = $('.span-snippets textarea').map(function(k,v){
      return $(v).val();
    })
    return codes;
  }
}

//controller
class CalculateTime{
  getWorkedTime(){
    this.elapsed = Date.getTime() - this._start;
  }
  start(){
    this._start = Date.getTime();
  }
}
class CalculateResults{

}
class Controller{
  constructor(){
    this.view = new View();
    this.fragmentCodes = this.view.getFragmentCodes();
    this.model = new Model(this.fragmentCodes.length);
  }
  runCalculates(){
    
  }
}

//model
class Model{
  constructor(length){
    this.calculates = new Array(length);
  }
  addCalculate(id, value){
    this.calculates[id].push(value);
  }
}

var app = new Controller();