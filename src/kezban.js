var Kezbann = function (url) {
	//var hostname = window.location.hostname.split(".")
	this.method = "get"
	this.apiurl = url | "/"
	this.action = null
	this.data = null
	this.debug = true;
	this.success = function(data) {};
	this.beforeSend = function(data) {};
};
Kezbann.prototype.setMethod = function(val) {
	this.method = val;
	return this;
};
Kezbann.prototype.setAction = function(val) {
	this.action = val;
	return this;
};
Kezbann.prototype.setData = function(val) {
	this.data = val;
	return this;
};
Kezbann.prototype.setType = function(val) {
	this.type = val;
	return this;
};
Kezbann.prototype.setbeforeSend = function(func) {
	this.beforeSend = func;
	return this;
};
Kezbann.prototype.setSuccess = function(func) {
	this.success = func;
	return this;
};
Kezbann.prototype.setError = function(func) {
	this.error = func;
	return this;
};
Kezbann.prototype.beforeSend = function(data) {
	if(this.debug)
		console.log(data)
};
Kezbann.prototype.success = function(data, xhr) {
	if(this.debug)
		console.log(data)
		console.log(xhr)
};
Kezbann.prototype.error = function(data) {
	if(this.debug)
		console.log(data)
};
Kezbann.prototype.yap = function() {
	var self = this;

	function getXMLHttpRequest() {
		if (window.XMLHttpRequest) {
			return new window.XMLHttpRequest;
		} else {
			try {
				return new ActiveXObject("Microsoft.XMLHTTP");
			} catch (ex) {
				return null;
			}
		}
	}

	var xhr = getXMLHttpRequest();

	if(self.method == "get") {
		if (self.data != null) {
			self.params = Object.keys(self.data).map(function(k) {
			    return encodeURIComponent(k) + '=' + encodeURIComponent(self.data[k])
			}).join('&')
			self.params = '?'+self.params
			xhr.open(self.method, self.apiurl + self.action + self.params, true);
		} else {
			xhr.open(self.method, self.apiurl + self.action, true);
		}
	} else {
		xhr.open(self.method, self.apiurl + self.action, true);
	}

	xhr.withCredentials = true;
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

	xhr.onreadystatechange = function(){
		if (xhr.readyState === 2) {
			self.beforeSend(self.data)
		}
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status >= 200 && xhr.status < 300) {
				if (self.type == "form") {
					self.success(xhr.responseText, xhr)
				} else {
					self.success(JSON.parse(xhr.responseText), xhr)
				}
			} else {
				self.error(xhr)
			}
		}
	}

	if (self.type == "form") {
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
		xhr.send(self.data);
	} else {
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		xhr.send(JSON.stringify(self.data));
	}
	return this;
}

var kezban = Kezbann || {};
