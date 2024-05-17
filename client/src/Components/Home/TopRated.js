import React from "react";
import Titles from "./../Titles";
import { BsBookmarkStarFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Rating from "../Stars";
import Loader from "../Notification/Loader";
import { Empty } from "../Notification/Empty";
import { useDispatch, useSelector } from "react-redux";
import { FavoriteMovie, IfMovieFavorited } from "../../Context/Functionalities";

const SwiperTop = ({ movies }) => {
  const { isLoading } = useSelector((state) => state.userFavoriteMovie);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  // if favorited function
  const isFavorited = (movie) => {
    return IfMovieFavorited(movie);
  };

  return (
    <Swiper
      autoplay={true}
      speed={1000}
      loop={true}
      modules={[Autoplay]}
      spaceBetween={40}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
      }}
    >
      {movies?.map((movie, index) => (
        <SwiperSlide key={index}>
          <div className="p-4 h-rate hovered border border-border bg-dry rounded-lg overflow-hidden">
            <img
              src={
                movie?.titleImage
                  ? `/images/movies/${movie.titleImage}`
                  : "/images/user.png"
              }
              alt={movie?.name}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="px-4 hoveres gap-6 text-center absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0">
              <button
                onClick={() => FavoriteMovie(movie, dispatch, userInfo)}
                disabled={isFavorited(movie) || isLoading}
                className={`w-12 h-12 flex-colo transitions hover:bg-subMain rounded-full
                ${
                  isFavorited(movie) ? "bg-subMain" : "bg-white bg-opacity-30"
                } text-white`}
              >
                <FaHeart />
              </button>
              <Link
                className="font-semibold text-xl trancuted line-clamp-2"
                to={`/movie/${movie?._id}`}
              >
                {movie?.name}
              </Link>
              <div className="flex gap-2 text-star">
                <Rating value={movie?.rate} />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

function TopRated({ movies, isLoading }) {
  return (
    <div className="my-16">
      <Titles title="Đánh giá cao" Icon={BsBookmarkStarFill} />
      <div className="mt-10">
        {isLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          <SwiperTop movies={movies} />
        ) : (
          <Empty message="Không có phim nào được tìm thấy" />
        )}
      </div>
    </div>
  );
}

export default TopRated;
