import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Uploder from "../../Components/Uploder";
import { Input } from "../../Components/UsedInputs";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProfileValidation } from "../../Components/Validation/userValidation";
import { InlineError } from "../../Components/Notification/Error";
import { ImagePreview } from "../../Components/ImagePreview";
import {
  deleteProfileAction,
  updateProfileAction,
} from "../../Redux/Actions/userActions";
import toast from "react-hot-toast";

function Profile() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image : "");
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.userUpdateProfile
  );
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.userDeleteProfile
  );
  // validate user
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProfileValidation),
  });

  // update profile
  const onSubmit = (data) => {
    dispatch(updateProfileAction({ ...data, image: imageUrl }));
  };

  // delete profile
  const deleteProfile = () => {
    window.confirm("Bạn có chắc chắn muốn xóa tài khoản?") &&
      dispatch(deleteProfileAction());
  };

  // userEffect
  useEffect(() => {
    if (userInfo) {
      setValue("name", userInfo?.name);
      setValue("email", userInfo?.email);
    }
    if (isSuccess) {
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
    }
    if (isError) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    }
    if (deleteError) {
      toast.error("Không thể xóa tài khoản Admin");
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
      dispatch({ type: "USER_DELETE_PROFILE_RESET" });
    }
  }, [userInfo, setValue, isSuccess, isError, dispatch, deleteError]);

  return (
    <SideBar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Hồ sơ</h2>
        <div className="w-full grid lg:grid-cols-12 gap-6">
          <div className="col-span-10">
            <Uploder setImageUrl={setImageUrl} />
          </div>
          {/* image preview */}
          <div className="col-span-2">
            <ImagePreview
              image={imageUrl}
              name={userInfo ? userInfo.name : "Người dùng Movix"}
            />
          </div>
        </div>
        <div className="w-full">
          <Input
            label="Họ và tên"
            placeholder="Người dùng 1"
            type="text"
            bg={true}
            name="name"
            register={register("name")}
          />
          {errors.name && <InlineError text={errors.name.message} />}
        </div>
        <div className="w-full">
          <Input
            label="Email"
            placeholder="Nhập email"
            type="email"
            name="email"
            register={register("email")}
            bg={true}
          />
          {errors.email && <InlineError text={errors.email.message} />}
        </div>
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button
            onClick={deleteProfile}
            disabled={deleteLoading || isLoading}
            className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            {deleteLoading ? "Đang xử lý..." : "Xóa tài khoản"}
          </button>
          <button
            disabled={deleteLoading || isLoading}
            className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            {isLoading ? "Đang cập nhật..." : "Cập nhật"}
          </button>
        </div>
      </form>
    </SideBar>
  );
}

export default Profile;
