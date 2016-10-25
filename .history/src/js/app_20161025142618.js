class View{
  setResults(result){
    $('#result').text(result);
  }
  getCodes(){
    let textareas = ;
    let codes = textareas.map(function(v){
      return v.val();
    })
    return codes;
  }
}

class Controller{}

class Model{
  
}



var v = new View();
v.setResults(123213);