module.exports = {
  
  genID: function() {
    return (+new Date() + Math.floor(Math.random() * 999999)).toString(36)
  },
  
  sort: function(array) {
    array.sort(function(a, b) {
      return a.created - b.created
    })
  }
  
}