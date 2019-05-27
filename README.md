# MedLock

MedLock is a precription monitoring service that bridges gaps in patient care using Mobile Health technologies so that HealthCare Providers may prevent, identify, and intervene in real time for potential opioid addiction. 

# File Structure 
## Frontend 
The frontend code is contained in medlock_client. Everything important is in the _src_ folder. 
_App.js_ is the main component as specified by _medlock_client/public/index.html_ 
_/components_ contains more ReactJS components. This may be partitioned further based on the served webpage. 
_/actions_ contains the action functions which dispatch updates to the Redux Store. 
_/reducers_ contains the reducer functions which update the Redux Store based on some action type. 

## Backend 
The entry point for the server is _server.js_ 
For development, this will function as the web server, REST API, and database interface. The web server part is a bit strange. ReactJS providers its own web server for development, but in production, _server.js_ will need to route the static webpages from the static build files. 
_/config/default.json_ contains confidential information such as the various keys and MongoDB URI. 
_/middleware_ will contain middleware functions that perform intermediate processing between request and response. For example, authentication of the request sender and logging of requests. 
_/routes_ will contain files to which _server.js_ will route various HTTPS requests. This includes API requests and potentially webpage requests. During production, we are going to have to figure out how to separate all of these functions across different servers: web server, REST API, and database interface. 