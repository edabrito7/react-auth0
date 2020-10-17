import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import Auth from './auth0/Auth';

import NavBar from './navbar/Navbar';

import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
import Public from './pages/public';
import Private from './pages/private';
import Callback from './pages/callback';


class  App extends React.Component  {
  constructor(props){
    super(props);
    this.auth = new Auth(this.props.history)
  }
  render(){
    const isSigned = this.auth.isAutheticated();
    return (
      <div className="App">
        <NavBar  auth={this.auth} isSigned={isSigned} />
        <Route exact path='/' render={props => <HomePage auth={this.auth} {...props} />}/>
        <Route  path='/callback' render={props => <Callback auth={this.auth} {...props} />}/>
        <Route path='/public' render={props => <Public/>}/>
        <Route path='/private' render={props => isSigned ? <Private auth={this.auth} {...props}/> : this.auth.login()}/>
        <Route path='/profile' render={props => isSigned ? <ProfilePage auth={this.auth} {...props}/> : <Redirect to='/'/>}/>
      </div>
    );
  }
}

export default App;
