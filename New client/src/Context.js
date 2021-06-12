import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    authenticatedPassword: Cookies.getJSON('authenticatedPassword') || null
  }
  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const {authenticatedUser, authenticatedPassword} = this.state;

    const value ={
      authenticatedUser,
      authenticatedPassword,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      }
    }
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  
  signIn = async (emailAddress, password) => {
    const response = await this.data.getUser(emailAddress, password); 
    // returns {firstName, lastName, emailAddress} or null if user isn't found
    let user;
    if(response.status === 200){
       user = await response.json(); 
      this.setState(() => {
        return {
          authenticatedUser: user,
          authenticatedPassword: password
        }
      });
      // Set cookie
      Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
      Cookies.set('authenticatedPassword', JSON.stringify(password), {expires: 1});
    } 
    return response;
  }

  signOut = () => {
    this.setState(() => {
      return {
        authenticatedUser: null,
        authenticatedPassword: null,
      };
    });
    Cookies.remove('authenticatedUser');
    Cookies.remove('authenticatedPassword');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

