import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const savedData = {
  name: "Elhammmm",
  email: "eli@gmail.com",
  phoneNumber: "09151006565",
  password: "123",
  passConfirm: "123",
  gender: "1",
};

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passConfirm: "",
  gender: "",
};

const onSubmit = (values) => {
  console.log(values);
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required!")
    .min(6, "Name length is not valid"),
  email: Yup.string()
    .email("Invalid email format!")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required!")
    .matches(/^[0-9]{11}$/, "Invalid phone number!")
    .nullable(),
  password: Yup.string().required("Password is required"),
  passConfirm: Yup.string()
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  gender: Yup.string().required("Gender is required!"),
});

const SignUpForm = () => {
  const [formValues, setFormValues] = useState(null);

  const formik = useFormik({
    initialValues: formValues || initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            {...formik.getFieldProps("name")}
            name="name"
          />
          {formik.errors.name && formik.touched.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...formik.getFieldProps("email")}
            name="email"
          />
          {formik.errors.email && formik.touched.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="tel">Phone number</label>
          <input
            id="tel"
            type="text"
            {...formik.getFieldProps("phoneNumber")}
            name="phoneNumber"
          />
          {formik.errors.phoneNumber && formik.touched.phoneNumber && (
            <div className="error">{formik.errors.phoneNumber}</div>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="pass">Password</label>
          <input
            id="pass"
            type="password"
            {...formik.getFieldProps("password")}
            name="password"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="passCnfrm">Password confirmation</label>
          <input
            id="passCnfrm"
            type="password"
            {...formik.getFieldProps("passConfirm")}
            name="passConfirm"
          />
          {formik.errors.passConfirm && formik.touched.passConfirm && (
            <div className="error">{formik.errors.passConfirm}</div>
          )}
        </div>
        <div className="form-control">
          <input
            type="radio"
            id="0"
            value="0"
            name="gender"
            onChange={formik.handleChange}
            checked={formik.values.gender === "0"}
          />
          <label htmlFor="0">Male</label>
          <input
            type="radio"
            id="1"
            value="1"
            name="gender"
            onChange={formik.handleChange}
            checked={formik.values.gender === "1"}
          />
          <label htmlFor="1">Female</label>
          {formik.errors.gender && formik.touched.gender && (
            <div className="error">{formik.errors.gender}</div>
          )}
        </div>
        <button type="button" onClick={() => setFormValues(savedData)}>
          Load data
        </button>
        <button type="submit" disabled={!formik.isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
