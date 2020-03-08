// have to test with property which has an object as value (then this covers all cases);
(function () {
  const paramSuffix = '/?';
  const infoMessage = 'Session Storage is empty, sign in!';
  const sessionStorageKey = 'wemocache';

  window.onload = function () {
    let htmlHrefElements = document.getElementsByTagName('a');
    var objStore = JSON.parse(sessionStorage.getItem(sessionStorageKey));
    if (objStore) {
      for (var i = 0; i < htmlHrefElements.length; i++) {
        htmlHrefElements[i].addEventListener(
          'click',
          function (e) {
            e.preventDefault();
            let str = objectToUrlParam(objStore);
            str = str.substring(0, str.length);
            console.log('Output params: ' + str);
            window.location.href = this.href + paramSuffix + encodeURIComponent(str);
          },
          false
        );
      }
    } else {
      alert(infoMessage);
      console.log(infoMessage);
    }
  };

  function objectToUrlParam(obj) {
    let str = '';
    for (let key in obj) {
      if (obj[key].constructor === Array) {
        str += 'ARR-BEGIN';
        for (key2 in obj[key]) {
          if (obj[key][key2] !== null) {
            str += objectToUrlParam(obj[key][key2]);
          }
        }
        str += 'ARR-END';
      } else {
        str += key + 'EQUAL' + obj[key] + 'DELIMITER';
      }
    }
    return str;
  }

  function stringToJson(params) {
    const equalSign = 'EQUAL';
    const andSign = 'DELIMITER';
    const questionSign = '?';

    let obj = {};
    let name = '';
    let value = '';
    let start;

    if (params.length < 10) {
      return;
    }
    if (params.indexOf('?') > -1) {
      start = params.indexOf('?') + 1;
    } else {
      start = params.indexOf(andSign) + andSign.length;
    }
    name = params.substring(start, params.indexOf(equalSign)); // get property name

    value = params.substring(params.indexOf(equalSign) + equalSign.length, params.indexOf(andSign, params.indexOf(name))); // get property value

    stringToJson(params.replace(params.substring(params.indexOf(name) - 1, params.indexOf(value) + value.length), ''));

    console.log('name is: ' + name);
    console.log('value is: ' + value);
    console.log('new string: ' + params.replace(params.substring(params.indexOf(name) - 1, params.indexOf(value) + value.length), ''));
  }
})();
