// disabling forward button without using an array
(function() {
  var flag = false;
  var loop = false;

  window.addEventListener('popstate', function(event) {
    if (flag) {
      if (history.state != null && history.state.hasOwnProperty('page')) {
        loop = true;
        history.go(-1);
      } else {
        loop = false;
        history.go(-1);
      }
    } else {
      history.pushState(
        {
          page: true
        },
        null,
        null
      );
    }
    if (loop) {
      flag = true;
    } else {
      flag = !flag;
    }
  });

  window.onclick = function(e) {
    // reseting flag
    flag = false;
  };
})();
