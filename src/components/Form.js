import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const URL = `https://student-leaderboard-api-y57renyjuq-el.a.run.app//api/v1/students`;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 700,
    margin: "0 auto",
  },
}));

const validationSchema = yup.object({
  name: yup.string("Enter your Name").required("Name is required"),
  roll: yup
    .number("Enter your roll")
    .min(0)
    .max(65000)
    .required("Roll is required"),
  physics: yup
    .number("Enter your marks in Physics")
    .required("Marks in physics is required")
    .min(0)
    .max(100),
  chemistry: yup
    .number("Enter your marks in chemistry")
    .required("Marks in chemistry is required")
    .min(0)
    .max(100),
  maths: yup
    .number("Enter your marks in maths")
    .required("Marks in maths is required")
    .min(0)
    .max(100),
});

export default function Form(props) {
  const classes = useStyles();
  React.useEffect(() => {
    console.log(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { student, request } = props;
  const formik = useFormik({
    initialValues: {
      name: student.name || "",
      roll: student.roll || "",
      maths: student.maths || 0,
      physics: student.physics || 0,
      chemistry: student.chemistry || 0,
      total: student.total || 0,
      percentage: student.percentage || 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values.total =
        parseFloat(values.maths) +
        parseFloat(values.physics) +
        parseFloat(values.chemistry);
      values.percentage = Math.round((values.total / 3) * 100) / 100;
      values.total = values.total.toString();
      values.percentage = values.percentage.toString();
      console.log(values);
      if (request === "POST") {
        axios
          .post(URL, values)
          .then((res) => {
            console.log(res.data);
            if (res.data.sqlMessage) {
              alert(res.data.sqlMessage);
            } else {
              alert("Student saved successfully");
            }
            localStorage.clear();
          })
          .catch((e) => console.log(e));
      }
      if (request === "PUT") {
        axios
          .put(`${URL}/${student.id}`, values)
          .then((res) => {
            console.log(res.data);
            if (res.data.sqlMessage) {
              alert(res.data.sqlMessage);
            } else {
              alert("Student Updated successfully");
            }
            localStorage.clear();
          })
          .catch((e) => console.log(e));
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          className={classes.root}
          container
          spacing={3}
          justify="center"
          maxWidth={700}
        >
          <Grid item md={12} xs={12}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>

          <Grid item md={12} xs={12}>
            <TextField
              fullWidth
              id="roll"
              name="roll"
              label="Roll"
              type="roll"
              value={formik.values.roll}
              onChange={formik.handleChange}
              error={formik.touched.roll && Boolean(formik.errors.roll)}
              helperText={formik.touched.roll && formik.errors.roll}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              fullWidth
              id="physics"
              name="physics"
              label="Physics"
              type="physics"
              value={formik.values.physics}
              onChange={formik.handleChange}
              error={formik.touched.physics && Boolean(formik.errors.physics)}
              helperText={formik.touched.physics && formik.errors.physics}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              fullWidth
              id="chemistry"
              name="chemistry"
              label="Chemistry"
              type="chemistry"
              value={formik.values.chemistry}
              onChange={formik.handleChange}
              error={
                formik.touched.chemistry && Boolean(formik.errors.chemistry)
              }
              helperText={formik.touched.chemistry && formik.errors.chemistry}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              fullWidth
              id="maths"
              name="maths"
              label="Maths"
              type="maths"
              value={formik.values.maths}
              onChange={formik.handleChange}
              error={formik.touched.maths && Boolean(formik.errors.maths)}
              helperText={formik.touched.maths && formik.errors.maths}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              fullWidth
              id="total"
              name="total"
              label="Total"
              type="total"
              value={
                parseFloat(formik.values.maths) +
                parseFloat(formik.values.physics) +
                parseFloat(formik.values.chemistry)
              }
              //   onChange={formik.handleChange}
              error={formik.touched.total && Boolean(formik.errors.total)}
              helperText={formik.touched.total && formik.errors.total}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              fullWidth
              id="percentage"
              name="percentage"
              label="Percentage"
              type="percentage"
              value={
                Math.round(
                  ((parseFloat(formik.values.maths) +
                    parseFloat(formik.values.physics) +
                    parseFloat(formik.values.chemistry)) /
                    3) *
                    100
                ) / 100
              }
              //   onChange={formik.handleChange}
              error={
                formik.touched.percentage && Boolean(formik.errors.percentage)
              }
              helperText={formik.touched.percentage && formik.errors.percentage}
            />
          </Grid>
          <Grid item xs={5} sm={3}>
            <Button color="primary" fullWidth variant="contained" type="submit">
              {request === "POST" ? "Submit" : "Update"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
