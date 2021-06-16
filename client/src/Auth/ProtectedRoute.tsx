import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import Auth from './Auth';

const ProtectedRoute = ({Component, ...rest}) => {

    return (
        <Route
            {...rest}

            render={(props) => {
                if (Auth.isAuthenticated()) {
                    return <Component/>  // {...props}
                } else {
                    return <Redirect
                        to={{
                            pathname: '/login',
                            state: {
                                from: props.location
                            }
                        }
                        }
                    />
                }
            }
            }/>
    );
};

export default ProtectedRoute;
