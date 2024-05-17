import React, { useEffect } from "react";
import SideBar from "../SideBar";
import Table from "../../../Components/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllMoviesAction,
  deleteMovieAction,
  getAllMoviesAction,
} from "./../../../Redux/Actions/moviesActions";
import toast from "react-hot-toast";
import { Empty } from "../../../Components/Notification/Empty";
import Loader from "../../../Components/Notification/Loader";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";

function MoviesList() {
  const dispatch = useDispatch();
  const sameClass =
    "text-white p-2 rounded font-semibold border-2 border-subMain hover:bg-subMain cursor-pointer";

  // all movies
  const { isLoading, isError, movies, page, pages } = useSelector(
    (state) => state.movieGetAll
  );

  // delete movie
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.movieDelete
  );

  // delete all movies
  const { isLoading: deleteAllLoading, isError: deleteAllError } = useSelector(
    (state) => state.movieDeleteAll
  );

  // delete movie handler
  const deleteMovieHandler = (id) => {
    window.confirm("Bạn có chắc chắn muốn xoá phim này không?") &&
      dispatch(deleteMovieAction(id));
  };

  // delete all movies handler
  const deleteAllMoviesHandler = () => {
    window.confirm("Bạn có chắc chắn muốn xoá tất cả phim không?") &&
      dispatch(deleteAllMoviesAction());
  };

  // useEffect
  useEffect(() => {
    dispatch(getAllMoviesAction({}));
    // errors
    if (isError || deleteError || deleteAllError) {
      toast.error(isError || deleteError || deleteAllError);
    }
  }, [dispatch, isError, deleteError, deleteAllError]);

  // pagination prev and next pages
  const prevPage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page - 1,
      })
    );
  };
  const nextPage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page + 1,
      })
    );
  };

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Danh sách phim</h2>
          {movies?.length > 0 && (
            <button
              disabled={deleteAllLoading}
              onClick={deleteAllMoviesHandler}
              className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded"
            >
              {deleteAllLoading ? "Đang xóa..." : "Xóa tất cả"}
            </button>
          )}
        </div>
        {isLoading || deleteLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          <>
            <Table
              data={movies}
              admin={true}
              onDeleteHandler={deleteMovieHandler}
            />
            {/* More */}
            <div className="w-full flex-rows gap-6 my-5">
              <button
                onClick={prevPage}
                disabled={page === 1}
                className={sameClass}
              >
                <BsCaretLeftFill className="text-xl" />
              </button>
              Trang {page} / {pages}
              <button
                onClick={nextPage}
                disabled={page === pages}
                className={sameClass}
              >
                <BsCaretRightFill className="text-xl" />
              </button>
            </div>
          </>
        ) : (
          <Empty message="Không có phim nào được tìm thấy" />
        )}
      </div>
    </SideBar>
  );
}
export default MoviesList;
