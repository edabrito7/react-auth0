import React from 'react';
import {Link} from 'react-router-dom';

import './navbar.css';

const NavBar = ({auth,isSigned}) => {
    const {login, logout} = auth;
    return(
        <nav>
            <ul className='navbar'>
                <Link className='link' to='/'>Home</Link>
                <Link className='link' to='/profile'>Profile</Link>
                <Link className='link' to='/profile'>Sign In</Link>
                <li className='link'>
                    <button onClick={isSigned ? logout : login}>
                        {isSigned ? "Log Out" : "Log In"}
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;