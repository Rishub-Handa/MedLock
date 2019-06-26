# MedLock
==========

MedLock is a precription monitoring service that bridges gaps in patient care using Mobile Health technologies so that HealthCare Providers may prevent, identify, and intervene in real time for potential opioid addiction. 

# File Structure 

## medlock_client 
The frontend code is contained in medlock_client. Everything important is in the _src_ folder. 

### _/components_ 

#### _/components/administration 
* Admin.js: allows for admin functionality 
⋅⋅* createNewProvider(): create new provider in Auth0 and MongoDB. Send email with temporary password. 


### _/actions_ 

* authActions.js: actions relating to Auth0 
⋅⋅* auth0Registration(newUser, API_MANAGEMENT_TOKEN): register user with Auth0 

* providerActions.js: actions relating to providers 
⋅⋅* createProviderProfile(newProfile): create a new Provider in MongoDB 

### _/reducers_ 

## medlock_server 
The entry point for the server is _server.js_ 

For development, this will function as the web server, REST API, and database interface. The web server part is a bit strange. ReactJS providers its own web server for development, but in production, _server.js_ will need to route the static webpages from the static build files. 

