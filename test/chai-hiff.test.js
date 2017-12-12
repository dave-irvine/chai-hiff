var chai = require('chai');
var expect = chai.expect;

chai.use(require('../'));

describe('chai-hiff', function () {
    describe('.hiffEqual()', function () {
        it('should match some differing but equivalent HTML', function () {
            expect(function () {
                expect('<input name="my-input" value="stuff">').to.hiffEqual('<input value="stuff" name="my-input">');
            }).not.to.throw();
        });

        it('should not match some non-equivalent HTML', function () {
            expect(function () {
                expect('<input name="my-input" value="stuff">').to.hiffEqual('<div class="a-div"></div>');
            }).to.throw('expected html to match, but there were these changes');
        });
    });

    describe('.hiff.equal()', function () {
        it('should match some differing but equivalent HTML', function () {
            expect(function () {
                expect('<input name="my-input" value="stuff">').to.hiff.equal('<input value="stuff" name="my-input">');
            }).not.to.throw();
        });

        it('should not match some non-equivalent HTML', function () {
            expect(function () {
                expect('<input name="my-input" value="stuff">').to.hiff.equal('<div class="a-div"></div>');
            }).to.throw('expected html to match, but there were these changes');
        });
    });

    describe('.not.hiff.equal()', function () {
        it('should not match some differing but equivalent HTML', function () {
            var actual = '<input name="my-input" value="stuff">';
            var expected = '<input name="my-input" value="stuff">';
            expect(function () {
                expect(actual).not.to.hiff.equal(expected);
            }).to.throw("expected '" + actual + "' to not match '" + expected + "'");
        });

        it('should match some non-equivalent HTML', function () {
            expect(function () {
                expect('<input name="my-input" value="stuff">').not.to.hiff.equal('<div class="a-div"></div>');
            }).not.to.throw();
        });
    });
});
