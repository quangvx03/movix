import React from "react";
import FlexMovieItems from "./../FlexMovieItems";
import { FaPlay, FaShareAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FiDownload } from "react-icons/fi";
import Rating from "../Stars";

function MovieInfo({ movie, setModalOpen }) {
  return (
    <div className="w-full xl:h-screen relative text-white">
      <img
        src={
          movie?.image ? `/images/movies/${movie?.image}` : "/images/user.png"
        }
        alt={movie?.name}
        className="w-full hidden xl:inline-block h-full object-cover"
      />
      <div className="xl:bg-main bg-dry flex-colo xl:bg-opacity-90 xl:absolute top-0 left-0 right-0 bottom-0">
        <div className="container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-2 flex-colo py-10 lg:py-20 gap-8">
          <div className="xl:col-span-1 w-full xl:order-none order-last h-header bg-dry border border-gray-800 rounded-lg overflow-hidden">
            <img
              src={
                movie?.titleImage
                  ? `/images/movies/${movie?.titleImage}`
                  : "/images/user.png"
              }
              alt={movie?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-1 md:grid gap-4 items-center">
            <div className="flex flex-col gap-10">
              {/* Title */}
              <h1 className="xl:text-4xl capitalize font-sans text-2xl font-bold">
                {movie?.name}
              </h1>
              {/* flex items */}
              <div className="flex items-center gap-4 font-medium text-dryGray">
                <div className="flex-colo bg-subMain text-xs px-2 py-1 rounded">
                  Full HD
                </div>
                <FlexMovieItems movie={movie && movie} />
              </div>
              {/* director */}
              <div className="text-text text-sm font-medium leading-7">
                <p>
                  Đạo diễn:{" "}
                  {movie?.director ? movie?.director : "Christopher Nolan"}
                </p>
              </div>
              {/* des */}
              <p className="text-text text-sm leading-7">{movie?.desc}</p>
              <div className="grid sm:grid-cols-6 grid-cols-4 gap-4 p-6 bg-main border border-gray-800 rounded-lg">
                {/* share */}
                <div className="col-span-2 flex-rows gap-5 border-r border-border">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-10 h-10 flex-colo rounded-lg bg-white bg-opacity-20"
                  >
                    <FaShareAlt />
                  </button>
                  <button className="w-10 h-10 flex-colo rounded-lg bg-subMain hover:text-dry transitions">
                    <FiDownload />
                  </button>
                </div>
                {/* lang */}
                <div className="col-span-2 flex-colo font-medium text-sm truncate">
                  <p>
                    Ngôn ngữ :{" "}
                    <span className="ml-2 truncate">{movie?.language}</span>
                  </p>
                </div>
                {/* watch */}
                <div className="sm:col-span-2 col-span-4 flex-colo justify-end font-medium text-sm">
                  <Link
                    to={`/watch/${movie?._id}`}
                    className="bg-dry py-4 hover:bg-subMain transitions border-2 border-subMain rounded-full flex-rows gap-4 w-full sm:py-3"
                  >
                    <FaPlay className="w-3 h-3" /> Xem ngay
                  </Link>
                </div>
              </div>
              {/* rating */}
              <div className="flex items-center mb-6 text-lg gap-2 text-star">
                <p>
                  ({movie?.rate} sao / {movie?.numberOfReviews} đánh giá)
                </p>
                {"|"}
                <Rating value={movie?.rate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
