import * as Yup from "yup";
export const UploadSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Password is too short - should be 8 characters minimum.").required("Required"),
});
