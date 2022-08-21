import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button } from "@material-ui/core";

import { registerUser, signInUser } from "../../store/actions/usersActions";
import PreventAuthRoute from "../../hoc/preventAuthRoute";

const Auth = (props) => {
  const [register, setRegister] = useState(false);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email required.")
        .email("Please provide a valid email."),
      password: Yup.string().required("Password is required.")
    }),
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
    }
  });

  const handleSubmit = (values) => {
    if (register) {
      dispatch(registerUser(values));
    } else {
      dispatch(signInUser(values));
    }
  };

  const errorHelper = (formik, values) => ({
    error: formik.errors[values] && formik.touched[values] ? true : false,
    helperText:
      formik.errors[values] && formik.touched[values]
        ? formik.errors[values]
        : null
  });

  useEffect(() => {
    if (notifications && notifications.success) {
      props.history.push("/dashboard");
    }
  }, [notifications, props.history]);

  return (
    <PreventAuthRoute>
      <div className="auth_container">
        <h1>Login</h1>
        <form className="mt-3" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <TextField
              style={{ width: "100%" }}
              name="email"
              label="Email"
              variant="outlined"
              {...formik.getFieldProps("email")}
              {...errorHelper(formik, "email")}
            />
          </div>
          <div className="form-group">
            <TextField
              style={{ width: "100%" }}
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              {...formik.getFieldProps("password")}
              {...errorHelper(formik, "password")}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
          >
            {register ? "Register" : "Login"}
          </Button>
          <br />
          <Button
            className="mt-3"
            size="small"
            variant="outlined"
            color="primary"
<<<<<<< HEAD
            large
=======
            size="large"
>>>>>>> 17c865a3151728b48eed4e8922919c11a0219bc5
            onClick={() => setRegister(!register)}
          >
            Want to {!register ? "Register" : "Login"}
          </Button>
        </form>
      </div>
    </PreventAuthRoute>
  );
};

export default Auth;
