import React, { useState, useEffect, useRef } from "react";
import AdminLayout from "../../../hoc/adminLayout";
import { useFormik, FieldArray, FormikProvider } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addArticle } from "../../../store/actions/articleActions";
import { validation, formValues } from "./validationSchema";
import WYSIWYG from "../../../utils/forms/wysiwyg";
import Loader from "../../../utils/loader";

import {
  TextField,
  Button,
  Divider,
  Chip,
  Paper,
  InputBase,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  FormHelperText
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const AddArticle = (props) => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editorBlur, setEditorBlur] = useState(false);
  const actorsValue = useRef("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formValues,
    validationSchema: validation,
    onSubmit: (values, { resetForm }) => {
      setIsSubmitting(true);
      dispatch(addArticle(values));
    }
  });

  const handleEditorState = (state) => {
    formik.setFieldValue("content", state, true);
  };

  const handleEditorBlur = (blur) => {
    setEditorBlur(true);
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
      props.history.push(`/dashboard/articles`);
    }
    if (notifications && notifications.error) {
      setIsSubmitting(false);
    }
  }, [notifications, props.history]);

  return (
    <AdminLayout section="Add article">
      {isSubmitting ? (
        <Loader />
      ) : (
        <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <TextField
              style={{ width: "100%" }}
              name="title"
              label="Title"
              variant="outlined"
              {...formik.getFieldProps("title")}
              {...errorHelper(formik, "title")}
            />
          </div>
          <div className="form-group">
            <WYSIWYG
              setEditorState={(state) => handleEditorState(state)}
              setEditorBlur={(blur) => handleEditorBlur()}
            />
            {formik.errors.content && editorBlur ? (
              <FormHelperText error={true}>
                {formik.errors.content}
              </FormHelperText>
            ) : null}
            <TextField
              type="hidden"
              name="content"
              {...formik.getFieldProps("content")}
            />
          </div>
          <div className="form-group">
            <TextField
              style={{ width: "100%" }}
              name="excerpt"
              label="Excerpt"
              variant="outlined"
              {...formik.getFieldProps("excerpt")}
              {...errorHelper(formik, "excerpt")}
              multiline
              rows={4}
            />
          </div>
          <Divider className="mt-3 mb-3" />
          <h4>Movie Data and Score</h4>
          <div className="form-group">
            <TextField
              style={{ width: "100%" }}
              name="score"
              label="Score"
              variant="outlined"
              {...formik.getFieldProps("score")}
              {...errorHelper(formik, "score")}
              multiline
              rows={4}
            />
          </div>
          <div>
            <FormikProvider value={formik}>
              <h5>Actors</h5>
              <FieldArray
                name="actors"
                render={(arrayHelpers) => (
                  <div>
                    <Paper className="actors_form">
                      <InputBase
                        inputRef={actorsValue}
                        className="input"
                        placeholder="Actor's Name"
                      />
                      <IconButton
                        onClick={() => {
                          arrayHelpers.push(actorsValue.current.value);
                          actorsValue.current.value = "";
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Paper>
                    {formik.errors.actors && formik.touched.actors ? (
                      <FormHelperText error={true}>
                        {formik.errors.actors}
                      </FormHelperText>
                    ) : null}
                    <div className="chip_container">
                      {formik.values.actors.map((actor, index) => (
                        <div key={actor}>
                          <Chip
                            label={`${actor}`}
                            color="primary"
                            onDelete={() => arrayHelpers.remove(index)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              />
            </FormikProvider>
          </div>
          <div className="form-group">
            <TextField
              style={{ width: "100%" }}
              name="director"
              label="Director"
              variant="outlined"
              {...formik.getFieldProps("director")}
              {...errorHelper(formik, "director")}
              multiline
              rows={4}
            />
          </div>
          <div>
            <FormControl variant="outlined">
              <h5>Status</h5>
              <Select
                name="status"
                {...formik.getFieldProps("status")}
                error={
                  formik.errors.status && formik.touched.status ? true : false
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="public">public</MenuItem>
              </Select>
              {formik.errors.status && formik.touched.status ? (
                <FormHelperText error={true}>
                  {formik.errors.status}
                </FormHelperText>
              ) : null}
            </FormControl>
          </div>
          <Divider className="mt-3 mb-3" />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            //disabled={false}
          >
            Submit
          </Button>
        </form>
      )}
    </AdminLayout>
  );
};
export default AddArticle;
