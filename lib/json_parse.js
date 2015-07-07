module.exports = function (str) {
  var parsed;
  if (typeof JSON === 'object') {
    parsed = JSON.parse(str);
  } else {
    parsed = eval('(' + str + ')');
  }
  return parsed;
};
