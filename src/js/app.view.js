class ProgressBarView {
    constructor() {
        this.progressBars = $('.progress-bar');
    }

    /** set value of progress bar */
    setValue(data, elem) {
        elem.attr('aria-valuenow', data);
        elem.css('width', data + '%');
        elem.text(data);
    }

    getAll() {
        return this.progressBars;
    }

    reset() {
        let self = this;
        this.progressBars.each(function (k, v) {
            self.setValue(0, $(v));
        });
    }
}

class Button{
    constructor(button){
        this.button = button;
    }
    toggleStatus(){
        if (!!this.button.attr('disabled')) {
            this.button.attr('disabled', false);
        } else {
            this.button.attr('disabled', 'disabled');
        }
    }
}

class View {
    constructor() {
        this.progressBar = new ProgressBarView();
        this.buttonStart = new Button($('#calculate'));
        this.buttonStop = new Button($('#stopCalculate'));
    }

    setResults(data) {
        this.buttonStart.toggleStatus();
        this.buttonStop.toggleStatus();

        let message = '';
        if (data.error) {
            for(let el of data) {
                $($('textarea')[Number(el.id)]).toggleClass('error');
                message += `${el.error}\n`;
            }
        }
        else {
            $($('textarea')[Number(data.id)]).toggleClass('faster');
            message = data.text;
        }
        $('#result').text(message);

    }

    initialize() {
        this.clearForm();
        this.progressBar.reset();
        this.buttonStart.toggleStatus();
        this.buttonStop.toggleStatus();
    }

    getFragmentCodes() {
        this.initialize();

        let codes = [];
        let textareas = $('.span-snippets textarea');
        for (let i of textareas) {
            codes.push(i.value);
        }
        return codes;
    }

    getAllProgressBars() {
        return this.progressBar.getAll();
    }

    updateProgress(data, e) {
        let elem = $(e.target);
        this.progressBar.setValue(data, elem);
    }

    clearForm() {
        $($('textarea')).removeClass('faster');
        $($('textarea')).removeClass('error');
    }
}