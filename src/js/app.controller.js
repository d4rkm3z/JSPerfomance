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
    setResultText(fragments) {
        let obj = fragments.filter((value)=>(value.faster))[0];
        obj.text = `Snippet ${obj.number} is faster over ${Number(obj.difference).toPrecision(1)} ms`;
        return obj;
    }
}


/**-----*/


class Validate {
    validateFragments(fragments) {
        for (let i in fragments) {
            try {
                if (!fragments[i].code.length) {
                    fragments[i].error = `Snippet ${Number(i) + 1} is empty`;
                }
                eval(fragments[i].code);
            } catch (e) {
                fragments[i].error = e;
            }
        }
        return fragments;
    }
}

class Fragments {
    setFragmentsCode(data) {
        this.fragments = [];
        for (let i in data) {
            if (!this.fragments.hasOwnProperty(i)) {
                this.fragments[i] = [];
            }
            this.fragments[i].code = data[i];
            this.fragments[i].id = Number(i);
            this.fragments[i].number = Number(i) + 1;
        }
    }

    setProgressBar(data) {
        for (let i in this.fragments) {
            this.fragments[i].progressBar = data[i];
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
    constructor(countStepsLoop) {
        this.countStepsLoop = countStepsLoop;
    }

    computingMean(object) {
        let mean = [];
        for (let i in object) {
            mean[i] = object[i].performance / this.countStepsLoop;
        }
        let id = mean.indexOf(Math.min(...mean));
        let difference = Math.abs(mean[0] - mean[1]);

        object[id].faster = true;
        object[id].difference = difference;

        return object;
    }
}
class TestingCode {
    constructor(countStepsLoop) {
        this.performance = new ComputingPerformanceTime();
        this.countStepsLoop = countStepsLoop;
        this.timeout = [];
    }

    asyncStartCode(progressBar, codeFragment) {
        this.stopped = false;
        this.timeout.push(setTimeout(doLoop, 0));

        let workedTime = 0;
        let self = this;
        let j = 0;
        let deferred = new $.Deferred();


        function doLoop() {
            self.performance.start();
            eval(codeFragment);
            workedTime += self.performance.getWorkedTime();
            $(progressBar).trigger('update', j / 10);

            j++;
            if (j <= 1000 && !self.stopped) {
                self.timeout.push(setTimeout(doLoop, 0));
            } else {
                clearTimeout(self.stop());
                deferred.resolve(workedTime);
            }
        }

        doLoop();
        return deferred.promise();
    }

    stop() {
        this.stopped = true;
        for (let id in this.timeout) {
            window.clearTimeout(id);
        }
    }
}
class Controller {
    constructor() {
        this.view = new View();
        let countStepsLoop = 1000;

        this.fragmentsModel = new Fragments();
        this.testingCode = new TestingCode(countStepsLoop);
        this.computingMeanResults = new ComputingMeanResults(countStepsLoop);
        this.progressBars = this.view.getAllProgressBars();
    }

    runCompare() {
        let self = this;
        this.fragmentsModel.setFragmentsCode(this.view.getFragmentCodes());
        this.fragmentsModel.setProgressBar(this.progressBars);
        //this.model.setLengthCalculate(this.fragmentsModel.getFragments.length);
        if (this.validate()) {
            this.addEventListeners();

            this.computingPerformance().then(function () {
                let fragments = self.fragmentsModel.getFragments();
                self.computingMean();
                let text = self.setResultText(fragments)
                self.setResult(text);
            });
        } else {
            let result = self.fragmentsModel.getFragments().filter((val)=>(val.error));
            result.error = true;
            self.setResult(result);
        }
    }

    addEventListeners() {
        let self = this;
        for (let i in this.fragmentsModel.getFragments()) {
            let progressBar = this.progressBars[i];
            $(progressBar).on('update', function (e, data) {
                self.view.updateProgress(data, e);
            });
        }
    }

    validate() {
        let validate = new Validate();
        let resultValidate = validate.validateFragments(this.fragmentsModel.getFragments());
        this.fragmentsModel.setFragments(resultValidate);
        if (resultValidate.filter((val)=>(val.error)).length>0) {
            return false;
        } else {
            return true;
        }
    }

    computingPerformance() {
        let self = this;
        let fragments = this.fragmentsModel.getFragments();
        let promises = [];

        for (let i in fragments) {
            let fragment = fragments[i];

            promises.push(this.asyncComputingPerformance(fragment.progressBar, fragment.code).then(function (data) {
                fragment.performance = data;
            }));
        }
        return $.when(...promises).then(function () {
            self.fragmentsModel.setFragments(fragments);
        });
    }

    /**
     * @returns {Promise}
     * Promise return worktime of script
     */
    asyncComputingPerformance(progressBar, code) {
        let self = this;
        return self.testingCode.asyncStartCode(progressBar, code);

    }

    computingMean() {
        let fragments = this.fragmentsModel.getFragments();
        fragments = this.computingMeanResults.computingMean(fragments);
        this.fragmentsModel.setFragments(fragments);
    }

    setResultText(fragments) {
        let adaptingResults = new AdaptingResults();
        return adaptingResults.setResultText(fragments);
    }

    setResult(data) {
        this.view.setResults(data);
    }

    stop() {
        this.testingCode.stop();
    }
}