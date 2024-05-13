import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { Input } from "../Components/UsedInputs";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { InlineError } from "../Components/Notification/Error";
import toast from "react-hot-toast";
import { registerAction } from "../Redux/Actions/userActions";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterValidation } from "../Components/Validation/userValidation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, userInfo, isSuccess } = useSelector(
    (state) => state.userRegister
  );

  // validate user
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterValidation),
  });

  // on submit
  const onSubmit = (data) => {
    dispatch(registerAction(data));
  };

  // userEffect
  useEffect(() => {
    if (userInfo?.isAdmin) {
      navigate("/dashboard");
    } else if (userInfo) {
      navigate("/profile");
    }
    if (isSuccess) {
      toast.success(`Xin chào ${userInfo.name}`);
      dispatch({ type: "USER_REGISTER_RESET" });
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_REGISTER_RESET" });
    }
  }, [userInfo, isSuccess, isError, navigate, dispatch]);
  return (
    <Layout>
      <div className="container mx-auto px-2 my-24 flex-colo">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry rounded-lg border border-border"
        >
          <img
            src="/images/logo.png"
            alt="logo"
            className="w-full h-12 object-contain"
          />
          <div className="w-full">
            <Input
              label="Họ và Tên"
              placeholder="Nhập họ và tên"
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
          <div className="w-full">
            <Input
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              type="password"
              name="password"
              register={register("password")}
              bg={true}
            />
            {errors.password && <InlineError text={errors.password.message} />}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-subMain border-2 border-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full"
          >
            {
              // if loading show loading
              isLoading ? (
                "Đang đăng ký tài khoản..."
              ) : (
                <>
                  <FiLogIn /> Đăng ký
                </>
              )
            }
          </button>
          <p className="text-center text-border">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-dryGray font-semibold ml-2">
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}

export default Register;

// 4:14:40
