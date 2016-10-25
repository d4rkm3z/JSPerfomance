class View{
  setResults(result){
    $('#result').text(result);
  }
}

class Controller{}

var v = new View();
v.setResults(123213);