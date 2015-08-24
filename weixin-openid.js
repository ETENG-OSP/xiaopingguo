var scripts = document.getElementsByTagName('script');
var thisTag = scripts[scripts.length - 1];
var appid = thisTag.getAttribute('data-appid');

if (!appid) {
  throw new Error('appid is not set');
}

getOpenID().catch(function() {
  weixinAuth();
});

function getParameterByName(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(window.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function encodeQueryString(params) {
  return Object
    .keys(params)
    .map(function(key) {return key + '=' + encodeURIComponent(params[key]);})
    .join('&');
}

function weixinAuth() {
  var url = 'https://open.weixin.qq.com/connect/oauth2/authorize';
  var qs = encodeQueryString({
    appid: appid,
    'redirect_uri': window.location.href,
    'response_type': 'code',
    scope: 'snsapi_base'
  }) + '#wechat_redirect';
  window.location.assign(url + '?' + qs);
}

function getOpenID() {
  return new Promise(function(resolve, reject) {
    var openID = loadID();
    if (openID) {
      return resolve(openID);
    }

    var code = getParameterByName('code');
    if (code) {
      return requestToken(code).then(function(results) {
        var openid = results.openid;
        saveID(openid);
        resolve(openid);
      }, function() {
        reject('can not retrive openid from server');
      });
    }

    reject('not auth');
  });
}

function requestToken(code) {
  var url = '/api/token?code=' + code;
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function() {
      if (req.status == 200) {
        resolve(JSON.parse(req.responseText));
      } else {
        reject(Error(req.statusText));
      }
    };
    req.onerror = function() {
      reject(Error('Network Error'));
    };
    req.send();
  });
}

function saveID(openid) {
  localStorage['weixin-openid-' + appid] = openid;
}

function loadID() {
  return localStorage['weixin-openid-' + appid];
}
