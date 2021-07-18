  
var text = new TextDecoder("utf-8");

WebSocket.prototype.original = WebSocket.prototype.send;
WebSocket.prototype.send = function(data) {
    if (Object.prototype.toString.call(data) === "[object ArrayBuffer]") {
        if (text.decode(data).includes("self_deaf")) {
            data = data.replace('"self_mute":false',);
        }
    }
    WebSocket.prototype.original.apply(this, [data]);
}
