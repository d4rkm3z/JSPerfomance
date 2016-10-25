//model
class Model {
  constructor() {
    this.calculates = [];
  }
  setLengthCalculate(length) {
    this.calculates = new Array(length);
  }
  addCalculate(obj) {
    console.log(obj);
    let id = Number(obj.id);
    let value = obj.value;
    if (this.calculates[id] === undefined) {
      this.calculates[id] = [];
    }
    this.calculates[id] = Number(value) + Number(this.calculates[id]);
    console.log(this.calculates)
  }
  getCalculates() {
    return this.calculates;
  }
}
