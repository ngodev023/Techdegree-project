import React, { Component } from 'react';

export default class CreateCourse extends Component {
    state = {
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
        errors: []
    }

    render() {
        const {
            title, 
            description,
            estimatedTime,
            materialsNeeded,
            errors
        } = this.state;

        const {context} = this.props;
        return (
            <main>
                <div className="wrap">
                    <h2>Create Course</h2>
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
                        <button className="button" type="submit">Create Course</button>
                        <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
                    </form>
                </div>
            </main>
        )
    }

    // keeps track of user's inputs and storing it in the state prop
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
    }

    // clicking submit/create course button
    submit = async (event) => {
        event.preventDefault();
        // stuff passed down from the Provider component, such as the ability to make requests to the api folder
        const {context} = this.props;
        
        // stuff currently in the state property... essentially the user inputs.
        const {title, description, estimatedTime, materialsNeeded} = this.state;
        
        // store the necessary info minus error array into a reqBody
        const reqBody = {title, description, estimatedTime, materialsNeeded};

        // send a request to the post route using the reqBody, and the authorization info. 
        try{
            // use data's api method to send a request to db
            const response = await context.data.createCourse(reqBody, context.authenticatedUser.emailAddress, context.authenticatedPassword);
                if (response.status === 201) {
                    // course successfully created
                    
                    this.props.history.push(response.headers.get('Location'));
                } else if (response.status === 400) {
                    // input errors in submission; validation errors
                    const errors = await response.json();
                    this.setState({
                        errors: errors.errors
                    })
                } else if (response.status === 500){
                    // the db is not working properly
                    this.props.history.push('/error');
                }
            } catch (error) {
                // cannot send request for whatever reason
                this.props.history.push('/error');
            }
            
    }

    // cancel button
    cancel = (event) => {
        event.preventDefault();
        this.props.history.push('/');
    }
}