// Missing jQuery function to return a form on the page as an object, with each
// field as a key.  See http://api.jquery.com/serializeArray/

var ArrayUtil = {
  toObject: function (a, keyKey, valueKey) {
    keyKey = keyKey || 'name';
    valueKey = valueKey || 'value';
    var o = {};
    for (var i = 0; i < a.length; i++) {
      o[a[i][keyKey]] = a[i][valueKey];
    }
    return ObjectUtil.unnestKeys(o);
  }
};

$.fn.serializeObject = function () {
  return ArrayUtil.toObject($(this).serializeArray());
}


