import React, { useEffect, useState } from "react";
import SideBar from "./../SideBar";
import { Input, Message, Select } from "./../../../Components/UsedInputs";
import Uploder from "./../../../Components/Uploder";
import { MdDelete } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { ImUpload } from "react-icons/im";
import CastsModal from "../../../Components/Modals/CastsModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { MovieValidation } from "../../../Components/Validation/movieValidation";
import {
  createMovieAction,
  removeCastAction,
} from "../../../Redux/Actions/moviesActions";
import toast from "react-hot-toast";
import { InlineError } from "../../../Components/Notification/Error";
import { ImagePreview } from "./../../../Components/ImagePreview";

function AddMovie() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cast, setCast] = useState(null);
  const [imageWithoutTitle, setImageWithoutTitle] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // use Selectors
  const { categories } = useSelector((state) => state.categoryGetAll);
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.movieCreate
  );
  const { casts } = useSelector((state) => state.casts);

  // validate movie
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(MovieValidation),
  });

  // on submit
  const onSubmit = (data) => {
    dispatch(
      createMovieAction({
        ...data,
        image: imageWithoutTitle,
        titleImage: imageTitle,
        video: videoUrl,
        casts,
      })
    );
  };

  // delete cast handler
  const deleteCastHandler = (id) => {
    dispatch(removeCastAction(id));
    toast.success("Xóa diễn viên thành công");
  };

  useEffect(() => {
    // if modal is false then reset cast
    if (modalOpen === false) {
      setCast();
    }
    // if success then reset form and navigate to addmovie
    if (isSuccess) {
      reset({
        name: "",
        time: 0,
        language: "",
        year: 0,
        category: "",
        desc: "",
        director: "",
      });
      setImageTitle("");
      setImageWithoutTitle("");
      setVideoUrl("");
      dispatch({ type: "CREATE_MOVIE_RESET" });
      navigate("/addmovie");
    }
    // if error then show error
    if (isError) {
      toast.error("Có lỗi xảy ra");
      dispatch({ type: "CREATE_MOVIE_RESET" });
    }
  }, [modalOpen, isSuccess, isError, dispatch, reset, navigate]);

  return (
    <SideBar>
      <CastsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        cast={cast}
      />
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Thêm phim</h2>
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="w-full">
            <Input
              label="Tiêu đề phim"
              placeholder="Nhập tiêu đề của phim"
              type="text"
              bg={true}
              name="name"
              register={register("name")}
            />
            {errors.name && <InlineError text={errors.name.message} />}
          </div>
          <div className="w-full">
            <Input
              label="Thời lượng"
              placeholder="Nhập thời lượng"
              type="number"
              bg={true}
              name="time"
              register={register("time")}
            />
            {errors.time && <InlineError text={errors.time.message} />}
          </div>
        </div>
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="w-full">
            <Input
              label="Ngôn ngữ"
              placeholder="Nhập ngôn ngữ"
              type="text"
              bg={true}
              name="language"
              register={register("language")}
            />
            {errors.language && <InlineError text={errors.language.message} />}
          </div>
          <div className="w-full">
            <Input
              label="Năm phát hành"
              placeholder="Nhập năm phát hành phim"
              type="number"
              bg={true}
              name="year"
              register={register("year")}
            />
            {errors.year && <InlineError text={errors.year.message} />}
          </div>
        </div>
        <div className="w-full grid md:grid-cols-2 gap-6">
          {/* director */}
          <div className="w-full">
            <Input
              label="Đạo diễn"
              placeholder="Nhập tên đạo diễn"
              type="text"
              bg={true}
              name="director"
              register={register("director")}
            />
            {errors.director && <InlineError text={errors.director.message} />}
          </div>
          {/* category */}
          <div className="text-sm w-full flex flex-col justify-center">
            <Select
              label="Thể loại"
              options={categories?.length > 0 ? categories : []}
              name="category"
              register={{ ...register("category") }}
            />
            {errors.category && <InlineError text={errors.category.message} />}
          </div>
        </div>
        {/* des */}
        <div className="w-full">
          <Message
            label="Mô tả"
            placeholder="Giới thiệu về phim"
            name="desc"
            register={{ ...register("desc") }}
          />
          {errors.desc && <InlineError text={errors.desc.message} />}
        </div>
        {/* image */}
        <div className="w-full grid md:grid-cols-2 gap-6">
          {/* image without title */}
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">Áp phích ngang</p>
            <Uploder setImageUrl={setImageWithoutTitle} />
            <ImagePreview image={imageWithoutTitle} name="imageWithoutTitle" />
          </div>
          {/* image with title */}
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">Áp phích dọc</p>
            <Uploder setImageUrl={setImageTitle} />
            <ImagePreview image={imageTitle} name="imageTitle" />
          </div>
        </div>
        {/* video */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-border font-semibold text-sm">
            Video phim
          </label>
          <div className={`w-full grid ${videoUrl && "md:grid-cols-2"} gap-6`}>
            {videoUrl && (
              <div className="w-full bg-main text-sm text-subMain py-4 border border-border rounded flex-colo">
                Video đã được tải lên
              </div>
            )}
            <Uploder setImageUrl={setVideoUrl} />
          </div>
        </div>
        {/* casts */}
        <div className="w-full grid lg:grid-cols-3 gap-6 items-start">
          <button
            onClick={() => setModalOpen(true)}
            className="w-full py-4 bg-main border border-subMain text-white rounded px-2"
          >
            Thêm diễn viên
          </button>
          <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4 col-span-2">
            {casts?.length > 0 &&
              casts?.map((user) => (
                <div
                  key={user.id}
                  className="p-2 italic text-xs rounded flex-colo bg-main border border-border"
                >
                  <img
                    src={`${user?.image ? user?.image : "/images/user.png"}`}
                    alt={user?.name}
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                  <p>{user.name}</p>
                  <div className="flex-rows mt-2 w-full gap-2">
                    <button
                      onClick={() => {
                        setCast(user);
                        setModalOpen(true);
                      }}
                      className="w-6 h-6 flex-colo text-white bg-green-600 rounded"
                    >
                      <BiSolidEdit />
                    </button>
                    <button
                      onClick={() => deleteCastHandler(user?.id)}
                      className="w-6 h-6 flex-colo text-white bg-subMain rounded"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* submit */}
        <button
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          className="bg-subMain w-full flex-rows gap-6 font-medium transitions hover:bg-dry border border-subMain text-white py-4 rounded"
        >
          {isLoading ? (
            "Đang tải..."
          ) : (
            <>
              <ImUpload /> Tải lên
            </>
          )}
        </button>
      </div>
    </SideBar>
  );
}

export default AddMovie;
