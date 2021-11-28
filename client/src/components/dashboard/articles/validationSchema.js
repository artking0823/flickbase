import * as Yup from "yup";

export const formValues = {
  title: "",
  content: "",
  excerpt: "",
  score: 0,
  director: "",
  actors: [],
  status: "draft"
};

export const validation = () =>
  Yup.object({
    title: Yup.string().required("Please add a title."),
    content: Yup.string()
      .required("Please add content.")
      .min(50, "Content must be at least 50 characters."),
    excerpt: Yup.string()
      .required("Please add excerpt.")
      .min(5, "Excerpt must be at least 5 characters.")
      .max(500, "Maximum of 500 characters reached."),
    score: Yup.number()
      .required("Please add score.")
      .min(0, "Score must be 0-100.")
      .max(100, "Score must be between 0-100."),
    director: Yup.string().required("Please add a director."),
    actors: Yup.array()
      .required("Please add actors.")
      .min(3, "Add at least 3 actors."),
    status: Yup.string().required("Please add status.")
  });
