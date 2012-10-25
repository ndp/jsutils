var ObjectUtil = {
  unnestKeys: function (o) {
    var k, key, sub, subKey, nested, insert, result = {};
    for (k in o) {
      if (o.hasOwnProperty(k)) {
        if (k.indexOf('[') == -1) {
          result[k] = o[k];
        } else {
          key = k.slice(0, k.indexOf('['))
          result[key] = result[key] || {};
          subKey = k.slice(k.indexOf('[') + 1, -1);
          result[key][subKey] = o[k];
        }
      }
    }
    return result;
  }
};
