// This file contains the code for the individual course pages and retrieves the content from the /api/courses/:id route.

import React, { useState, useEffect } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import ReactMarkdown from "react-markdown";

function CourseDetail({ context }) {
  const history = useHistory();

  const [course, setCourseDetail] = useState({
    course: [],
    title: " ",
    description: " ",
    estimatedTime: " ",
    materialsNeeded: " ",
    firstName: " ",
    lastName: " ",
  });

  let { id } = useParams();

  useEffect(() => {
    context.data
      .getCourse(id)
      .then((data) =>
        setCourseDetail({
          course: data,
          title: data.title,
          description: data.description,
          estimatedTime: data.estimatedTime,
          materialsNeeded: data.materialsNeeded,
          firstName: data.User.firstName,
          lastName: data.User.lastName,
        })
      )
      .catch((err) => console.log(err));
  }, [id]);

  const deleteCourse = async (e) => {
    e.preventDefault();
    const username = context.authenticatedUser.emailAddress;
    const password = context.authenticatedUser.password;

    context.data
      .deleteCourse(id, username, password)
      .then((error) => {
        if (error.length) {
          console.log(error);
        } else {
          history.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <div className="actions--bar">
        <div className="wrap">
          {context.authenticatedUser &&
          context.authenticatedUser.id === course.course.userId ? (
            <>
              <NavLink
                exact
                to={`/courses/${course.course.id}/update`}
                className="button"
              >
                Update Course
              </NavLink>
              <NavLink
                exact
                to={`/courses/${course.course.id}/delete`}
                className="button"
                onClick={deleteCourse}
              >
                Delete Course
              </NavLink>
              <NavLink exact to="/" className="button button-secondary">
                Return to home
              </NavLink>
            </>
          ) : (
            <NavLink exact to="/" className="button button-secondary">
              Return to home
            </NavLink>
          )}
        </div>
      </div>
      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title} </h4>
              <p>
                By {course.firstName} {course.lastName}
              </p>

              <ReactMarkdown children={course.description} />
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <ReactMarkdown children={course.materialsNeeded} />
              </ul>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default CourseDetail;