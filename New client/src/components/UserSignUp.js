import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmedPassword: '',
    errors: []
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmedPassword,
      errors,
    } = this.state;

    return (
      <main className="bounds">
        <div className="form--centered">
          <h2>Sign Up</h2>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  value={firstName} 
                  onChange={this.change} 
                  placeholder="First Name" />
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text"
                  value={lastName} 
                  onChange={this.change} 
                  placeholder="Last Name" />
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="Email Address" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />
                <input 
                  id="confirmedPassword" 
                  name="confirmedPassword"
                  type="password"
                  value={confirmedPassword} 
                  onChange={this.change} 
                  placeholder="Confirm Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </main>
    );
  }
  
  // changes the inputs' displays as user types.
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }
  
    // cancel button 
  cancel = () => {
    this.props.history.push('/');
  }

  // submit function--takes ipnuts and uses api method in Data.js to be stored in database
  // then logs users in and redirects them to previous page they were on.
  submit = async () => {
    // stuff passed down from the Provider component, such as the ability to make requests to the api folder
    const {context} = this.props;
    
    // stuff currently in the state property... essentially the user inputs.
    const {firstName, lastName, emailAddress, password} = this.state;

    // putting the user input data into one neat package called user.
    // This is essentially going to serve as the body of the request used in Postman.
    const user = {firstName, lastName, emailAddress, password};

    if(this.state.password === this.state.confirmedPassword && password) {
      const response = await context.data.createUser(user);

      try {
        if (response.status === 201){
          // if all goes well--> back to courses listing
          await context.actions.signIn(emailAddress,password);
          this.props.history.push('/');
        } else if(response.status === 400) {
          // validation errors
          const errors = await response.json();
          this.setState({
            errors: errors.errors
          });
        } else if (response.status === 500){
          // the db is not working properly
          this.props.history.push('/error');
        }
      } catch (error) {
        // cannot send request for whatever reason
        this.props.history.push('/error');
      }
    } else {
      // request shouldn't be sent at all if passwords don't match or is blank
      this.setState({
        errors: ["Please make sure password and confirm password are a match"]
      })
    }
      // createUser, located in Data.js returns an array of errors if there are any
      // .then(errors => {
      //   if(errors.length) {
      //     // changes state of component if there are errors; remember state is dynamic
      //     this.setState({errors});
      //   } else {
      //     // If creation of user is successful, automatically sign user in.
      //     context.actions.signIn(emailAddress, confirmedPassword)
      //       .then(() => {
      //         this.props.history.push('/');
      //       })
      //   }
      // }).catch(err => {
      //   // for connectivity related errors
      //   console.log(err);
      //   // redirect user to error page
      //   this.props.history.push('/error');
      // })
  }  
}
