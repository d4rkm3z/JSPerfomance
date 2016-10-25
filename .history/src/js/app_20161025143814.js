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
  
}

//model
class Model{
  
}

var app = new Controller();