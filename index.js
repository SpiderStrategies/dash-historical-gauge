var moment = require('moment')

module.exports = function (history, data) {
  var today = moment.utc().startOf('day')
    , current = data.current
    , max = current
    , min = current

  if (history && history.length) {
    if (history[0].day !== today.toString()) {
      history.unshift({
        day: today.toString(),
        min: current,
        max: current
      })
    }

    history[0].max = history[0].max.value > current.value ? history[0].max : current
    history[0].min = history[0].min.value < current.value ? history[0].min : current

    // Remove the old bastards
    history.length = history.length <= 30 ? history.length : 30

    // Find the real max and min
    max = history.reduce(function (p, c) { return p.max.value > c.max.value ? p : c }, history[0]).max
    min = history.reduce(function (p, c) { return p.min.value < c.min.value ? p : c }, history[0]).min
  } else {
    history = [{
      day: today.toString(),
      max: current,
      min: current
    }]
  }

  var result = {
    min: min,
    max: max,
    current: current,
    history: history
  }

  // use the start/end they sent if they sent them.
  if (typeof data.start !== 'undefined' && data.start !== null) {
    result.start = parseFloat(data.start)
  }
  if (typeof data.end !== 'undefined' && data.end !== null) {
    result.end = parseFloat(data.end)
  }

  return result
}

