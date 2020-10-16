import React from 'react';
import {Link} from 'react-router-dom';


class HomePage extends React.Component {
    render() {
        const {isAutheticated,login} = this.props.auth;
        return(
            <div>
                <h1>Home Page</h1>
                { isAutheticated() ? 
                    <Link to='/profile'>View Profile</Link> 
                    : 
                    <button onClick={login} >Log In</button>
                }
                
            </div>
        )
    }
}

export default HomePage;
