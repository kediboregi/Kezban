/*
this project on githup
author: https://github.com/unequaled86/
*/
(function () {
    var Ajaxalake = function (submitv,urlf,methodf,dataTypef,dataff) {
        return new ajaxalake(submitv,urlf,methodf,dataTypef,dataff);
    };

    var ajaxalake = function (submitv,urlf,methodf,dataTypef,dataff){
		this.version = '0.1';
		this.developer = 'Oğuzhan Çankaya';
		this.githup = 'unequaled86';
		this.facebook = 'http://www.fb.com/Unequaled86';
        this.twitter = 'http://www.twitter.com/Unequaled86';
		this.listen = "Thank you for using";
		
		this.ajaxVar = null;
		this.submitVar = null;
		this.yukleniyorVar = null;
		this.yukleniyorContent = null;
		this.responsedivid = null;
		this.url = urlf;
		this.method = methodf;
		this.dataType = dataTypef;
		this.dataf = dataff;
		this.formdataid = null;

		if (typeof(submitv)!='undefined' || submitv!='') this.submitVar = submitv;
		if (typeof(methodf)==='undefined') this.method = "GET";
		if (typeof(dataTypef)==='undefined') this.dataType = "json";
		if (typeof(dataff)==='undefined') this.dataff = "";
        return this;
    };
	
	ajaxalake.prototype.addDataFromFormid = function(id){
		if(typeof(id)){
			this.formdataid = id;
		}
		return this;
	}
	
	ajaxalake.prototype.addResponseToDivid = function(id){
		if(typeof(id)){
			this.responsedivid = id;
		}
		return this;
	}
	
	ajaxalake.prototype.ajax = function () {
		var self = this;
		if(this.submitVar == null || this.submitVar == ""){
			ajaxx();
		}else{
			$(this.submitVar).click(function(event) {
				ajaxx();
				event.preventDefault();
			});
		}
		function ajaxx(){
			var datalar;
			if(self.formdataid != "" && self.formdataid != null){
				datalar = self.dataf+"&"+$(self.formdataid).serialize();
			}else{
				datalar = self.dataf;
			}
			self.ajaxVar = $.ajax({
				url: self.url,
				method: self.method,
				data: datalar,
				dataType: self.dataType,
				beforeSend: function() {
					self.yukleniyor();
					self.beforeCallback(datalar);
				},
				success: function(data){
					self.yuklenmiyor();
					self.afterCallback(data);
				},
				error: function (request, status, error) {
					self.errorCallback(request);
				}
			})
		}
	}
	ajaxalake.prototype.cancel = function (){
		if(this.ajaxVar != null){
			this.ajaxVar.abort();
		}
		return this;
	}
	
	ajaxalake.prototype.beforeCallback = function(data){
		if(debug){
			console.log("beforeCallback +");
			console.log(data);
			console.log("beforeCallback -");
		}
	}
	ajaxalake.prototype.afterCallback = function(data){
		if(debug){
			console.log("afterCallback +");
			console.log(data);
			console.log("afterCallback -");
		}
		$(this.responsedivid).html(data);
	}
	ajaxalake.prototype.errorCallback = function(data){
		if(debug){
			console.log("errorCallback +");
			console.log(data);
			console.log("errorCallback -");
		}
	}
	
	ajaxalake.prototype.loading = function(x,y){
		this.yukleniyorVar = x;
		this.yukleniyorContent = y;
	}
	ajaxalake.prototype.yukleniyor = function(){
		if(this.yukleniyorVar != null){
			$(this.yukleniyorVar).html(this.yukleniyorContent);
		}
	}
	ajaxalake.prototype.yuklenmiyor = function(){
		if(this.yukleniyorVar != null){
			if(debug){
				setTimeout(function(){
					$(this.yukleniyorVar).html("");
				},1000);
			}else{
				$(this.yukleniyorVar).html("");
			}
		}
	}

    if(!window.Ajaxalake) {
        window.Ajaxalake = Ajaxalake;
    }
})();
