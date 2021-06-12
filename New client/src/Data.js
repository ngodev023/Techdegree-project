

export default class Data {
    // method for sending requests to REST api
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
      
      const url = 'http://localhost:5000/api' + path;
    
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
      };
  
      if (body !== null) {
        options.body = JSON.stringify(body);
      }
  
      if(requiresAuth) {
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
        options.headers['Authorization'] = `Basic ${encodedCredentials}`;
      }
  
      return fetch(url, options);
    }
  
    // method for getting user info from REST api... primarily used to authenticate user.
    async getUser(emailAddress, password) {
      const response = await this.api(`/users`, 'GET', null, true, {emailAddress, password});
      // if (response.status === 200) {
      //   const user = await response.json();
      //   return user;
      // }
      // else if (response.status === 401) {
      //   const error = await response.json();
      //   return error;
      // }
      // else {
      //   throw new Error();
      // }

      return response;
    
    }
    
    // assists sign up page by logging data into REST api's database.
    async createUser(user) {
      const response = await this.api('/users', 'POST', user);
      // if (response.status === 201) {
      //   return [];
      // }
      // else if (response.status === 400) {
      //   return response.json().then(data => {
      //     return data.errors;
      //   });
      // }
      // else {
      //   throw new Error();
      // }
      return response;
    }

    // gets courses from db, doesn't require auth, but will redirect to error page if it doesn't get a 200 status code in response
    // props argument allows for redirecting.
    async getCourses(props) {
      const results = await this.api('/courses');
      if( results.status !== 200) {
        props.history.push('/error');
      } else {
        return results.json();
      }
    }

    // gets one course from db based on 
    async getOneCourse (courseId) {
      const result = await this.api('/courses/'+courseId);
      if(result.status === 200) {
        return result.json();
      }
    }

    //creates a new course
    async createCourse (reqBody, emailAddress, password) {
      const post = await this.api('/courses/', 'POST', reqBody, true, {emailAddress, password});
      return post;
    }

    // updates a course via put route
    async updateCourse (courseId, reqBody, emailAddress, password){
      const response = await this.api('/courses/'+courseId, 'PUT', reqBody, true, {emailAddress, password});
      
      // if(response.status === 204) {
      //   return "SUCCESS";
      // } else if (response.status === 403) {
      //   const errors = await response.json();
      //   console.log(errors);
      //   return errors
      // }
      console.log(response.status)
      return response;
    
    }

    async deleteCourse (courseId, emailAddress, password) {
      const response = await this.api('/courses/'+courseId, 'DELETE', null, true, {emailAddress, password});
      if (response.status === 204) {
        return "Course Deleted"
      } else if (response.status === 500) {
        return "ERROR"
      } else {
        return "ERROR"
      }
    }
  
  }
  
  