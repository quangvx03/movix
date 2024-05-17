import React, { useEffect, useState } from "react";
import Layout from "./../Layout/Layout";
import { Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FaHeart, FaPlay } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "../Redux/Actions/moviesActions";
import Loader from "../Components/Notification/Loader";
import { RiMovie2Fill } from "react-icons/ri";
import { FavoriteMovie, IfMovieFavorited } from "../Context/Functionalities";

function WatchPage() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const [play, setPlay] = useState(false);
  const sameClass = "w-full gap-6 flex-colo min-h-screen";
  // useSelector
  const { isLoading, isError, movie } = useSelector(
    (state) => state.movieGetById
  );
  const { isLoading: favoriteLoading } = useSelector(
    (state) => state.userFavoriteMovie
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  // if favorited function
  const isFavorited = (movie) => IfMovieFavorited(movie);

  // useEffect
  useEffect(() => {
    // movie id
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);

  return (
    <Layout>
      <div className="container mx-auto bg-dry p-6 mb-12">
        {!isError && (
          <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6">
            <Link
              to={`/movie/${movie?._id}`}
              className="md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray"
            >
              <BiArrowBack />
              {movie?.name}
            </Link>
            <div className="flex-btn sm:w-auto w-full gap-5">
              <button
                onClick={() => FavoriteMovie(movie, dispatch, userInfo)}
                disabled={isFavorited(movie) || favoriteLoading}
                className={`bg-white hover:text-subMain
                ${isFavorited(movie) ? "text-subMain" : "text-white"}
                 transitions bg-opacity-30 rounded px-4 py-3 text-sm`}
              >
                <FaHeart />
              </button>
              <button className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-8 font-medium py-3 text-sm">
                <FiDownload /> Tải xuống
              </button>
            </div>
          </div>
        )}
        {/* video */}
        {play ? (
          <video controls autoPlay={play} className="w-full h-full rounded">
            <source src={movie?.video} type="video/mp4" title={movie?.name} />
          </video>
        ) : (
          <div className="w-full h-full rounded-lg overflow-hidden relative">
            {isLoading ? (
              <div className={sameClass}>
                <Loader />
              </div>
            ) : isError ? (
              <div className={sameClass}>
                <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-main text-subMain text-4xl">
                  <RiMovie2Fill />
                </div>
                <p className="text-border text-sm">
                  Có lỗi xảy ra, vui lòng thử lại
                </p>
              </div>
            ) : (
              <>
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo">
                  <button
                    onClick={() => setPlay(true)}
                    className="bg-white text-subMain flex-colo border border-subMain rounded-full w-20 h-20 font-medium text-xl"
                  >
                    <FaPlay />
                  </button>
                </div>
                <img
                  src={
                    movie?.image
                      ? `/images/movies/${movie?.image}`
                      : "images/user.png"
                  }
                  alt={movie?.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default WatchPage;
