import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import auth0client from '../auth/Auth';
import history from '../components/nav/history';

function SecuredRoute({component: Component, ...rest}) {
    return (
        <div>
            <Route 
                {...rest}
                render={ props => 
                    auth0client.isAuthenticated() ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: props.location }
                            }}
                        />
                    )
                }
            />
        </div>
    );
}

export default withRouter(SecuredRoute);
