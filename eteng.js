var uploadUrl = '//127.0.0.1:3001/api/score';
var rankUrl = '//127.0.0.1:3001/api/rank';

window.eteng = {
  uploadScore: uploadScore,
  getRank: getRank
};

function uploadScore(score) {
  var openID = getOpenID();
  return $.ajax({
    method: 'PUT',
    url: uploadUrl,
    data: {
      score: score,
      openID: openID
    }
  });
}

function getRank() {
  var openID = getOpenID();
  return $.ajax({
    url: rankUrl,
    data: {
      openID: openID
    }
  });
}

function getOpenID() {
  return getParameterByName('openid');
}

function getParameterByName(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(window.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
