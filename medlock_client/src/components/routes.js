import React from 'react';
import { Route, Router } from 'react-router-dom';
import Callback from './Callback';
import history from './nav/history';
import Dashboard from './dashboard/Dashboard';

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
}

export const makeMainRoutes = () => {
    return (
        <Router history={history} component={App} >
            <div>
                <Route path="/" render={(props) => <div>Main Page</div> } />
                <Route path="/home" render={(props) => <Home auth={auth} {...props} /> } />
                <Route path="/dashboard" render={(props) => <Dashboard auth={auth} {...props} /> } />
                <Route path="/callback" render={(props) =>{
                    handleAuthentication(props);
                    return <Callback {...props} />
                }}/>
            </div>
      </Router>
    )
}