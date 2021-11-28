import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { changeEmail } from "../../../../store/actions/usersActions";

import { TextField, Button, Stepper, Step, StepLabel } from "@material-ui/core";

const EmailStepper = ({ user }) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Provide Old Email", "Create New Email", "Finish"];
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      newemail: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Please provide your old email.")
        .email("Please provide a valid email.")
        .test(
          "match",
          "The email you provided does not match with your old email.",
          (email) => {
            return email === user.data.email;
          }
        ),
      newemail: Yup.string()
        .required("Please provide a new email.")
        .email("Please provide a valid email.")
        .test(
          "equal",
          "Your new email must not be the same with your old email.",
          (newemail) => {
            return newemail !== user.data.email;
          }
        )
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(changeEmail(values));
    }
  });

  const errorHelper = (formik, values) => ({
    error: formik.errors[values] && formik.touched[values] ? true : false,
    helperText:
      formik.errors[values] && formik.touched[values]
        ? formik.errors[values]
        : null
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const nextBtn = () => (
    <Button
      className="mt-3"
      variant="contained"
      color="primary"
      onClick={handleNext}
    >
      Next
    </Button>
  );

  const backBtn = () => (
    <Button className="mt-3 ml-2" variant="contained" onClick={handleBack}>
      Back
    </Button>
  );

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <form className="mt-3 stepper_form" onSubmit={formik.handleSubmit}>
        {activeStep === 0 ? (
          <div className="form-group">
            <TextField
              style={{ width: "100%" }}
              name="email"
              label="Old Email"
              variant="outlined"
              {...formik.getFieldProps("email")}
              {...errorHelper(formik, "email")}
            />
            {formik.values.email && !formik.errors.email ? nextBtn() : null}
          </div>
        ) : null}
        {activeStep === 1 ? (
          <div className="form-group">
            <TextField
              style={{ width: "100%" }}
              name="newemail"
              label="New Email"
              variant="outlined"
              {...formik.getFieldProps("newemail")}
              {...errorHelper(formik, "newemail")}
            />
            {formik.values.newemail && !formik.errors.newemail
              ? nextBtn()
              : null}
            {backBtn()}
          </div>
        ) : null}
        {activeStep === 2 ? (
          <div className="form-group">
            <Button
              className="mt-3"
              variant="contained"
              color="primary"
              onClick={formik.submitForm}
            >
              Submit Changes
            </Button>
            {backBtn()}
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default EmailStepper;
