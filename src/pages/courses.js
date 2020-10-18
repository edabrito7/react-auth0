import React, {Component} from 'react';


class Courses extends Component {
    constructor(props){
        super(props);

        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        fetch('/course', {
            headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}`}
        })
        .then(response => {
            if (response.ok) return response.json();
            throw new Error("Network response was not ok.")
        })
        .then(response => this.setState({courses: response.courses}))
        .catch(err => this.setState({courses: err.message}));
    }

    render() {
        if(!this.state.courses) return null;
        return(
            <ul>
                {this.state.courses.map(course => {
                    console.log(course.title)
                    return <li key={course.id}>{course.title}</li>
                })}
            </ul>
            
        )
    }
}

export default Courses;