/*
 Asynchronous message bus it Javascript.

 Events are
 */

var newHouse = (function () {
  var house = {};
  var publicMethods = {
    listen: function (room, expiration, fn) {
      if (!house[room]) house[room] = {listeners: []}
      house[room].listeners.push(fn)
      setTimeout(removeListenerFn(house[room], fn), expiration);
    },
    speak: function (room, data) {
      setTimeout(function () {
        tellListeners(room, room, data)
      }, 0)
    }
  }

  var removeListenerFn = function (rm, fn) {
    return function () {
      for (var i = 0; i < rm.listeners.length; i++) {
        if (rm.listeners[i] == fn) {
          rm.listeners.splice(i, 1);
        }
      }
    }
  }

//  var splitChannel = function (ch) {
//    return ch.split(/#\./)
//  }
//  function millis() {
//    return (new Date()).getTime();
//  }

  var tellListeners = function (targetRoom, room, data) {
//    console.log('tellListeners', targetRoom, room)
    if (!room) return
    if (house[room]) {
      var ls = house[room].listeners
      if (ls) {
        for (var i = 0; i < ls.length; i++)
          ls[i](targetRoom, data)
      }
    }
    if (room.indexOf('#') >= 0) {
      tellListeners(targetRoom, room.split('#')[0], data)
    } else {
      var roomParts = room.split('.')
      if (roomParts.length > 1) {
        roomParts.pop()
        if (room.substr(-2) == '.*') roomParts.pop()
        var newRoom = roomParts.length > 0  ? roomParts.join('.') + '.*' : '*'
          tellListeners(targetRoom, newRoom, data)
      }
    }
  }

  return publicMethods
})

describe('house', function () {
  var spy, house;
  beforeEach(function () {
    house = newHouse()
    clock.install();
    spy = jasmine.createSpy('listener')
  })

  beforeEach(function () {
    house.listen('*', 10000, function(room, data) {
      console.log(room, data)
    })
  });

  it('listens when spoken to', function () {
    house.listen('foo#bang', 2, spy)
    house.speak('foo#bang', 'shoot')
    expect(spy).not.toHaveBeenCalled()
    clock.tick(1)
    expect(spy).toHaveBeenCalledWith('foo#bang', 'shoot')
  })

  it('listens on channel for multiple messages', function () {
    house.listen('foo.bar', 1, spy)
    house.speak('foo.bar#bang', 'shoot')
    clock.tick(1)
    expect(spy).toHaveBeenCalledWith('foo.bar#bang', 'shoot')
  })

  it('listens to wildcards', function () {
    house.listen('foo.*', 1, spy)
    house.speak('foo.bar#bang', 'shoot')
    expect(spy).not.toHaveBeenCalled()
    clock.tick(1)
    expect(spy).toHaveBeenCalledWith('foo.bar#bang', 'shoot')
  })

  it('listens to everything', function () {
    house.listen('*', 1, spy)
    house.speak('foo.bar#bang', 'shoot')
    expect(spy).not.toHaveBeenCalled()
    clock.tick(1)
    expect(spy).toHaveBeenCalledWith('foo.bar#bang', 'shoot')
  })

  it('listens any number of times', function () {
    house.listen('foo#bang', 2, spy)
    house.speak('foo#bang', 'shoot')
    house.speak('foo#bang', 'sham')
    house.speak('foo#bang', 'shingle')
    expect(spy).not.toHaveBeenCalled()
    expect(spy).not.toHaveBeenCalled()
    expect(spy).not.toHaveBeenCalled()
    clock.tick(1)
    expect(spy).toHaveBeenCalledWith('foo#bang', 'shoot')
    expect(spy).toHaveBeenCalledWith('foo#bang', 'sham')
    expect(spy).toHaveBeenCalledWith('foo#bang', 'shingle')
  })

  it('expires listeners', function () {
    house.listen('foo#bang', 2, spy)
    clock.tick(3)
    house.speak('foo#bang', 'shoot')
    clock.tick(1)
    expect(spy).not.toHaveBeenCalled()
  })

  xit('calls optional expiration fn', function () {
    var expirationSpy = jasmine.createSpy('expiration')
    house.listen('foo#bang', 2, spy, expirationSpy)
    clock.tick(3)
    expect(expirationSpy).toHaveBeenCalledWith('foo#bang', spy)
  })

  describe('multiple listeners', function () {
    var spy1, spy2
    beforeEach(function () {
      spy1 = jasmine.createSpy('listener #1')
      spy2 = jasmine.createSpy('listener #2')
    });
    it('listens only to the right channel', function () {
      house.listen('foo#bang', 1, spy1)
      house.listen('foo#bunk', 1, spy2)
      house.speak('foo#bang', 'shoot')
      clock.tick(1)
      expect(spy1).toHaveBeenCalledWith('foo#bang', 'shoot')
      expect(spy2).not.toHaveBeenCalled()
    })
    it('allows multiple listeners', function () {
      house.listen('foo#bang', 1, spy1)
      house.listen('foo#bang', 1, spy2)
      house.speak('foo#bang', 'shoot')
      clock.tick(1)
      expect(spy1).toHaveBeenCalledWith('foo#bang', 'shoot')
      expect(spy2).toHaveBeenCalledWith('foo#bang', 'shoot')
    })

  })

  describe('connector', function() {


  })

})