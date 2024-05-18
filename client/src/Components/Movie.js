import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FavoriteMovie, IfMovieFavorited } from "../Context/Functionalities";

function Movie({ movie }) {
  const { isLoading } = useSelector((state) => state.userFavoriteMovie);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  // if favorited function
  const isFavorited = IfMovieFavorited(movie);
  return (
    <>
      <div className="border border-border p-1 hover:scale-105 transitions relative rounded overflow-hidden">
        <Link to={`/movie/${movie?._id}`} className="w-full">
          <img
            src={movie?.image ? movie?.image : "/images/user.png"}
            alt={movie?.name}
            className="w-full h-64 object-cover"
          />
        </Link>
        <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
          <h3 className="font0-semibold truncate flex-grow">{movie?.name}</h3>
          <button
            onClick={() => FavoriteMovie(movie, dispatch, userInfo)}
            disabled={isFavorited || isLoading}
            className={`h-9 w-9 text-sm flex-colo transitions
            ${isFavorited ? "bg-subMain" : "bg-transparent"}
             hover:bg-subMain border-2 border-subMain rounded-md text-white flex-shrink-0`}
          >
            <FaHeart />
          </button>
        </div>
      </div>
    </>
  );
}

export default Movie;
