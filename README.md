!!!!!!!!! APP NEEDS TO BE SERVED OVER HTTP !!!!!!!!!!


6connect coding test
--------------------

The system contains 3 compnonents
- ApiBridge which is responsible for api communication and building api queries
- RequestLayer (a lil abstraction on top of xmlhttprequest) decoupled from apibridge
- script.js which contains the main app logic



Notes
---

1. Normally Google chrome blocks requests to 3rd party urls for servers that do not provide
a valid Access-Control-Allow-Origin header. To deal with it, for the case of current demo
a proxy was used, namely YahooQueryLanguage (YQL)

2. require1k was used as module loader. In real life projects it's place will be taken
by browserify, which requires nodejs dependency an script preprocessing. This also results
in the requirment of loading the app over http and not just openning the page in the
browser directly from a folder. This is a shortcoming of require1k :(

3. The app (as found in script.js) is written with plain JS, without jQuery/angular,
while those two libraries make way more sense for usage for data display
and interactions handling.

4. Additionally, using promises would be a better way of handling data passing,
while for the case of simplicity, regular callbacks are used here

5. Retry functionality was ommited and left for the user manual handling
(ie, if something went wrong, the user has to click the button once again, no auto retries)

6. No unit tests provided, though could be



Feedback
-----
1. For your customers, it would make sense to add 'request idempotency',
such as unique_request_id parameter in the url, so that two consequtive requests will
not result in two IP assignments (as network failure may occur at the point where your
server received the client request, but the response was not delivered to the client)
in that case it makes sense for the client to resend the same request

2. The documentation at
http://docs.6connect.com/display/DOC/API+Module+-+IPAM#APIModule-IPAM-SmartAssign
provides a url example with incorrect parameter name.
img: http://prntscr.com/awlbvu

3. No 'Access-Control-Allow-Origin' header is present on the requested resource
which means that calling your server from 3rd domain, like localhost,
is impossible without usage of a proxy


4. Using invalid type is request results in an incomplete error message:
actual: "Invalid type: "  
while nothing follows the semicolon  
expected: "Invalid type: IPv40"  
note the incorrect type in the url  
https://cloud.6connect.com/6c_2550/api/v1/api.php?target=ipam&action=smartAssign&mask=32&type=IPv40&resourceId=163&rir=RIPE  
But be ware of just echoing the input as is. Could break the JSON or even cause XSS in some browsers  
img: http://prntscr.com/az73hi  (the text says: best APIs also tend to document themselves on the go)  
