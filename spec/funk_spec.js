describe('once()', function() {

    var x;
    var inc = function() {
        x++
    }

    beforeEach(function() {
        Funk.reset();
        x = 0;
        Funk.once(inc);
    });

    it('should call first time', function() {
        expect(x).toEqual(1);
    });

    it('should not call a second time', function() {
        Funk.once(inc);
        expect(x).toEqual(1);
    });

    it('should call a second time if different', function() {
        Funk.once(function() {
            inc()
        });
        expect(x).toEqual(2);
    });

    it('should call a second time if declared differently', function() {
        Funk.once(function() {
            x += 1;
        });
        expect(x).toEqual(2);
    });
    it('should not call again if called directly within loop', function() {

        var y = 0;
        for (var i = 0; i < 100; i++) {
            Funk.once(function() {
                y++
            });
            expect(y).toEqual(1);
        }

    });

    it('should pass parameters through', function() {
        var c = 0;
        Funk.once(function(a, b) {
            c = a * b + b;
        }, 2, 3);
        expect(c).toEqual(9);
    });

    it('should return result through', function() {
        expect(Funk.once(function() {
            return 9;
        })).toEqual(9);
    });

});

describe('limit()', function() {

    var x;
    var inc = function() {
        x++
    }
    var limitInc;

    beforeEach(function() {
        Funk.reset();
        limitInc = Funk.limit(inc, 2);
        x = 0;
        limitInc();
    });

    it('should call first time', function() {
        expect(x).toEqual(1);
    });
    it('should call 2nd time', function() {
        limitInc();
        expect(x).toEqual(2);
    });
    it('should not call 3nd time', function() {
        limitInc();
        limitInc();
        expect(x).toEqual(2);
    });

    it('should pass parameters through', function() {
        var c = 0;
        Funk.limit(function(a, b) {
            c = a * b + b;
        }, 1)(2, 3);
        expect(c).toEqual(9);
    });

    it('should return result through', function() {
        expect(Funk.limit(function() {
            return 9;
        }, 1)()).toEqual(9);
    });

});

describe('roundRobin()', function() {
    var a,b,c, rr;
    var fa = function() {
        a++
    }
    var fb = function() {
        b++
    }
    var fc = function() {
        c++
    }
    beforeEach(function() {
        Funk.reset();
        a=0,b=0,c=0;
        rr = Funk.roundRobin(fa,fb,fc);
    });
    it('should not call automatically', function() {
        expect(a).toEqual(0);
        expect(b).toEqual(0);
        expect(c).toEqual(0);
    });

    it('should call first', function() {
        rr();
        expect(a).toEqual(1);
        expect(b).toEqual(0);
        expect(c).toEqual(0);
    });

  it('should call second', function() {
        rr();
        rr();
        expect(a).toEqual(1);
        expect(b).toEqual(1);
        expect(c).toEqual(0);
    });

  it('should call third', function() {
        rr();
        rr();
        rr();
        expect(a).toEqual(1);
        expect(b).toEqual(1);
        expect(c).toEqual(1);
    });

  it('should call fourth', function() {
        rr();
        rr();
        rr();
        rr();
        expect(a).toEqual(2);
        expect(b).toEqual(1);
        expect(c).toEqual(1);
    });


});


describe('throttle', function() {
  it('should call every 100 ms', function() {
    count = 0, throttledCount = 0;
    start = new Date().valueOf();
    fn = Funk.throttle(function() {throttledCount++}, 100)
    while ((new Date().valueOf() - start) < 410) {
      count++;
      fn();
    }
    expect(count).toBeGreaterThan(throttledCount)
    expect(throttledCount).toEqual(5)
  })

  it('should call one final time', function() {
    runs(function() {
      this.throttledCount = 0;
      var that = this;
      fn = Funk.throttle(function() {that.throttledCount++}, 100)
      start = new Date().valueOf();
      while ((new Date().valueOf() - start) < 50) {
        fn();
      }
      expect(this.throttledCount).toEqual(1)
    });
    waits(150);
    runs(function() {
      expect(this.throttledCount).toEqual(2)
    });
    waits(100);
    runs(function() {
      expect(this.throttledCount).toEqual(2)
    });
  });

  it('should call through with parameters', function(){
    var a= 0, b=0;
    fn= Funk.throttle(function(x,y) {a=x;b=y}, 0);
    fn(1,2)
    expect(a).toEqual(1)
    expect(b).toEqual(2)
  });
});

describe('beforeAndAfter', function() {

  var beforeCount,
      beforeFn = function(){beforeCount++},
      afterCount,
      afterFn = function() {afterCount++},
      fn;

  beforeEach(function () {
    beforeCount = 0;
    afterCount = 0;
    fn = Funk.beforeAndAfter(beforeFn, afterFn, 50)
  });

  it("should call before once", function () {
    runs(function() {
      expect(beforeCount).toEqual(0);
      fn();
      expect(beforeCount).toEqual(1);
    });
    waits(100);
    runs(function() {
      expect(beforeCount).toEqual(1);
    });
  });
  it("should call after once", function () {
    runs(function() {
      fn();
      expect(afterCount).toEqual(0);
    });
    waits(100);
    runs(function() {
      expect(afterCount).toEqual(1);
    });
  });

  it("should throttle calls before once", function () {
    runs(function() {
      expect(beforeCount).toEqual(0);
      for (var i = 0; i < 1000; i++) fn();
      expect(beforeCount).toEqual(1);
      expect(afterCount).toEqual(0);
    });
    waits(100);
    runs(function() {
      expect(beforeCount).toEqual(1);
      expect(afterCount).toEqual(1);
    });
  });

  it("should start up again after pause", function () {
    runs(function() {
      expect(beforeCount).toEqual(0);
      for (var i = 0; i < 1000; i++) fn();
      expect(beforeCount).toEqual(1);
      expect(afterCount).toEqual(0);
    });
    waits(100);
    runs(function() {
      expect(beforeCount).toEqual(1);
      expect(afterCount).toEqual(1);
      for (var i = 0; i < 1000; i++) fn();
      expect(beforeCount).toEqual(2);
      expect(afterCount).toEqual(1);
    });
    waits(100);
    runs(function() {
      expect(beforeCount).toEqual(2);
      expect(afterCount).toEqual(2);
    });
  });

});

describe('fn shorteners',function() {
    it('should shorten',function() {
        expect(f('2+2')()).toEqual(4);
    });

});


describe('currying', function() {
   it('should ')
});