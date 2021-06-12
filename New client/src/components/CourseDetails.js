import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkDown from 'react-markdown';

export default class CourseDetails extends Component {
    state = {
        courseTitle: '',
        courseId: '',
        courseDesc: '',
        courseTime: '',
        courseMaterials: '',
        ownerFN: '',
        ownerLN: '',
        ownerEmail: '',
        ownerId: '',
        ownerPresent: false
    }

    async componentDidMount(){
        // authentication data resting here...
        const userAuth = this.props.context.authenticatedUser;

        const courseId = this.props.match.params.id;
        const gottenCourse = await this.props.context.data.getOneCourse(courseId)
        if (gottenCourse) {
                this.setState({
                    courseTitle: gottenCourse.title,
                    courseId: gottenCourse.id,
                    courseDesc: gottenCourse.description,
                    courseTime: gottenCourse.estimatedTime,
                    courseMaterials: gottenCourse.materialsNeeded,
                    ownerFN: gottenCourse.user.firstName,
                    ownerLN: gottenCourse.user.lastName,
                    ownerEmail: gottenCourse.user.emailAddress,
                    ownerId: gottenCourse.user.id,
                    ownerPresent: userAuth ? userAuth.emailAddress == gottenCourse.user.emailAddress : false
                })
            } else {
                this.props.history.push('/notfound');
            }
    }

   destroy () {
    let confirm = window.confirm("This action cannot be undone...")
    if (confirm) {
        const {context} = this.props;
        context.data.deleteCourse(this.state.courseId, context.authenticatedUser.emailAddress, context.authenticatedPassword)
            .then(result => {
                if (result == "Course Deleted"){
                    this.props.history.push('/');
                }
            })
        
    }
   }


    render () {
        const {
            courseTitle, 
            courseId,
            courseDesc,
            courseTime,
            courseMaterials, 
            ownerFN, 
            ownerLN, 
            ownerEmail, 
            ownerId, 
            ownerPresent} = this.state;
        
            //const materialArr =courseMaterials.split(',');
            const updateGate = ownerPresent ? `/courses/${courseId}/update` : '/forbidden'; 
            
        return (
            <main>
                <div className="actions--bar">
                    <div className="wrap">
                        {ownerPresent? <Link className="button" to={updateGate}>Update Course</Link> : ""}
                        {ownerPresent? <button className="button" onClick={this.destroy.bind(this)}>Delete Course</button> : ""}
                        <Link className="button button-secondary" to={'/'}>Return to List</Link>
                    </div>
                </div>
                <div className="wrap">
                    <h2>Course Detail</h2>
                    <form>
                        <div className="main--flex">
                            <div>
                                <h3 className="course--detail--title">Course</h3>
                                <h4 className="course--name">{courseTitle}</h4>
                                <p>By {`${ownerFN} ${ownerLN}`}</p>
                                {/* <p>{courseDesc}</p> */}
                                <ReactMarkDown>{courseDesc}</ReactMarkDown>
                            </div>
                            <div>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{courseTime}</p>
                                <h3 className="course--detail--title">Materials Needed</h3>
                                {/* <ul>
                                    {materialArr[0] != "" ? 
                                        materialArr.map((item, index) =>{
                                        return <li key={index}>{item}</li>
                                        })
                                        :
                                        ""
                                    }
                                    
                                </ul> */}
                                <ReactMarkDown>{courseMaterials}</ReactMarkDown>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        )
    }

}