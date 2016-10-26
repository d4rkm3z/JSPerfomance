class ProgressBarView{
    constructor(progressBar) {
        this.elem = progressBar;
    }

    /** set value of progress bar */
    setValue(data) {
        data = (data > 100 ? 100: data) || 0;
        this.elem.attr('aria-valuenow', data);
        this.elem.css('width', data + '%');
        this.elem.text(data);
    }
    getAll(){
        return $('.progress-bar');
    }
}

class View {
    constructor(){
        this.progressBar = new ProgressBarView($('.progress-bar'));
    }
    setResults(data) {
        $('#result').text(data.text);
        if(data.domID > 1){
            $($('textarea')[data.domID]).toggleClass('faster');
        }
    }

    init(){
        this.clearForm();
    }

    getFragmentCodes() {
        this.init();

        let codes = [];
        let textareas = $('.span-snippets textarea');
        for (let i of textareas) {
            codes.push(i.value);
        }
        return codes;
    }
    getAllProgressBars(){
        return this.progressBar.getAll();
    }
    updateProgress(data) {
        this.progressBar.setValue(data);
    }

    clearForm() {
        $($('textarea')).removeClass('faster');
        this.updateProgress();
    }
}