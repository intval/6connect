'use strict';
module.exports = (function () {

    var props = {};
    
    function ApiBridge(apikey, apiSecret, apiUrl, requestLayer, cryptoJs) {
        props.apikey = apikey;
        props.apiSecret = apiSecret;
        props.apiUrl = apiUrl.replace(/\?+$/, '') + '?';
        props.requestLayer = requestLayer;
        props.cryptoJs = cryptoJs;
    }

    ApiBridge.prototype.SmartAssign = function (mask, type, resourceId, rir, callback) {
        // todo, add validation, instead of default values
        mask = mask || 32;
        type = type || 'IPv4';
        rir = rir || 'RIPE';

        MakeApiCall({
            target: 'ipam',
            action: 'smartAssign',
            mask: mask,
            type: type,
            resourceId: resourceId,
            rir: rir
        }, function(resp){

            var result = {ip: null, msg: null};

            if(resp.success == 1)
                result.ip = resp.data.formatted_ip;
            else
                result.msg = resp.message;

            callback(result);
        });
    };



    // For simplicity I've used callbacks as means of data passing
    // for a production code I'd consider using promises instead
    // would result in less callback hell
    function MakeApiCall(queryParams, callback) {

        var query = ObjectToUrl(queryParams);
        query += '&apiKey=' + props.apikey;
        query += '&hash=' + GenerateApiHash(query, props.apiSecret);

        props.requestLayer.GET(props.apiUrl + query, function(resp){
            if(callback) callback(resp);
        });

    }

    function ObjectToUrl(obj) {
        return Object.keys(obj).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
        }).join('&');
    }

    function GenerateApiHash(queryString, secretKey){
        var hmac = props.cryptoJs.HmacSHA256(queryString, secretKey);
        return props.cryptoJs.enc.Base64.stringify(hmac);
    }

    return ApiBridge;

})();



