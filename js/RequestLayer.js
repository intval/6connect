'use strict';

// This circus is for unit testing purposes
// Allowing to isolate the network sending from the api bridge
// and unit test the api bridge without making actual requests anywhere

var RequestLayer = function(useYql){
    this.useYql = typeof(useYql) === "boolean" ? useYql : true;
};

RequestLayer.prototype = {
    GET: function(url, callback){

        var r = new XMLHttpRequest();
        var that = this;

        // Unfortunately chrome blocks requests to servers without proper
        // Allow-Origin header, and thus a proxy is used
        // it compromises the security, but good enough for the demo purposes
        // YQL = Yahoo Query Language
        if(this.useYql) {
            url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D'" + encodeURIComponent(url) + "'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
            console.log('using YQL: ', url);
        }

        r.open("GET", url, true);
        r.onreadystatechange = function () {
            if (r.readyState != 4) return;

            console.log(r.response);
            var resp = {};
            if(r.status == 200)
            {
                try{
                    resp = JSON.parse(r.responseText);
                    if(that.useYql){
                        resp = resp.query.results.json;
                    }
                }
                catch(err)
                {
                    resp = {success:0, message: "Server error (json parsing): " + err.message};
                }
            }
            else
            {
                resp = {
                    "success":0,
                    "message":"Response status was " + r.status
                };
            }

            callback(resp);
        };
        r.send();
    }
};

module.exports = RequestLayer;



