
  setResults(result) {
    $('#result').text(result);
  }
  getFragmentCodes() {
    let codes = [];
    let textareas = $('.span-snippets textarea');
    for (let i of textareas) {
      codes.push(i.value);
    }
    return codes;
  }
}