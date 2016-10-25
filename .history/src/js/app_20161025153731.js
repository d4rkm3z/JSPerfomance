'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//view
var View = function () {
  function View() {
    _classCallCheck(this, View);
  }

  _createClass(View, [{
    key: 'setResults',
    value: function setResults(result) {
      $('#result').text(result);
    }
  }, {
    key: 'getFragmentCodes',
    value: function getFragmentCodes() {
      var codes = $('.span-snippets textarea').map(function (k, v) {
        return $(v).val();
      });
      return codes;
    }
  }]);

  return View;
}();

//controller


var CalculateTime = function () {
  function CalculateTime() {
    _classCallCheck(this, CalculateTime);
  }

  _createClass(CalculateTime, [{
    key: 'getWorkedTime',
    value: function getWorkedTime() {
      this.elapsed = new Date() - this._start;
    }
  }, {
    key: 'start',
    value: function start() {
      this._start = new Date();
    }
  }]);

  return CalculateTime;
}();

var CalculateResults = function () {
  function CalculateResults(mediator) {
    _classCallCheck(this, CalculateResults);

    this.mediator = mediator;
    this.calculates = this.mediator.model.getCalculates();
    this._mean = [];
  }

  _createClass(CalculateResults, [{
    key: 'getMeanValue',
    value: function getMeanValue() {
      for (var i in this.calculates) {
        var fragmentCalculates = this.calculates[i];
        this._mean[i] = fragmentCalculates.reduce(function (a, b) {
          return a + b;
        }) / fragmentCalculates.length;
      }

      return this._mean;
    }
  }]);

  return CalculateResults;
}();

var TestCode = function () {
  function TestCode(mediator) {
    _classCallCheck(this, TestCode);

    this.mediator = mediator;
    this.calculateTime = mediator.calculateTime;
  }

  _createClass(TestCode, [{
    key: 'addCalculate',
    value: function addCalculate(obj) {
      this.mediator.addCalculate(obj);
    }
  }, {
    key: 'runTest',
    value: function runTest(fragmentCodes) {
      for (var i in fragmentCodes) {
        for (var _i = 1000; _i >= 0; _i--) {
          this.calculateTime.start();
          this.runCalculate(fragmentCodes[_i]);
          var workedTime = this.calculateTime.getWorkedTime();
          this.addCalculate({
            id: _i,
            value: workedTime
          });
        }
      }
    }
  }, {
    key: 'runCalculate',
    value: function runCalculate() {
      eval(this.code);
    }
  }]);

  return TestCode;
}();

var Controller = function () {
  function Controller() {
    _classCallCheck(this, Controller);

    this.view = new View();
    this.model = new Model();

    this.calculateTime = new CalculateTime();
    this.calculateResults = new CalculateResults(this);
    this.testCode = new TestCode(this);
  }

  _createClass(Controller, [{
    key: 'runCompare',
    value: function runCompare() {
      this.fragmentCodes = this.view.getFragmentCodes();
      this.result = this.testCode.runTest(this.fragmentCodes);
      this.setResult();
    }
  }, {
    key: 'addCalculate',
    value: function addCalculate(obj) {
      this.model.addCalculate(obj);
    }
  }, {
    key: 'setResult',
    value: function setResult() {
      this.view(this.result);
    }
  }]);

  return Controller;
}();

//model


var Model = function () {
  function Model() {
    _classCallCheck(this, Model);

    this.calculates = [];
  }

  _createClass(Model, [{
    key: 'addCalculate',
    value: function addCalculate(obj) {
      debugger;
      this.calculates[obj.id].push(obj.value);
    }
  }, {
    key: 'getCalculates',
    value: function getCalculates() {
      return this.calculates;
    }
  }]);

  return Model;
}();

var app = new Controller();
$('#calculate').on('click', app.runCompare);