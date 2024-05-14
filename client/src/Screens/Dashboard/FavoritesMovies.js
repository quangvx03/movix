import React, { useEffect } from "react";
import SideBar from "./SideBar";
import Table from "../../Components/Table";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  deleteFavoriteMoviesAction,
  getFavoriteMoviesAction,
} from "../../Redux/Actions/userActions";
import Loader from "./../../Components/Notification/Loader";
import { Empty } from "../../Components/Notification/Empty";

function FavoritesMovies() {
  const dispatch = useDispatch();

  const { isLoading, isError, likedMovies } = useSelector(
    (state) => state.userGetFavoriteMovies
  );
  // delete
  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess,
  } = useSelector((state) => state.userDeleteFavoriteMovies);

  // delete all movies handler
  const deleteMoviesHandler = (id) => {
    window.confirm("Bạn có chắc chắn muốn xoá tất cả phim yêu thích?") &&
      dispatch(deleteFavoriteMoviesAction());
  };

  // useEffect
  useEffect(() => {
    dispatch(getFavoriteMoviesAction());
    if (isError || deleteError) {
      toast.error(isError || "Đã có lỗi xảy ra");
      dispatch({
        type: isError
          ? "GET_FAVORITE_MOVIES_RESET"
          : "DELETE_FAVORITE_MOVIES_RESET",
      });
    }
  }, [dispatch, isError, deleteError, isSuccess]);

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">
            Phim yêu thích: {likedMovies?.length}
          </h2>
          {likedMovies?.length > 0 && (
            <button
              disabled={deleteLoading}
              onClick={deleteMoviesHandler}
              className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded"
            >
              {deleteLoading ? "Đang xoá..." : "Xoá tất cả"}
            </button>
          )}
        </div>
        {isLoading ? (
          <Loader />
        ) : likedMovies.length > 0 ? (
          <Table data={likedMovies} admin={false} />
        ) : (
          <Empty message="Chưa có phim nào được thêm vào yêu thích" />
        )}
      </div>
    </SideBar>
  );
}
export default FavoritesMovies;
