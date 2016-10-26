class Model {
    constructor() {
        this.calculates = [];
    }

    setLengthCalculate(length) {
        this.calculates = new Array(length);
    }

    addCalculate(obj) {
        let id = Number(obj.id) || 0;
        let value = Number(obj.value) || 0;
        if (this.calculates[id] === undefined) {
            this.calculates[id] = [];
        }
        this.calculates[id] = value + Number(this.calculates[id]);
    }

    getCalculates() {
        return this.calculates;
    }
}
