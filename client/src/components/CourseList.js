// This file contains the code for course list.

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function CourseList({ context }) {
  let [courses, setCourses] = useState([]);

  useEffect(() => {
    context.data
      .getCourses()
      .then((data) => setCourses(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="wrap main--grid">
      <React.Fragment>
        {courses.map((course) => (
          <NavLink
            to={`/courses/${course.id}`}
            key={course.id}
            className="course--link course--module"
          >
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
          </NavLink>
        ))}
        <NavLink
          to="courses/create"
          className="course--module course--add--module"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 13 13"
              x="0px"
              y="0px"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </NavLink>
      </React.Fragment>
    </div>
  );
}

export default CourseList;