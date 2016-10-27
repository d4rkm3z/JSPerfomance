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