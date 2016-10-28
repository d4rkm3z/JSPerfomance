class ProgressBarView {
    constructor() {
        this.progressBars = $('.progress-bar');
    }

    /** set value of progress bar */
    setValue(data, elem) {
        data = data > 100 ? 100 : data;
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

class DomElement {
    constructor(element) {
        this.element = element;
    }

    toggleStatus() {
        if (!!this.element.attr('disabled')) {
            this.element.attr('disabled', false);
        } else {
            this.element.attr('disabled', 'disabled');
        }
    }

    toggleClassElement(className) {
        this.element.toggleClass(className);
    }

    getValue() {
        return this.element.val();
    }

    setValue(val) {
        this.element.val(val);
    }

}

class View {
    constructor() {
        this.progressBar = new ProgressBarView();
        this.buttonStart = new DomElement($('#calculate'));
        this.buttonStop = new DomElement($('#stopCalculate'));
        this.resultSnippet = new DomElement($('#result'));
        this.snippets = [];
        let self = this;

        $('.span-snippets textarea').each(function (k, v) {
            self.snippets.push(new DomElement($(v)));
        });
    }

    setResults(data) {
        this.endWork();

        let message = '';
        if (data.error) {
            for (let el of data) {
                this.snippets[Number(el.id)].toggleClassElement('error');
                message += `${el.error}\n`;
            }
        }
        else {
            this.snippets[Number(data.id)].toggleClassElement('faster');
            message = data.text;
        }

        this.resultSnippet.setValue(message);
    }

    initialize() {
        this.clearForm();
        this.progressBar.reset();
        this.buttonStart.toggleStatus();
        this.buttonStop.toggleStatus();
        $(this.snippets).each((k, v)=>(v.toggleStatus()));
        $(this.progressBar.getAll()).each((k,v)=>($(v).addClass('active')));
    }

    endWork() {
        this.buttonStart.toggleStatus();
        this.buttonStop.toggleStatus();
        $(this.snippets).each((k, v)=>(v.toggleStatus()));
        $(this.progressBar.getAll()).each((k,v)=>($(v).removeClass('active')));
    }

    getFragmentCodes() {
        this.initialize();

        let codes = [];
        $(this.snippets).each((k, v)=>codes.push(v.getValue()));
        return codes;
    }

    getAllProgressBars() {
        return this.progressBar.getAll();
    }

    updateProgress(data, e) {
        let elem = $(e.target);
        console.log(data);
        this.progressBar.setValue(data, elem);

    }

    clearForm() {
        $($('textarea')).removeClass('faster');
        $($('textarea')).removeClass('error');
    }
}