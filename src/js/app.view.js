class View {
  setResults(data) {
    $('#result').text(data.text);
    $($('textarea')[data.id]).toggleClass('faster');
  }
  getFragmentCodes() {
    let codes = [];
    let textareas = $('.span-snippets textarea');
    for (let i of textareas) {
      codes.push(i.value);
    }
    return codes;
  }
  showPopover(data){
    $('.btn-compare').popover(data.options).popover('toggle');
  }
  clearForm(){
    $($('textarea')).removeClass('faster');
  }
}