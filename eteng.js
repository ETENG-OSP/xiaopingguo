var uploadUrl = '//127.0.0.1:3001/api/score';
var rankUrl = '//127.0.0.1:3001/api/rank';

window.eteng = {
  uploadScore: uploadScore,
  getRank: getRank
};

function uploadScore(score) {
  return getOpenID().then(function(openID) {
    return $.ajax({
      method: 'PUT',
      url: uploadUrl,
      data: {
        score: score,
        openID: openID
      }
    });
  });
}

function getRank() {
  return getOpenID().then(function(openID) {
    return $.ajax({
      url: rankUrl,
      data: {
        openID: openID
      }
    });
  });
}
