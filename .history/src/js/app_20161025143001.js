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
//
class Controller{}

//model
class Model{
  
}



var v = new View();
v.setResults(123213);