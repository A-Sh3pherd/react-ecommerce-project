import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Auth from '../../Auth/Auth';

const Logout = () => {
    const history = useHistory();

    useEffect(() => {
        Auth.logout(() => {
            history.push('/login');
        })
    }, [])

    return (
        <div>

        </div>
    );
};

export default Logout;
