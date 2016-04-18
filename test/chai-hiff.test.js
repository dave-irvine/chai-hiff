var chai = require('chai'),
    expect = chai.expect;

chai.use(require('../'));

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
