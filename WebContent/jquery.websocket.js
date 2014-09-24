//You need an anonymous function to wrap around your function to avoid conflict
//we will able to use any valid Javascript variable name to replace "$" SIGN
(function($) {
	$.connect = function(options) {
		var defaults = {
			domain : top.location.hostname,
			port : top.location.port,
			protocol : ""
		};
		var opts = $.extend(defaults, options);
		var wsUrl = "ws://" + opts.domain + ":" + opts.port + "/" + opts.protocol;
		var socket = null;
		var bOpen = false;
		var t1 = 0;
		var t2 = 0;
		var messageevent = {
			onInit : function() {
				//验证浏览器是否支持WebSocket协议
				if (!("WebSocket" in window) && !("MozWebSocket" in window)) {
					alert("WebSocket not supported by this browser!");
					return false;
				}
				if (("MozWebSocket" in window)) {
					socket = new MozWebSocket(wsUrl);
				} else {
					socket = new WebSocket(wsUrl);
				}
				if (opts.onInit) {
					opts.onInit();
				}
			},
			onOpen : function(event) {
				bOpen = true;
				if (opts.onOpen) {
					opts.onOpen(event);
				}
			},
			onSend : function(msg) {
				t1 = new Date().getTime();
				if (opts.onSend) {
					opts.onSend(msg);
				}
				socket.send(msg);
			},
			onMessage : function(msg) {
				t2 = new Date().getTime();
				if (opts.onMessage) {
					opts.onMessage(msg.data, t2 - t1);
				}
			},
			onError : function(event) {
				if (opts.onError) {
					opts.onError(event);
				}
			},
			onClose : function(event) {
				if (opts.onclose) {
					opts.onclose(event);
				}
				if (socket.close() != null) {
					socket = null;
				}
			}
		}

		messageevent.onInit();
		socket.onopen = messageevent.onOpen;
		socket.onmessage = messageevent.onMessage;
		socket.onerror = messageevent.onError;
		socket.onclose = messageevent.onClose;

		this.send = function(pData) {
			if (bOpen == false) {
				return false;
			}
			messageevent.onSend(pData);
			return true;
		};
		this.close = function() {
			messageevent.onClose();
		};
		return this;
	};
})(jQuery);