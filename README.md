# MedLock
==========

MedLock is a precription monitoring service that bridges gaps in patient care using Mobile Health technologies so that HealthCare Providers may prevent, identify, and intervene in real time for potential opioid addiction. 

# File Structure 

## medlock_client 
The frontend code is contained in medlock_client. Everything important is in the _src_ folder. 

* App.js: 
    * handleAuthentication(nextState, replace): 
    * makeMainRoutes(): route pathnames to secure components 

### _/actions_ 

* authActions.js: actions relating to Auth0 
    * auth0Registration(newUser, API_MANAGEMENT_TOKEN): register user with Auth0 
    * fetchRoles(API_MANAGEMENT_TOKEN): fetch roles of currently logged in user 
    * assignRoles(user_id, API_MANAGEMENT_TOKEN, role): assign a particular role a user 

* dispenserActions.js: actions relating to dispensers 
    * fetchDispenses(id): fetch dispenses of a particular dispenser id 

* patientActions.js: actions done on the patient 
    * createPatientProfile(newProfile): allows provider to create patient profile upon registration 
    * addPatientToProviderList(patient): add patient to the provider's list of patients upon registration 
    * fetchPatients(): fetch all patients of the logged in provider 

* profileActions.js: actions that load profile of logged in user 
    * loadProfile(role): load the profile of logged in user; role defines which collection to search 
    * saveProfile(updatedPersonalData): save an updated version of the profile 
    * editProfile(): allow the profile to be edittable 
    * addProfileModule(newProfileModule): add a question-answer module to the profile 

* providerActions.js: actions relating to providers 
    * createProviderProfile(newProfile): create a new Provider in MongoDB 

* surveyActions.js: actions relating to patient surveys 
    * submitSurvey(survey): submits a Pain Disability Index Survey 
    * fetchPDISurveys(): fetch the surveys of the logged in patient 


### _/auth_ 
// EXPLAIN THE FUNCTION OF THIS COMPONENT ??? 
* Auth.js: Create Authentication Session 
    * login(): 
    * handleAuthentication(): 
    * getAccessToken(): 
    * getIdToken(): 
    * setSession(authResult): 
    * renewSession(): 
    * getProfile(): 
    * logout(): 
    * isAuthenticated(): 
    * silentAuth(): 
    * userHasScopes(scopes): 

* AuthManagement.js: static functions relating to Auth0 that should not affect the Redux Store
    * getUserByEmail(email, AMT): fetch Auth0 profile of user by their email id 
    * fetchAMT(): fetch the API Management Token from Auth0 
    * resetPassword(email): send the reset password form to an email 
    * newPassword(password, user_id, AMT): NOT FUNCTIONAL, set a new password for a user 


### _/components_ 
* Callback.js: callback component for Auth0 

* SecuredRoute.js: wrapper component for each pathname route that ensures authentication 

#### _/components/administration_ 
* Admin.js: allows for admin functionality 
    * createNewProvider(): create new provider in Auth0 and MongoDB. Send email with temporary password. 



#### _/components/dashboard_ 
* Dashboard.js: Load the user information and dashboard 
    * constructor(): fetch AMT -> fetch user roles -> load user profile -> check if new user 
    * toggleNewUser(): if new user, display the NewUser.js Component 
    * iconHTML(icons, roles): based on a list of icons, return HTML for the ones for the role 
    * render(): if new user, render NewUser.js, else load the DashHeader and icons 

* DashHeader.js: render the Dashboard header 
    * render(): render logo, motivational quote, profile link 

* DashIcon.js: render the icon for each module 
    * render(): render an icon for each module by patient role 

* NewUser.js: render the new user form 
    * render(): if new patient, display form to update user profile 


#### _/components/home_ 
* Home.js: homepage 


#### _/components/inbox_ 
* Inbox.js: 
    * componentDidMount(): create Chat Manager, connect patient to room, get available rooms 
    * subscribeToRoom(roomId): connect a patient to a room based on sidebar selection 
    * getRooms(): get all rooms joinable by the user, typically created by the provider 
    * sendMessage(text): send text message 
    * createRoom(person): create a room between current user and person 
    * render(): render room list, send message form, message list, and new room form 

* config.js: tokenURL and instanceLocator --> update tokenURL with server 



##### _/components/inbox/components_ 
* Message.js: functional component displays username and text 

* MessageList.js: define chat size boundaries and display chat messages 

* NewRoomForm.js: select which patient or provider to begin a chat with 

