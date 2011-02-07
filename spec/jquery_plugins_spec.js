describe('delegateEvent', function() {

    var a, b;

    beforeEach(function() {
        a = {};
        b = {};
    });

    describe('to another object', function() {
        beforeEach(function() {
            $(a).bindAndDelegate('e', b);
        });

        it('should trigger other event', function() {
            var spy = jasmine.createSpy();
            $(b).bind('e', spy);
            $(a).trigger('e');
            expect(spy).toHaveBeenCalled();
        });

    });

    describe('to another object with rename', function() {
        beforeEach(function() {
            $(a).bindAndDelegate('e', b, 'f');
        });

        it('should trigger other event', function() {
            var spye = jasmine.createSpy();
            var spyf = jasmine.createSpy();
            $(b).bind('e', spye);
            $(b).bind('f', spyf);
            $(a).trigger('e');
            expect(spye).not.toHaveBeenCalled();
            expect(spyf).toHaveBeenCalled();
        });

    });


});

