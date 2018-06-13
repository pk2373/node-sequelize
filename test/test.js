const assert = require('assert');

function sum(a) {
  return a
}

describe('#hello.js', () => {

  it('sum() should return 0', () => {
    assert.strictEqual(sum(1), 1);
  });
});