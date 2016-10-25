//view
class View{
  setResults(result){
    $('#result').text(result);
  }
  getCodes(){
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
  
}
class CalculateResults(){
  
}
class Controller{
  constructor(){

  }
}

//model
class Model{
  
}

var app = new Controller();