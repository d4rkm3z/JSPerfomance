class View{
  setResults(result){
    $('#result').text(result);
  }
}

var v = new View();
v.setResults(123213);