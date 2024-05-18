import * as yup from "yup";

const ReviewValidation = yup.object().shape({
  comment: yup
    .string()
    .required("Bình luận không được để trống")
    .max(150, "Bình luận không được quá 150 ký tự"),
  rating: yup.number().required("Xếp hạng cho phim"),
});

const MovieValidation = yup.object().shape({
  name: yup
    .string()
    .required("Tên phim không được để trống")
    .max(50, "Tên phim không được quá 50 ký tự"),
  time: yup.number().required("Thời lượng phim không được để trống"),
  language: yup.string().required("Ngôn ngữ phim không được để trống"),
  year: yup.number().required("Năm sản xuất phim không được để trống"),
  category: yup.string().required("Thể loại phim không được để trống"),
  desc: yup
    .string()
    .required("Mô tả phim không được để trống")
    .max(300, "Mô tả phim không được quá 300 ký tự"),
});

export { ReviewValidation, MovieValidation };
