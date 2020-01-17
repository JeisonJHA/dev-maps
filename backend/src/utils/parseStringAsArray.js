module.exports = function(arrayAsString) {
  return arrayAsString.split(",").map(t => t.trim());
};
