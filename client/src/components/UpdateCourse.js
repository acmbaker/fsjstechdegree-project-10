// This page contains the code which allows the user to edit their courses

import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "./Form";

function UpdateCourse({ context }) {
  const history = useHistory();

  const [course, setCourse] = useState({
    title: " ",
    description: " ",
    estimatedTime: " ",
    materialsNeeded: " ",
    user: {
      id: "",
      firstName: "",
      lastName: "",
      emailAddress: "",
    },
  });

  let { id } = useParams();
  const [errors, setErrorMessages] = useState([]);

  useEffect(() => {
    context.data
      .getCourse(id)
      .then((data) =>
        setCourse({
          course: data,
          title: data.title,
          description: data.description,
          estimatedTime: data.estimatedTime,
          materialsNeeded: data.materialsNeeded,
          user: {
            id: data.User.id,
            firstName: data.User.firstName,
            lastName: data.User.lastName,
            emailAddress: data.User.emailAddress,
          },
        })
      )
      .catch((err) => console.log(err));
  }, [id]);

  const cancel = () => {
    history.push("/");
  };

  const submit = () => {
    const username = context.authenticatedUser.emailAddress;
    const password = context.authenticatedUser.password;

    const updatedCourse = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: course.user.id,
    };

    context.data
      .updateCourse(updatedCourse, id, username, password)
      .then((errors) => {
        if (errors.length) {
          setErrorMessages(errors);
        } else {
          history.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setCourse((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const { title, description, estimatedTime, materialsNeeded } = course;

  return (
    <div className="wrap">
      <h2>Update Course</h2>

      <Form
        errors={errors}
        cancel={cancel}
        submit={submit}
        submitButtonText="Update Course"
        elements={() => (
          <React.Fragment>
            <div className="main--flex">
              <div>
                <label htmlFor="title">
                  Course Title
                  <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={handleChange}
                    value={title}
                  />
                </label>
                <p>
                  By {course.user?.firstName} {course.user?.lastName}
                </p>

                <label htmlFor="description">
                  Course Description
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    onChange={handleChange}
                    value={description}
                  />
                </label>
              </div>

              <div>
                <label htmlFor="estimatedTime">
                  Estimated Time
                  <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    onChange={handleChange}
                    value={estimatedTime}
                  />
                </label>

                <label htmlFor="materialsNeeded">
                  Materials Needed
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                    type="text"
                    onChange={handleChange}
                    value={materialsNeeded}
                  />
                </label>
              </div>
            </div>
          </React.Fragment>
        )}
      />
    </div>
  );
}

export default UpdateCourse;