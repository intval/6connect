var ApiBridge = require('./ApiBridge');
var RequestLayer = require('./RequestLayer');

var api = new ApiBridge
(
    "113-5D12E54A9916EE74F54A",
    "e4118f6b94d3ce144dbd6a534dd4f749",
    "https://cloud.6connect.com/6c_2550/api/v1/api.php",
    new RequestLayer(),
    CryptoJS
);


// instead of jquery / angular --> a simple approach
var btn = document.getElementById('getipBtn');
var ip  = document.getElementById('ip');
var msg = document.getElementById('msg');

btn.onclick = function(){
    ip.innerHTML = '';
    msg.innerHTML = '';

    api.SmartAssign(32, 'IPv4', 163, 'RIPE', function(result){
        ip.innerHTML = result.ip ? result.ip : '-';
        msg.innerHTML = result.msg ? result.msg : '';
    });
};
