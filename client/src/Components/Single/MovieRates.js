import React, { useEffect } from "react";
import Titles from "../Titles";
import { BsBookmarkStarFill } from "react-icons/bs";
import { Message, Select } from "../UsedInputs";
import Rating from "./../Stars";
import { Empty } from "./../Notification/Empty";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReviewValidation } from "../Validation/movieValidation";
import toast from "react-hot-toast";
import { InlineError } from "./../Notification/Error";
import { Link } from "react-router-dom";
import { reviewMovieAction } from "./../../Redux/Actions/moviesActions";

const Ratings = [
  {
    title: "Xếp hạng",
    value: 0,
  },
  {
    title: "1 - Rất tệ",
    value: 1,
  },
  {
    title: "2 - Tệ",
    value: 2,
  },
  {
    title: "3 - Bình thường",
    value: 3,
  },
  {
    title: "4 - Tốt",
    value: 4,
  },
  {
    title: "5 - Rất tốt",
    value: 5,
  },
];

function MovieRates({ movie }) {
  const dispatch = useDispatch();
  // useSelector
  const { isLoading, isError } = useSelector((state) => state.createReview);
  const { userInfo } = useSelector((state) => state.userLogin);

  // validate review
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ReviewValidation),
  });

  // on submit
  const onSubmit = (data) => {
    dispatch(
      reviewMovieAction({
        id: movie?._id,
        review: data,
      })
    );
  };

  useEffect(() => {
    if (isError) {
      toast.error(isError);
      dispatch({ type: "CREATE_REVIEW_RESET" });
    }
  }, [isError, dispatch]);

  return (
    <div className="my-12">
      <Titles title="Đánh giá" Icon={BsBookmarkStarFill} />
      <div className="mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-20 rounded">
        {/* write review*/}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="xl:col-span-2 w-full flex flex-col gap-8"
        >
          <h3 className="text-xl text-text font-semibold">
            Đánh giá "{movie?.name}"
          </h3>
          <p className="text-sm leading-7 font-medium text-border">
            Để lại bình luận cho bộ phim. Bình luận của bạn sẽ được đăng trên
            trang này.
          </p>
          <div className="w-full text-sm">
            <Select
              label="Xếp hạng"
              options={Ratings}
              name="rating"
              register={{ ...register("rating") }}
            />
            <div className="flex mt-4 text-lg gap-2 text-star">
              <Rating value={watch("rating", false)} />
            </div>
            {errors.rating && <InlineError text={errors.rating.message} />}
          </div>
          {/* message */}
          <div className="w-full">
            <Message
              name="comment"
              register={{ ...register("comment") }}
              label="Đánh giá"
              placeholder="Mô tả trải nghiệm của bạn"
            />
            {errors.comment && <InlineError text={errors.comment.message} />}
          </div>

          {/* submit */}
          {userInfo ? (
            <button
              disabled={isLoading}
              type="submit"
              className="bg-subMain hover:bg-transparent border-2 border-subMain transitions text-white py-3 w-full flex-colo rounded"
            >
              {isLoading ? "Đang gửi..." : "Gửi đánh giá"}
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-main hover:bg-subMain border-2 border-subMain transitions text-white py-3 w-full flex-colo rounded"
            >
              Đăng nhập để đánh giá
            </Link>
          )}
        </form>
        {/* reviews */}
        <div className="col-span-3 w-full flex flex-col gap-6">
          <h3 className="text-xl text-text font-semibold">
            Bài đánh giá ({movie?.numberOfReviews})
          </h3>
          <div className="w-full flex flex-col bg-main gap-6 rounded-lg md:p-12 p-6 h-header overflow-y-scroll">
            {movie?.reviews?.length > 0 ? (
              movie?.reviews?.map((review) => (
                <div
                  key={review?._id}
                  className="md:grid flex flex-col w-full grid-cols-12 gap-6 bg-dry p-4 border border-gray-800 rounded-lg"
                >
                  <div className="col-span-2 bg-main hidden md:block">
                    <img
                      src={
                        review?.userImage
                          ? review?.userImage
                          : "/images/user.png"
                      }
                      alt={review?.userName}
                      className="w-full h-24 rounded-lg object-cover"
                    />
                  </div>
                  <div className="col-span-7 flex flex-col gap-2">
                    <h2>{review?.userName}</h2>
                    <p className="text-xs font-medium leading-6 text-text">
                      {review?.comment}
                    </p>
                  </div>
                  {/* rate */}
                  <div className="col-span-3 flex-rows border-l border-border text-xs gap-1 text-star">
                    <Rating value={review?.rating} />
                  </div>
                </div>
              ))
            ) : (
              <Empty
                message={`Chưa có đánh giá nào cho bộ phim "${movie?.name}"`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieRates;
