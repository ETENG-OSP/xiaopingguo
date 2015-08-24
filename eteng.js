var uploadUrl = '//192.168.0.177:3001/api/score';
var rankUrl = '//192.168.0.177:3001/api/rank';

window.eteng = {
  uploadScore: uploadScore,
  getRank: getRank
};

function uploadScore(score) {
  var openID = getOpenID();
  return $.ajax({
    method: 'PUT',
    url: uploadUrl,
    contentType: 'application/json',
    data: JSON.stringify({
      score: score,
      openid: openID
    })
  });
}

function getRank() {
  var openID = getOpenID();
  return $.ajax({
    url: rankUrl,
    data: {
      openid: openID
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
