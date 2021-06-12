import React, { Component } from 'react';

export default class UpdateCourse extends Component {
    
    state = {
        courseId: '',
        title:'',
        description:'',
        estimatedTime:'',
        materialsNeeded:'',
        ownerId:'',
        errors:[]
    }

    async componentDidMount () {
        try {
        
        const {context} = this.props;
        const response = await context.data.getOneCourse(this.props.match.params.id);
        this.setState({
            courseId: response.id,
            title: response.title,
            description: response.description,
            estimatedTime: response.estimatedTime,
            materialsNeeded: response.materialsNeeded,
            ownerId: response.userId

        });
        
           if(context.authenticatedUser.id != this.state.ownerId) {
            this.props.history.push('/forbidden');
            } 
        } catch (error) {
            this.props.history.push('/notfound');
        }
        

    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
      }

      submit = async (event) => {
        event.preventDefault();
        // stuff passed down from the Provider component, such as the ability to make requests to the api folder
        const {context} = this.props;
        // stuff currently in the state property... essentially the user inputs.
        const {courseId, title, description, estimatedTime, materialsNeeded} = this.state;
        
        // store the necessary info minus error array into a reqBody
        const reqBody = {title, description, estimatedTime, materialsNeeded};

        // send a request to the PUT route using the reqBody, and the authorization info.
        const response = await context.data.updateCourse(courseId, reqBody, context.authenticatedUser.emailAddress, context.authenticatedPassword)
            // .then(response => {
            //     if (response == "SUCCESS") {
            //         console.log("WE GOT SUCCESS")
            //         this.props.history.push('/');
            //     } else if (response == "ERROR"){
            //         console.log("WE GOT A GENERIC ERROR")
            //         this.props.history.push('/error');
            //     } else if (response.errors) {
            //         console.log("WE GOT ERRORS!")
            //         // validation errors.
            //         this.setState({
            //             errors: response.errors
            //         });
            //     } else {
            //         console.log("WE GOT THE LAST")
            //         this.props.history.push('/error');
            //     }
            // })

            if (response.status === 204) {
                this.props.history.push(`/courses/${courseId}`);
            } else if (response.status === 400) {
                const errors = await response.json();
                this.setState({
                    errors: errors.errors
                })
            } else if (response.status === 403) {
                this.props.history.push('/forbidden');
            } else {
                this.props.history.push('/error');
            }
        
      }

    cancel = (event) => {
        event.preventDefault();
        this.props.history.push('/');
      }

    render() {

        const {
            courseId,
            title, 
            description,
            estimatedTime,
            materialsNeeded,
            errors
        } = this.state;

        const {context} = this.props;

        return(
            <main>
                <div className="wrap">
                    <h2>Update Course</h2>
                    {errors.length > 0 ? (
                        <div className="validation--errors">
                            <h3>Validation Errors</h3>
                            <ul>{errors.map((error, i) => <li key={i}>{error}</li>)}</ul>
                        </div>
                    )
                    :
                    (
                        <div></div>
                    )}
                    <form onSubmit={this.submit}>
                        <div className="main--flex">
                            <div>
                                <label htmlFor="title">Course Title</label>
                                <input id="title" name="title" type="text" value={title} onChange={this.change}/>

                                <p>By {`${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}`}</p>

                                <label htmlFor="description">Course Description</label>
                                <textarea id="description" name="description" value={description} onChange={this.change} />
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={this.change} />

                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={this.change} />
                            </div>
                        </div>
                        <button className="button" type="submit">Update Course</button>
                        <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
                    </form>
                </div>
            </main>
        )
    }
}