* RoomList.js: display sidebar of rooms 

* SendMessageForm.js: text box to submit messages 


#### _/components/login_ 
* Login.js: prompts user login 


// UPDATE WITH NEW CODE 
#### _/components/myPatients_ 
* AddPatientForm.js: 

* MyPatients.js: 

* PatientList.js: 

* PatientListItem.js: 



#### _/components/nav_ 
* history.js: create browser history for navigation 

* ModuleIinfo.js: hard coded list of modules 

* SideBar.js: persistent sidebar for intermodular navigation 


// UPDATE WITH NEW CODE 
#### _/components/patientData_ 
* PatientData.js: 


// UPDATE WITH NEW CODE 
#### _/components/patientView_ 
* ConsumptionDataView.js: 

* MedicalDataView.js: 

* PatientView.js: 

* PersonalDataView.js: 



#### _/components/profile_ 
* EditProfile.js: ??? 

* PersonalInfo.js: render personal information and non-medical data 

* Profile.js: render personal information and question-answer modules 
    * onProfileSave(updatedPersonalData): save updated personal data to database 

* ProfileModule.js: renders a question-answer module 


#### _/components/resources_ 
* Resources.js: display tailored resources by patient 



#### _/components/survey_ 
* PDISurvey.js: render form that displays the Pain Disability Index Survey 



#### _/components/test_ 
* Dispenser.js: create timestamps for the dispenser of the patient logged in for testing 

* ServerEndpoints.js: test API calls with authentication credentials of the logged in user 


### _/reducers_ 

* In general, all reducers are used to manage the application state with information from the completion of an action. 
* All actions have three possible states: begin, success, and failure 
* When the action begins, it calls the reducer for the type ACTION_BEGIN, which allows the reducer to set the application state variable of actionLoading to true. This is useful to watch for on the frontend. 
* If the action is successful, then actionLoading is set to false, and the payload of the action is sent the reducer, which in turns makes it available to the application state 
* If the action is unsuccessful, then the actionLoading variable is set to false, and the actionError variable in the reducer is set to the error payload from the action function. This is useful to communicate to the frontend code. 

## medlock_server 
The entry point for the server is _server.js_ 

For development, this will function as the web server, REST API, and database interface. The web server part is a bit strange. ReactJS providers its own web server for development, but in production, _server.js_ will need to route the static webpages from the static build files. 

* server.js: loads authentication and body parser middleware, connects to the database, routes server requests to API endpoints, runs the server on a port, and listens on any IP Address 

### _/models_ 
* Models and Schemas are used to provide structure to NoSQL databases 
* The properties listed are fairly self-explanatory 

### _/routes/api_ 
* chatAuth.js: 
    * / - POST: ChatKit authentication request 
* email.js: 
    * / - POST: send email with temporary password after registration 

#### _/routes/api/administration_ 
* provider.js: 
    * / - POST: create a new provider as an administrator in Auth0, MongoDB, and ChatKit 

#### _/routes/api/patient_ 
* dispense.js: 
    * / - GET: get all dispenses with query id 
    * / - POST: post a dispense to the dispenser id in body 

* patient.js: 
    * / - GET: allows patient to get own data based on authentication credentials 
    * / - PUT: allows patient to update their profile 
    * /modules - GET: get patient modules based on authentication credentials 
    * /modeuls - POST: post a patient question-answer module based on authentication credentials 

* pdisurvey.js: 
    * / - GET: get Pain Disability Index surveys based on authentication credentials 
    * / - POST: post a Pain Disability Index survey response, adhering to the PDISurvey Model or Schema 

#### _/routes/api/provider_ 
* patients.js: 
    * / - GET: get a list of all patients associated with a provider 
    * / - POST: create a patient in Auth0, MongoDB, and ChatKit, if not already created, add patient to provider patient list, create a provider-patient chat 
    * / - PUT: update the denormalized patient data in the provider patient list 
    * / - DELETE: delete a patient from the provider patient list 

* provider.js: 
    * / - GET: get all data about the provider based on authentication credentials 
    * / - POST: create a new provider as a provider 
    * / - PUT: update data about the provider based on authentication credentials 

DEPLOYMENT:
* Comment out the DEVELOPMENT urls and uncomment the PRODUCTION urls in /MedLock/client/src/config/servers.js and /MedLock/config/servers.js
* Create the build files using the command "npm run-script build". You must be in the client folder to do this.
* Push the production code to master. 
* Go to heroku and deploy the master branch.





