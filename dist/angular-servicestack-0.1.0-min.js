/**
 * @name: angular-servicestack
 * @description: A Service Stack client for AngularJS
 * @version: v0.1.0 - 2013-06-15
 * @link: https://github.com/kkolstad/angular-servicestack
 * @author: Kenneth Kolstad
 * @license: MIT License, http://www.opensource.org/licenses/MIT
 */
!function(){var a;a=angular.module("angular-servicestack",[]),a.provider("serviceStackRestConfig",function(){var a;return a={urlPrefix:"",maxRetries:3,maxDelayBetweenRetries:4e3,unauthorizedFn:null},{setRestConfig:function(b){return angular.extend(a,b)},$get:function(){return a}}}),a.factory("serviceStackRestClient",["serviceStackRestConfig","$http","$q","$timeout","$log",function(a,b,c,d,e){var f,g;return g=function(){function b(a){var b;this.response=a,this.success=200<=(b=this.response.status)&&300>b,this.statusCode=this.response.status,this.success&&(this.data=this.response.data),this.success||null==this.response||null==this.response.data||(this.error=this.response.data.responseStatus),!this.success&&null!=this.response&&null!=this.response.data&&null!=this.response.data.responseStatus&&null!=this.response.data.responseStatus.errors&&this.response.data.responseStatus.errors.length>0&&(this.validationErrors=this.response.data.responseStatus.errors),this.isRetryable()&&this.incrementCollisionCount()}return b.prototype.collisionCount=function(){return null!=this.response.config&&null!=this.response.config.data?this.response.config.data._collisions||0:0},b.prototype.getConfig=function(){return this.response.config},b.prototype.hasValidationError=function(){return null!=this.validationErrors&&this.validationErrors.length>0},b.prototype.incrementCollisionCount=function(){return this.response.config.data=this.response.config.data||{},this.response.config.data._collisions=this.collisionCount()+1},b.prototype.isRetryable=function(){var b;return(500===(b=this.statusCode)||503===b?!0:void 0)&&this.collisionCount()<=a.maxRetries},b.prototype.isUnauthenticated=function(){return 401===this.statusCode},b.prototype.isUnhandledError=function(){return!this.success&&!this.isUnauthenticated()&&!this.isRetryable()},b.prototype.toLog=function(){return e.log("ServiceStackResponse:"),e.log(this),e.log("	hasValidationError: "+this.hasValidationError()),e.log("	isUnhandledError:   "+this.isUnhandledError()),e.log("	isUnauthenticated:  "+this.isUnauthenticated()),e.log("	isRetryable:        "+this.isRetryable()),e.log("	collisionCount:     "+this.collisionCount())},b}(),f=function(){function f(){}return f.prototype["delete"]=function(a,b){return null==b&&(b={}),b.method="DELETE",b.url=a,this.execute(b)},f.prototype.get=function(a,b){return null==b&&(b={}),b.method="GET",b.url=a,this.execute(b)},f.prototype.post=function(a,b,c){return null==b&&(b=null),null==c&&(c={}),c.method="POST",c.data=b,c.url=a,this.execute(c)},f.prototype.put=function(a,b,c){return null==b&&(b=null),null==c&&(c={}),c.method="PUT",c.data=b,c.url=a,this.execute(c)},f.prototype.fixUrl=function(b){var c,d;return 0===b.indexOf(a.urlPrefix)?b:(e.log("Fixing url: "+b),c=a.urlPrefix.replace(/\/+$/,""),b=b.replace(/^\/+/,""),d=""+c+"/"+b,e.log("to url: "+c+"/"+b),d)},f.prototype.execute=function(e){var f,h,i,j,k,l;return i=this,k=[],h=[],l=[],e.url=this.fixUrl(e.url),f=c.defer(),j=b(e),j.then(function(a){var b;return b=new g(a),f.resolve(b)},function(a){var b;return b=new g(a),f.reject(b)}),f.promise.success=function(a){return k.push(a),f.promise.then(function(b){return a(b)}),f.promise},f.promise.error=function(a){return h.push(a),f.promise.then(null,function(b){return b.isUnhandledError()&&!b.hasValidationError()?a(b):void 0}),f.promise},f.promise.validation=function(a){return l.push(a),f.promise.then(null,function(b){return b.isUnhandledError()&&b.hasValidationError()?a(b):void 0}),f.promise},f.promise.then(null,function(b){if(b.isUnauthenticated()){if(null!=a.unauthorizedFn&&angular.isFunction(a.unauthorizedFn))return a.unauthorizedFn();if(null!=h&&angular.isFunction(h))return h(b)}}),f.promise.then(null,function(b){var c;return b.isRetryable()?(c=Math.min(Math.random()*100*Math.pow(4,b.collisionCount()-1),a.maxDelayBetweenRetries),d(function(){var a,c,d,e,f,g,j,m;for(c=i.execute(b.getConfig()),d=0,g=k.length;g>d;d++)a=k[d],c.success(a);for(e=0,j=h.length;j>e;e++)a=h[e],c.error(a);for(f=0,m=l.length;m>f;f++)a=l[f],c.validation(a);return c},c)):void 0}),f.promise},f}(),new f}])}.call(this);