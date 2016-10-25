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
  }
  start(){
    this._start = Date.getTime();
  }
  stop(){
    this._stop = Date.getTime();
  }
}
class CalculateResults{

}
class Controller{
  constructor(){

  }
}

//model
class Model{
  
}

var app = new Controller();