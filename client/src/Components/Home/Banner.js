import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Autoplay from "./../../../node_modules/swiper/modules/autoplay.mjs";
import FlexMovieItems from "../FlexMovieItems";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Loader from "./../Notification/Loader";
import { RiMovie2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { FavoriteMovie, IfMovieFavorited } from "../../Context/Functionalities";

const Swipper = ({ sameClass, movies }) => {
  const { isLoading } = useSelector((state) => state.userFavoriteMovie);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  // if favorited function
  const isFavorited = (movie) => {
    return IfMovieFavorited(movie);
  };

  return (
    <Swiper
      direction="vertical"
      slidesPerView={1}
      loop={true}
      speed={1000}
      modules={[Autoplay]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      className={sameClass}
    >
      {movies?.map((movie, index) => (
        <SwiperSlide key={index} className="relative rounded overflow-hidder">
          <img
            src={
              movie?.image
                ? `/images/movies/${movie?.image}`
                : "/images/user.png"
            }
            alt={movie?.name}
            className="w-full h-full rounded object-cover"
          />
          <div className="absolute linear-bg xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4">
            <h1 className="xl:text-4xl pb-1 truncate capitalize font-sans sm:text-2xl text-xl font-bold">
              {movie?.name}
            </h1>
            <div className="flex gap-5 pb-1 items-center text-dryGray">
              <FlexMovieItems movie={movie} />
            </div>
            <div className="flex gap-5 items-center">
              <Link
                to={`/movie/${movie?._id}`}
                className="bg-subMain hover:text-main transitions text-white px-8 py-3 rounded font-medium sm:text-sm text-xs"
              >
                Xem ngay
              </Link>
              <button
                onClick={() => FavoriteMovie(movie, dispatch, userInfo)}
                disabled={isFavorited(movie) || isLoading}
                className={`bg-white ${
                  isFavorited(movie) ? "text-subMain" : "text-white"
                } hover:text-subMain transitions px-4 py-3 rounded text-sm bg-opacity-30`}
              >
                <FaHeart />
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

function Banner({ movies, isLoading }) {
  const sameClass = "w-full flex-colo xl:h-96 bg-dry lg:h-64 h-48";
  return (
    <div className="relative w-full">
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : movies?.length > 0 ? (
        <Swipper sameClass={sameClass} movies={movies} />
      ) : (
        <div className={sameClass}>
          <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
            <RiMovie2Fill />
          </div>
          <p className="text-border text-sm">Không có phim nào được tìm thấy</p>
        </div>
      )}
    </div>
  );
}

export default Banner;
