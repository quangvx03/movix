import React, { useEffect, useState } from "react";
import Layout from "./../Layout/Layout";
import { useParams } from "react-router-dom";
import MovieInfo from "./../Components/Single/MovieInfo";
import MovieCasts from "../Components/Single/MovieCasts";
import MovieRates from "./../Components/Single/MovieRates";
import Titles from "../Components/Titles";
import { BsCollectionPlayFill } from "react-icons/bs";
import Movie from "../Components/Movie";
import ShareModal from "../Components/Modals/ShareModal";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "./../Redux/Actions/moviesActions";
import Loader from "./../Components/Notification/Loader";
import { RiMovie2Fill } from "react-icons/ri";

function SingleMovie() {
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const sameClass = "w-full gap-6 flex-colo min-h-screen";
  // useSelector
  const { isLoading, isError, movie } = useSelector(
    (state) => state.movieGetById
  );
  const { movies } = useSelector((state) => state.movieGetAll);
  // realted movies
  const RelatedMovies = movies?.filter((m) => m.category === movie?.category);

  // useEffect
  useEffect(() => {
    // movie id
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);

  return (
    <Layout>
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : isError ? (
        <div className={sameClass}>
          <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
            <RiMovie2Fill />
          </div>
          <p className="text-border text-sm">Có lỗi xảy ra, vui lòng thử lại</p>
        </div>
      ) : (
        <>
          <ShareModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            movie={movie}
          />
          <MovieInfo movie={movie} setModalOpen={setModalOpen} />
          <div className="container mx-auto min-h-screen px-2 my-6">
            <MovieCasts movie={movie} />
            <MovieRates movie={movie} />
            {/* related */}
            {RelatedMovies?.length > 0 && (
              <div className="my-16">
                <Titles title="Phim liên quan" Icon={BsCollectionPlayFill} />
                <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                  {RelatedMovies?.map((movie) => (
                    <Movie key={movie?._id} movie={movie} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
}

export default SingleMovie;
