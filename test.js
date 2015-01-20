var assert = require('assert')
  , gauge = require('./')

describe('history tracker', function () {

  it('tracks the min max for the current day', function () {
    var results = gauge([], {current: 10})
    assert.equal(results.min, 10)
    assert.equal(results.max, 10)
    assert.equal(results.current, 10)
    assert.equal(results.history[0].min, 10)
    assert.equal(results.history[0].max, 10)
  })

})
