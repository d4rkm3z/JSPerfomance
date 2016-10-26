class ComputingPerformanceTime {
    constructor() {
        this._start = 0;
    }

    getWorkedTime() {
        let timeNow, elapsed;
        timeNow = performance.now();
        elapsed = timeNow - this._start;
        return elapsed;
    }

    start() {
        this._start = performance.now();
    }
}



class AdaptingResults {
    setResultText(obj) {
        let obj = this.mediator.result || {};
        this.mediator.result.text = `Snippet ${obj[Object.keys(obj)[1]]} is faster over ${obj[Object.keys(obj)[2]]} ms`;
    }
}


/**-----*/

class ProgressBar {
    constructor(progressBars){
        this.progressBars = progressBars;
    }
    setListener(id, callback){
        $(this.progressBars[id]).on('changeValue', callback);
    }
    updateValue(data){
        $(this.progressBar).trigger('changeValue', [data]);
    }
}
class AppError {
    sendError(data) {
        throw new Error(data);
    }
}

class Validate {
    constructor() {
        this.error = new AppError();
    }

    validateFragments(fragments) {
        for (let i in fragments) {
            try {
                if (!fragments[i].length) error.sendError(`Snippet ${i + 1} is empty`);
                eval(fragments[i]);
            } catch (e) {
                error.sendError(e);
            }
            if (!result) {
                error.sendError(result);
            }
        }
    }
}

class TestingCode {
    constructor(countStepsLoop) {
        this.performance = new ComputingPerformanceTime();
        this.countStepsLoop = countStepsLoop;
    }

    startCode(progressBar, codeFragment) {
        let workedTime = 0;
        for (let j = 0; j <= this.countStepsLoop; j++) {
            this.performance.start();
            eval(codeFragment);
            progressBar.updateValue();
            workedTime += this.performance.getWorkedTime();
        }
        return workedTime;
    }
}

class Fragments {
    constructor() {
        this.fragments = [];
    }

    setFragmentsCode(data) {
        for (let i in data) {
            if (!this.fragments.hasOwnProperty(i)) {
                this.fragments[i] = [];
            }
            this.fragments[i].code = data[i];
        }
    }

    setFragments(data) {
        this.fragments = data;
    }

    getFragments() {
        return this.fragments;
    }
}

class ComputingMeanResults {
    constructor(countStepsLoop){
        this.countStepsLoop = countStepsLoop;
    }
    computingMean(object) {
        let mean = [];
        for (let i in object) {
            mean[i] = object[i] / this.countStepsLoop;
        }
        let id = mean.indexOf(Math.min(...mean));
        let difference = Math.abs(mean[0] - mean[1]);

        object[id].faster = true;
        object[id].difference = difference;

        return object;
    }
}
class Controller {
    constructor() {
        this.view = new View();
        this.model = new Model();
        let countStepsLoop = 1000;

        self.progress = 0;
        self.error = '';
        self.codes = [];
        self.result = new Object();

        self.calculatingPerfomanceTime = new CalculatingPerformanceTime();
        self.calculateResults = new CalculateResults(self);
        self.testCode = new TestingCode(self);
        self.adaptingResults = new AdaptingResults(self);
        self.fragmentsCodes = new FragmentsCodes(self);

        this.fragmentsModel = new Fragments();
        this.testingCode = new TestingCode(countStepsLoop);
        this.computingMeanResults = new ComputingMeanResults(countStepsLoop);
    }

    runCompare() {
        this.fragmentsModel.setFragmentsCode(this.view.getFragmentCodes());
        //this.model.setLengthCalculate(this.fragmentsModel.getFragments.length);
        this.validate();
        this.computingPerformance();
        this.computingMean();
        this.setResultText();
        this.getPerfectSnippet();
        self.setResult();
    }

    validate() {
        let validate = new Validate();
        validate.validateFragments(this.fragments.getFragments());
    }

    computingPerformance() {
        let progressBarModel = new ProgressBar(this.view.getAllProgressBars());
        let fragments = this.fragmentsModel.getFragments();

        for (let i in fragments) {
            let progressBar = progressBarModel.setListener(i, function(e, data){
                this.setProgressBar(data.value);
            });
            fragments[i].performance = this.testingCode.startCode(progressBar, fragments[i].code);
        }
        this.fragmentsModel.setFragments(fragments);
    }
    computingMean(){
        let fragments = this.fragmentsModel.getFragments();
        fragments = this.computingMeanResults.computingMean(fragments);
        this.fragmentsModel.setFragments(fragments);
    }
    getPerfectSnippet(){
        let fragments = this.fragmentsModel.getFragments();
        return fragments.filter((value)=>(value.performance));
    }
    setResult(data) {
        this.view.setResults(data);
    }

    setProgressBar(data) {
        this.view.updateProgress(data);
    }
}