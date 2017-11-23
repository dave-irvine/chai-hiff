var colors = require('colors/safe'),
    hiff = require('hiff');

function processChange(change) {
    return colors.reset('\t') + 'In node ' + change.before.parentPath + ':\n\t' + change.message;
}

module.exports = function(chai) {
    var Assertion = chai.Assertion;

    Assertion.addChainableMethod('hiffEqual', function (expected) {
        var actual = this._obj;
        var result = hiff.compare(expected, actual);
        var changes = result.different ? result.changes.map(processChange).join('\n') : '';

        this.assert(
            !result.different,
            'expected html to match, but there were these changes: \n\n' + changes,
            'expected #{act} to not match #{exp}',
            expected,
            actual,
            true
        );
    });
};
