var text = new TextDecoder("utf-8");
var old_channel_id;

WebSocket.prototype.original = WebSocket.prototype.send;
WebSocket.prototype.send = function(data) {
    if (Object.prototype.toString.call(data) === "[object ArrayBuffer]") {
        var textData = text.decode(data);
        var channel_id = textData.substring(
            textData.lastIndexOf('channel_id') + 15, 
            textData.lastIndexOf('channel_id') + 33
        );
        console.log(channel_id);
        if (old_channel_id === channel_id) {
            console.log("Found mute/deafen");
            data = data.replace('"self_mute":false', 'NiceOneDiscord');
            console.log("Faked mute/deafen - borkgang.com");
        } else {
            if(textData.includes("channel_id")) {
                old_channel_id = channel_id;
            }
        }
    }
    WebSocket.prototype.original.apply(this, [data]);
}
