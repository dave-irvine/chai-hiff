var colors = require('colors/safe'),
    hiff = require('hiff');

module.exports = function(chai, utils) {
    var Assertion = chai.Assertion;

    Assertion.addChainableMethod('hiffEqual', function (expected) {
        var actual = this._obj;

        var result = hiff.compare(expected, actual);
        var changes = [];

        if (result.different) {
            result.changes.map(function(change) {
                changes.push(colors.reset('\t') + 'In node ' + change.before.parentPath + ':\n\t' + change.message);
            });
        }

        this.assert(
            !result.different,
            'expected html to match, but there were these changes: \n\n' + changes.join('\n'),
            'expected #{act} to not match #{exp}',
            expected,
            actual,
            true
        );
    });
};
