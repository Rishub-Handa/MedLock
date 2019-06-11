import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth0client from '../auth/Auth';

function SecuredRoute({component: Component, ...rest}) {
    console.log(auth0client.isAuthenticated());
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

export default SecuredRoute;
