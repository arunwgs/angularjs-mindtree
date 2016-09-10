//Service creation by Factory

// angular.module("customServices",[])
//  .factory("logService",function(){
//  	var messageCount = 0;
//  	return {
//  		log: function(msg){
//  			console.log("(LOG + " + messageCount++ +") " + msg);
//  		}
//  		// run: function(){

//  		// }
//  	};
//  });

// var baseLogger = function(){
// 	this.messageCount = 0;
// 	this.log = function(msg){
// 		console.log(this.msgType + ": " + (this.messageCount++) + " " + msg)
// 	}
// };

//Service creation by Services

// var debugLogger = function(){};
// debugLogger.prototype = new baseLogger();
// debugLogger.prototype.msgType = "Debug";

// var errorLogger = function(){};
// errorLogger.prototype = new baseLogger();
// errorLogger.prototype.msgType = "Error";

// angular.module("customServices",[])
//  .service("logService",debugLogger)
//  .service("errorService",errorLogger);


//Service creation by provider method

angular.module("customServices",[])
.provider("logService", function(){
	var counter = true;
	var debug = true;
	return {
		messageCountEnabled: function(setting){
			if (angular.isDefined(setting)){
				counter = setting;
				return this;
			} else {
				return counter;
			}
		},
		debugEnabled: function(setting) {
			if (angular.isDefined(setting)){
				debug = setting;
				return this;
			} else {
				return debug;
			}
		},
		$get: function(){
			return {
				messageCount:  0,
				log: function(msg){
					if(debug){
						console.log("(LOG + " + this.messageCount++ +") " + msg);
					}
				}
     			    
			};
		}
	}
});