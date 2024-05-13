import * as yup from "yup";

// login validation
const LoginValidation = yup.object().shape({
  email: yup.string().email().required("Email là trường bắt buộc").trim(),
  password: yup
    .string()
    .required("Mật khẩu là trường bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(20, "Mật khẩu không được quá 20 ký tự")
    .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa ít nhất 1 số"),
});

// register validation
const RegisterValidation = yup.object().shape({
  email: yup.string().email().required("Email là trường bắt buộc").trim(),
  password: yup
    .string()
    .required("Mật khẩu là trường bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(20, "Mật khẩu không được quá 20 ký tự")
    .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa ít nhất 1 số"),
  name: yup
    .string()
    .required("Tên là trường bắt buộc")
    .max(20, "Tên không được quá 20 ký tự")
    .matches(/^[a-zA-Z ]*$/, "Tên không được chứa ký tự đặc biệt"),
});

const ProfileValidation = yup.object().shape({
  name: yup
    .string()
    .required("Tên là trường bắt buộc")
    .max(20, "Tên không được quá 20 ký tự")
    .matches(/^[a-zA-Z ]*$/, "Tên không được chứa ký tự đặc biệt"),
  email: yup.string().email().required("Email là trường bắt buộc").trim(),
});

const PasswordValidation = yup.object().shape({
  oldPassword: yup
    .string()
    .required("Mật khẩu cũ là trường bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(20, "Mật khẩu không được quá 20 ký tự")
    .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa ít nhất 1 số"),
  newPassword: yup
    .string()
    .required("Mật khẩu mới là trường bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(20, "Mật khẩu không được quá 20 ký tự")
    .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa ít nhất 1 số"),
  confirmPassword: yup
    .string()
    .required("Nhập lại mật khẩu mới là trường bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(20, "Mật khẩu không được quá 20 ký tự")
    .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa ít nhất 1 số")
    .oneOf([yup.ref("newPassword"), null], "Mật khẩu không khớp"),
});

export {
  LoginValidation,
  RegisterValidation,
  ProfileValidation,
  PasswordValidation,
};
