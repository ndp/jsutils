'strict';

Object.prototype.pp = function () {
  var s = '[object';
  for (p in this) {
    if (this.hasOwnProperty(p)) {
      s += ' ';
      s += p;
      s += ': ';
      s += typeof this[p] == 'object' ? 'object' : this[p];
    }
  }
  s += ']';
  return s;
}


var Airwave = {
  init: function() {},
  pub: function(channel, key, params) {

  },

  sub: function(channel, key, fn) {

  }

}

//var gObjectListeners = {};
//
//var Broadcaster = {
//  // bind to event
//  on: function (event, fn, params, that) {
//    gObjectListeners[this] = gObjectListeners[this] || {};
//    gObjectListeners[this][event] = gObjectListeners[this][event] || [];
//    gObjectListeners[this][event].push({fn: fn, params: params, that: that});
//  },
//
//  _trigger: function (event, data) {
//    if (gObjectListeners[this] && gObjectListeners[this][event]) {
//      var listeners = gObjectListeners[this][event];
//      for (var i = 0; i < listeners.length; i++) {
//        var handler = listeners[i];
//        handler.fn.call(handler.that || this, handler.params);
//      }
//    }
//  }
//};


function foldIn(dest, src, methods) {
  var m = _.map(methods.split(','), function (s) {
    return $.trim(s)
  });
  _.each(m, function (meth, i) {
    console.log(meth);
    dest[meth] = function () {
      var args = _.toArray(arguments);
      args.unshift(this);
      return src[meth].apply(src, args);
    }
  })
}


var MetaModel = {

  init: function () {
    this.dirties = new HashSet();
    this.clonedStates = new Hashtable();
  },

  watch: function (model) {
    if (typeof model == 'object' && model !== null && !this.isWatched(model)) {
      this.markClean(model);
    }
  },

  isWatched: function (model) {
    return model !== undefined &&
        model !== null &&
        (this.dirties.contains(model) || this.clonedStates.containsKey(model));
  },

  isDirty: function (model) {
    if (this.dirties[model]) return true;
    var lastState = this.clonedStates.get(model);
    if (lastState) {
      return !this._equal(model, lastState);
    }
  },

  findDirty: function () {
    var that = this;
    _.each(this.clonedStates.keys(), function (model) {
      var lastState = that.clonedStates.get(model);
      if (!that._equal(model, lastState)) {
        that.markDirty(model);
      }
    });
  },

  markDirty: function (model) {
    this.dirties.add(model);
  },

  markClean: function (model) {
    if (this.dirties.contains(model)) {
      this.dirties.remove(model);
    };
    this.clonedStates.put(model, this._clone(model));
  },

  _clone: function (model) {
    var o = new Object();
    for (p in model) {
      if (model.hasOwnProperty(p)) {
        o[p] = model[p];
      }
    }
    return o;
  },

  _equal: function (obj1, obj2) {
    return _.isEqual(obj1, obj2);
  },

  _hashCode: function (model) {
    var s = '';
    for (var p in model) {
      s += model[p].toString();
    }
    var hash = 0;
    if (s.length == 0) return hash;
    for (i = 0; i < s.length; i++) {
      char = s.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }
};


var Model = new Object();

foldIn(Model, MetaModel, 'watch, isWatched, isDirty');


describe("model", function () {

  beforeEach(function () {
    MetaModel.init();
    expect(MetaModel.dirties.size()).toEqual(0);
    expect(MetaModel.clonedStates.size()).toEqual(0);
  });

  describe("watch", function () {
    it('should do nothing with null', function () {
      expect(MetaModel.isWatched(null)).toBeFalsy();
      MetaModel.watch(null);
      expect(MetaModel.isWatched(null)).toBeFalsy();
    });
    it('should do nothing with undefined', function () {
      expect(MetaModel.isWatched(undefined)).toBeFalsy();
      MetaModel.watch(undefined);
      expect(MetaModel.isWatched(undefined)).toBeFalsy();
    });

    it("should return accurately if an object is watched", function () {
      var o = { a: 1};
      expect(MetaModel.isWatched(o)).toBeFalsy();
      MetaModel.watch(o);
      expect(MetaModel.isWatched(o)).toBeTruthy();
    });
    it("should know if an object is dirty", function () {
      var o = { a: 1};
      expect(MetaModel.isDirty(o)).toBeUndefined();
      MetaModel.watch(o);
      expect(MetaModel.isDirty(o)).toBeFalsy();
      o.b = 2;
      expect(MetaModel.isDirty(o)).toBeTruthy();
    });
  });

  describe('foldIn', function () {
    it("should watch", function () {
      var o = { a: 1};
      o.__proto__ = Model;
      expect(o.isWatched()).toBeFalsy();
      o.watch();
      expect(o.isWatched()).toBeTruthy();

    });

  });

  it("should find dirty", function () {
    var o = new Object();
    o.a = 1;
    o.b = 3;
    o.c = 3;
    MetaModel.watch(o);
    MetaModel.findDirty();

    expect(MetaModel.dirties.size()).toEqual(0);
    expect(MetaModel.isDirty(o)).toBeFalsy();

    o.b++;
    expect(MetaModel.isDirty(o)).toBeTruthy();
    expect(MetaModel.dirties.size()).toEqual(0);

    MetaModel.findDirty();
    expect(MetaModel.dirties.size()).toEqual(1);
    expect(MetaModel.dirties.contains(o)).toBeTruthy();

    o.b++;
    MetaModel.findDirty();
    expect(MetaModel.dirties.size()).toEqual(1);
    expect(MetaModel.dirties.contains(o)).toBeTruthy();

    o.a++;
    MetaModel.findDirty();
    expect(MetaModel.dirties.size()).toEqual(1);
    expect(MetaModel.dirties.contains(o)).toBeTruthy();
  });



  it("should initialize", function () {
    // FF 1 sec == 100,000 items
    for (var i = 0; i < 1000; i++) {
      o = new Object();
      o.a = i;
      o.b = i + 1;

      MetaModel.watch(o);

      if ((i % 10) == 0) {
        o.b++;
      }
    }

    MetaModel.findDirty();

    expect(MetaModel.dirties.size()).toEqual(100);
  });

});

describe(Airwave, function() {

});