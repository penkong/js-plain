//
function easyHttp() {
  this.http = new XMLHttpRequest();
}

// get prototype
easyHttp.prototype.get = function(url, cb) {
  this.http.open('GET', url, true);
  this.http.onload = () => {
    if (this.http.status === 200) {
      cb(null, this.http.responseText);
    } else {
      cb('Error :' + this.http.status, null);
    }
  };
  this.http.send();
};
// post prototype
easyHttp.prototype.post = function(url, data, cb) {
  this.http.open('POST', url, true);
  this.http.setRequestHeader('Content-type', 'application/json');
  this.http.onload = () => {
    cb(null, this.http.responseText);
  };
  this.http.send(JSON.stringify(data));
};
// put prototype
easyHttp.prototype.put = function(url, data, cb) {
  this.http.open('PUT', url, true);
  this.http.setRequestHeader('Content-type', 'application/json');
  this.http.onload = () => {
    cb(null, this.http.responseText);
  };
  this.http.send(JSON.stringify(data));
};
// delete prototype
easyHttp.prototype.delete = function(url, cb) {
  this.http.open('DELETE', url, true);
  this.http.onload = () => {
    if (this.http.status === 200) {
      cb(null, 'post deleted');
    } else {
      cb('Error :' + this.http.status, null);
    }
  };
  this.http.send(JSON.stringify(data));
};
// get prototype
