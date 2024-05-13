import toast from "react-hot-toast";
import Axios from "./Axios";

const uploadImageService = async (file, setLoading) => {
  try {
    setLoading(true);
    const { data } = await Axios.post("/upload", file);
    setLoading(false);
    toast.success("Tải ảnh lên thành công");
    return data;
  } catch (error) {
    setLoading(false);
    toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
  }
};

export { uploadImageService };
