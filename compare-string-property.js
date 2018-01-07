module.exports = function(getProperty) {
  return (a, b) => {
    const propA = getProperty(a).toUpperCase()
    const propB = getProperty(b).toUpperCase()
    if (propA < propB) {
      return -1
    }
    if (propA > propB) {
      return 1
    }
    return 0
  }
}
