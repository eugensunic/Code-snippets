//Stackoverflow answer url: 
// https://stackoverflow.com/questions/11548558/html5-history-disabling-forward-button/51001411#51001411

// disabling forward button without using an array
(function () {
  disableForwardButton();
})();
function disableForwardButton() {
  var flag,
    loop = false;
  window.addEventListener('popstate', function (event) {
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
    flag = loop ? true : !flag;
  });

  window.onclick = function (event) {
    flag = false;
  };
}
