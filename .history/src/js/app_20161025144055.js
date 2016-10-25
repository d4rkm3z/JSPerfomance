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
    this.model = new Model();
  }
  runCalculates(){

  }
}

//model
class Model{
  constructor(){
    this.fragments = [];
    this.calculates = [];
  }
}

var app = new Controller();