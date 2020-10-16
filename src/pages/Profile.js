import React from 'react';



class ProfilePage extends React.Component {
    constructor(props){
        super(props)

        this.state={
            user: null,
            error: null
        }
    }
    
    componentDidMount() {
        this.loadUserProfile();
    }


    loadUserProfile() {
        this.props.auth.getProfile((profile, error) => {
            this.setState({profile, error})
        })
    }

    render() {
        const {auth} = this.props;
        console.log(auth);
        const {profile} = this.state;
        if (!profile) return null;
        return(
            <div style={{padding: '2rem'}}>
                <h1>Profile Page</h1>
                <p>{profile.name}</p>
                <img src={profile.picture} alt='profile pic'/>
                <pre>{JSON.stringify(profile,null,2)}</pre>
            </div>
        )
    }
}

export default ProfilePage;