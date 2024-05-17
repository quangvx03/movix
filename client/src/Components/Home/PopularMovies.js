import React from "react";
import Titles from "../Titles";
import { BsCollectionPlayFill } from "react-icons/bs";
import Movie from "../Movie";
import Loader from "../Notification/Loader";
import { Empty } from "./../Notification/Empty";

function PopularMovies({ isLoading, movies }) {
  return (
    <div className="my-16">
      <Titles title="Phim nổi bật" Icon={BsCollectionPlayFill} />
      {isLoading ? (
        <Loader />
      ) : movies?.length > 0 ? (
        <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {movies?.slice(0, 12).map((movie, index) => (
            <Movie key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="mt-6 ">
          <Empty message="Không có phim nào được tìm thấy" />
        </div>
      )}
    </div>
  );
}

export default PopularMovies;
