import React, {Component} from 'react';


class Callback extends Component {

    componentDidMount(){
        // handle authentication
        if(/acess_token|id_token|error/.test(this.props.location.hash)) {
            this.props.auth.handleAuthentication();
        } else {
            throw new Error("Invalid callback Method")
        }
    }

    render() {
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
}

export default Callback;