'strict';

var Listener = {
};

var gObjectListeners = {};

var Broadcaster = {
  // bind to event
  on: function (event, fn, params, that) {
    gObjectListeners[this] = gObjectListeners[this] || {};
    gObjectListeners[this][event] = gObjectListeners[this][event] || [];
    gObjectListeners[this][event].push({fn: fn, params: params, that: that});
  },

  _trigger: function (event, data) {
    if (gObjectListeners[this] && gObjectListeners[this][event]) {
      var listeners = gObjectListeners[this][event];
      for (var i = 0; i < listeners.length; i++) {
        var handler = listeners[i];
        handler.fn.call(handler.that || this, handler.params);
      }
    }
  }
};


var Model = {

};

var MetaModel = {
  watched: [],
  dirty: [],
  lastState: {},

  watch: function (model) {
    this.watched.push(model);
    this.saveState(model);
  },

  saveState: function (model) {
    this.lastState[model] = this.clone(model);
  },

  isDirty: function (model) {
    return this.equal(model, this.lastState[model]);
  },

  checkForDirt: function (model) {
    if (this.isDirty(model)) {
      if (this.dirty.indexOf(model) === -1) {
        this.dirty.push(model);
      }
      this.saveState(model);
    }
  },

  clone: function (model) {
    return jQuery.extend({}, model);
  },

  equal: function (obj1, obj2) {
    return _.isEqual(obj1, obj2);
    for (var i in obj1) {
      if (obj1.hasOwnProperty(i)) {
        if (!obj2.hasOwnProperty(i)) {
          return false;
        }
        if (obj1[i] !== obj2[i]) {
          return false;
        }
      }
    }
    for (var i in obj2) {
      if (obj2.hasOwnProperty(i)) {
        if (!obj1.hasOwnProperty(i)) {
          return false;
        }
        if (obj1[i] !== obj2[i]) {
          return false;
        }
      }
    }
    return true;
  }
};


describe("model", function () {
  it("should initialize", function () {
    expect(true).toBeFalsy();
  });

});