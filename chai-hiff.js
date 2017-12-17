var hiff = require('hiff');

function processChange(change) {
  return 'In node ' + change.before.parentPath + ':\n\t' + change.message;
}

function obj(chaiContext) {
  return chaiContext._obj; // eslint-disable-line no-underscore-dangle
}

function createMethod(flag, hiffCheck) {
  return function getHiffMethod(_super) {
    return function hiffMethod() {
      var meth = flag(this, 'hiff') ? hiffCheck : _super;
      meth.apply(this, arguments);
    };
  };
}

function hiffEqual(expected, options) {
  var actual = obj(this);
  var result = hiff.compare(expected, actual, options);
  var changes = result.different ? result.changes.map(processChange).join('\n') : '';

  this.assert(
    !result.different,
    'expected html to match, but there were these changes: \n\n' + changes,
    'expected #{act} to not match #{exp}',
    expected,
    actual,
    true
  );
}

module.exports = function chaiHiff(chai, utils) {
  var Assertion = chai.Assertion;
  var flag = utils.flag;
  var equal = createMethod(flag, hiffEqual);

  Assertion.addMethod('hiffEqual', hiffEqual);
  Assertion.addMethod('hiffEquals', hiffEqual);
  Assertion.addMethod('hiffEq', hiffEqual);
  Assertion.addProperty('hiff', function hiffProp() {
    flag(this, 'hiff', true);
  });

  Assertion.overwriteMethod('equal', equal);
  Assertion.overwriteMethod('equals', equal);
  Assertion.overwriteMethod('eq', equal);
};
