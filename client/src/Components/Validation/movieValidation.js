import * as yup from "yup";

const ReviewValidation = yup.object().shape({
  comment: yup
    .string()
    .required("Bình luận không được để trống")
    .max(150, "Bình luận không được quá 150 ký tự"),
  rating: yup.number().required("Xếp hạng cho phim"),
});

export { ReviewValidation };
