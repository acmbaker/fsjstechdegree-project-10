import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import CourseList from "./components/CourseList";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";

import withContext from "./Context";
import PrivateRoute from "./components/PrivateRoute";

const HeaderContext = withContext(Header);
const CourseListContext = withContext(CourseList);
const CourseDetailContext = withContext(CourseDetail);
const CreateCourseContext = withContext(CreateCourse);
const UpdateCourseContext = withContext(UpdateCourse);
const SignUpContext = withContext(SignUp);
const SignInContext = withContext(SignIn);
const SignOutContext = withContext(SignOut);

const App = () => (
  <Router>
    <>
      <HeaderContext />
      <Switch>
        <Route exact path="/" component={CourseListContext} />
        <PrivateRoute
          exact
          path="/courses/create"
          component={CreateCourseContext}
        />
        <PrivateRoute
          exact
          path="/courses/:id/update"
          component={UpdateCourseContext}
        />
        <Route path="/courses/:id" component={CourseDetailContext} />
        <Route path="/signin" component={SignInContext} />
        <Route path="/signup" component={SignUpContext} />
        <Route path="/signout" component={SignOutContext} />
      </Switch>
    </>
  </Router>
);

export default App;
