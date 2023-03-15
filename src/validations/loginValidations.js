import * as Yup from "yup";
export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password is too short - should be 8 characters minimum.")
    .required("Required"),
});
export const ForgotSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});
export const ResetSchema = Yup.object().shape({
  new_password: Yup.string()
    .min(8, "Password is too short - should be 8 characters minimum.")
    .required("Required"),
  confirm_pass: Yup.string()
    .oneOf([Yup.ref("new_password")], "Passwords do not match")
    .required("Required"),
});

export const SignupSchema = Yup.object().shape({
  fullname: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password is too short - should be 8 characters minimum.")
    .required("Required"),
});
