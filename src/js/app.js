var app = new Controller();
$('#calculate').on('click', ()=>app.runCompare());
$('#stopCalculate').on('click', ()=>app.stop());